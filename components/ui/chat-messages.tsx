import { Message } from "ai";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Markdown } from "./markdown";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

export const ChatMessages = (props: Props) => {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);
  const messageLength = props.messages.length;
  const lastMessage = props.messages[messageLength - 1];

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop = scrollableChatContainerRef.current.scrollHeight;
    }
  };

  const isLastMessageFromAssistant = messageLength > 0 && lastMessage?.role !== "user";

  // `isPending` indicate
  // that stream response is not yet received from the server,
  // so we show a loading indicator to give a better UX.
  const isPending = props.isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messageLength, lastMessage]);

  return (
    <div className="flex h-[50vh] flex-col gap-5 divide-y overflow-y-auto pb-4" ref={scrollableChatContainerRef}>
      {props.messages.map((message) => (
        <div key={message.id} className="flex-1 space-y-4">
          <Markdown>{message.content}</Markdown>
        </div>
      ))}
      {isPending && (
        <div className="flex justify-center items-center pt-10">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  );
};
