import { auth } from "../lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatMessage = ({ message }) => {
  const { text, uid, username } = message;
  const usernameArr = username.split(" ");

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div
        className={`flex gap-2 mb-3 ${
          messageClass === "received" ? "items-center" : "flex-row-reverse"
        }`}
      >
        <Avatar>
          <AvatarImage src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
          <AvatarFallback>
            {usernameArr.length >= 2
              ? String(usernameArr[0][0] + usernameArr[1][0])
              : String(usernameArr[0][0])}
          </AvatarFallback>
        </Avatar>

        <p
          className={`px-3 py-2 rounded-xl max-w-96 ${
            messageClass === "received"
              ? "bg-secondary "
              : "bg-primary text-primary-foreground self-end"
          }`}
        >
          {text}
        </p>
      </div>
    </>
  );
};

export default ChatMessage;

