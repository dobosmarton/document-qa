import { Button } from "./button";

type Props = {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const ChatInput = (props: Props) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    props.handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex w-full items-start justify-between gap-4">
        <input
          className={
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          }
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
};
