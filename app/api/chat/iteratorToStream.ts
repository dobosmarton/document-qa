import {
  AIStreamCallbacksAndOptions,
  createCallbacksTransformer,
  createStreamDataTransformer,
  trimStartOfStreamHelper,
} from "ai";
import { EngineResponse } from "llamaindex";

export const iteratorToStream = <T extends EngineResponse>(
  iterator: AsyncIterable<T>,
  opts?: {
    callbacks?: AIStreamCallbacksAndOptions;
  }
): ReadableStream<string> => {
  const reader = iterator[Symbol.asyncIterator]();
  const trimStartOfStream = trimStartOfStreamHelper();

  return new ReadableStream<string>({
    async pull(controller) {
      try {
        const { done, value } = await reader.next();
        if (done) {
          controller.close();
          return;
        }

        let message: string;
        if (typeof value.message.content === "string") {
          message = trimStartOfStream(value.message.content);
        } else {
          message = trimStartOfStream(value.response ?? "");
        }
        controller.enqueue(message);
      } catch (error) {
        controller.error(error);
      }
    },
  })
    .pipeThrough(createCallbacksTransformer(opts?.callbacks))
    .pipeThrough(createStreamDataTransformer());
};
