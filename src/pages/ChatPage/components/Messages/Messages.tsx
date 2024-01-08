import { useAppSelector } from "@/hooks/reduxHooks";
import { IShortMessage } from "@/types";
import Message from "../Message/Message";

const checkIsFirstMessage = (i: number, array: IShortMessage[]) => {
  if (i) {
    const currentMessageDate = new Date(array.at(i)!.pub_date).getDate();
    const previousMessageDate = new Date(array.at(i - 1)!.pub_date).getDate();
    return currentMessageDate !== previousMessageDate;
  } else {
    return true;
  }
};

const Messages = () => {
  const { messages } = useAppSelector((state) => state.chat);

  return (
    <>
      {messages.map((message, i, array) => (
        <Message
          key={message.id}
          message={message}
          first={checkIsFirstMessage(i, array)}
        />
      ))}
    </>
  );
};

export default Messages;
