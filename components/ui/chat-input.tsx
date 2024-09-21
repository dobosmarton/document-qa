import { Button } from "./button";
import { Input } from "./input";

type Props = {
  input: string;
  isLoading: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const ChatInput: React.FC<Props> = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div className="flex w-full items-start justify-between gap-4">
      <Input
        name="message"
        placeholder="Type a message"
        value={props.input}
        onChange={props.handleInputChange}
        autoFocus
      />

      <Button type="submit" disabled={props.isLoading}>
        Send message
      </Button>
    </div>
  </form>
);
