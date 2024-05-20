import { getAdditionalUserInfo, getAuth } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatMessage = ({ message }) => {
  const { text, uid, photoURL, email } = message;

  // const user = getAuth();

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      {/* <div className={`message ${messageClass}`}> */}
      <div
        className={`flex gap-2 py-3 px-2 ${
          messageClass === "received" ? "items-center" : "flex-row-reverse"
        }`}
      >
        <Avatar>
          <AvatarImage src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
          <AvatarFallback>{String(email[0] + email[1]).toUpperCase()}</AvatarFallback>
        </Avatar>

        <p
          className={`px-4 py-2 rounded-xl max-w-96 ${
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

