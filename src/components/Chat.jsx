import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { addDoc, collection, limit, orderBy, query } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../lib/firebase";

import ChatMessage from "./ChatMessage";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import EmptyMessageContainer from "./EmptyMessageContainer";

const Chat = () => {
  const dummy = useRef();
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const collectionName = `${user.email}${params.uid}`;
  const messagesRef = collection(firestore, collectionName);
  const userQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(userQuery, { idField: "id" });

  const secondCollectionName = `${params.uid}${user.email}`;
  const secondMessagesRef = collection(firestore, secondCollectionName);
  const secondUserQuery = query(secondMessagesRef, orderBy("createdAt"), limit(25));
  const [secondMessages] = useCollectionData(secondUserQuery, { idField: "id" });

  const collectionExists = () => {
    if (messages?.length) {
      if (collectionName.includes("undefined")) {
        return false;
      }
      return true;
    }
    if (secondCollectionName.includes("undefined")) {
      return false;
    }
    return true;
  };

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await updateProfile(auth.currentUser, {
      photoURL: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png",
    });

    await addDoc(messages?.length ? messagesRef : secondMessagesRef, {
      text: formValue,
      createdAt: new Date(),
      uid,
      photoURL,
      username: displayName,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="w-full h-full relative">
        <main className="h-[calc(100%-5rem)] overflow-auto py-4 px-3">
          {!!messages?.length &&
            collectionExists() &&
            messages?.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          {!messages?.length &&
            !!secondMessages?.length &&
            collectionExists() &&
            secondMessages?.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          {!collectionExists() && (
            <EmptyMessageContainer
              className={"w-full h-full flex justify-center items-center"}
              noChat
            />
          )}
          {!!messages && !!secondMessages && !messages?.length && !secondMessages?.length && (
            <EmptyMessageContainer className={"w-full h-full flex justify-center items-center"} />
          )}

          <span ref={dummy}></span>
        </main>

        <form
          onSubmit={sendMessage}
          className="chat-form h-20 absolute inset-x-0 bottom-0 px-6 flex items-center gap-2"
        >
          <Input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Say something nice..."
            className="chat-input rounded-xl py-6 px-4"
          />

          <button
            className="chat-button min-h-12 min-w-12 bg-primary rounded-xl flex justify-center items-center cursor-pointer"
            type="submit"
            disabled={!formValue}
          >
            <Send className="stroke-primary-foreground h-5 w-5" />
          </button>
        </form>
      </section>
    </>
  );
};

export default Chat;

