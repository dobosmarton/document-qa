import { ChatMessage, ContextChatEngine } from "llamaindex";
import { getIndexFromStore } from "./vector-index";

type Props = {
  chatHistory?: ChatMessage[];
};

export const getChatEngine = async ({ chatHistory }: Props): Promise<ContextChatEngine> => {
  const index = await getIndexFromStore();

  const retriever = index.asRetriever({
    similarityTopK: 5,
  });

  const chatEngine = new ContextChatEngine({ retriever, chatHistory });

  return chatEngine;
};
