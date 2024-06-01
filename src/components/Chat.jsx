import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { addDoc, collection, limit, orderBy, query } from "firebase/firestore";
// import { updateProfile } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../lib/firebase";

import ChatMessage from "./ChatMessage";
import { Input } from "./ui/input";
import { Save, Send } from "lucide-react";
import EmptyMessageContainer from "./EmptyMessageContainer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTranslation } from "react-i18next";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Chat = () => {
  const scrollToContainer = useRef();
  const { t } = useTranslation();
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [scrollToSmooth, setScroolToSmooth] = useState(false);

  const collectionName = `${user.email}${params.uid}`;
  const messagesRef = collection(firestore, collectionName);
  const userQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(userQuery, { idField: "id" });

  const secondCollectionName = `${params.uid}${user.email}`;
  const secondMessagesRef = collection(firestore, secondCollectionName);
  const secondUserQuery = query(secondMessagesRef, orderBy("createdAt"), limit(25));
  const [secondMessages] = useCollectionData(secondUserQuery, { idField: "id" });

  const usersRef = collection(firestore, "users");
  const userCollectionQuery = query(usersRef);
  const [userList] = useCollectionData(userCollectionQuery, { idField: "id" });

  const currentChatUser = userList?.find((user) => user.email === params.uid);
  const usernameArr = currentChatUser ? currentChatUser?.username.split(" ") : null;
  const isSavedMessages = currentChatUser?.email === user.email;

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

  useEffect(() => {
    if ((messages || secondMessages) && collectionExists()) {
      if (!scrollToSmooth) {
        scrollToContainer.current.scrollIntoView();
        setScroolToSmooth(true);
      } else {
        scrollToContainer.current.scrollIntoView({ behavior: "smooth" });
      }
    }
    return () => {
      setScroolToSmooth(false);
    };
  }, [messages, secondMessages]);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await addDoc(messages?.length ? messagesRef : secondMessagesRef, {
      text: formValue,
      createdAt: new Date(),
      uid,
      photoURL,
      username: displayName,
    });

    setFormValue("");
  };

  return (
    <>
      <section className="w-full h-full relative">
        <ModeToggle className="absolute top-8 right-7" />

        {/* {collectionExists() && ( */}
        <div className="py-4 px-3">
          <Card className="flex items-center gap-3 py-4 px-4">
            <Avatar>
              <AvatarImage src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
              <AvatarFallback>
                {!isSavedMessages &&
                  usernameArr?.length >= 2 &&
                  String(usernameArr[0][0] + usernameArr[1][0])}
                {!isSavedMessages && usernameArr?.length < 2 && String(usernameArr[0][0])}
                {isSavedMessages && <Save />}
                {!collectionExists() && "?"}
              </AvatarFallback>
            </Avatar>
            <p>
              {!isSavedMessages && currentChatUser?.username}
              {isSavedMessages && t("savedMessagesTitle")}
            </p>
          </Card>
        </div>
        {/* )} */}

        <main className={`h-[calc(100%-11.7rem)] overflow-auto py-4 px-3`}>
          {!!messages?.length &&
            collectionExists() &&
            messages?.map((msg, index) => <ChatMessage key={index} message={msg} />)}
          {!messages?.length &&
            !!secondMessages?.length &&
            collectionExists() &&
            secondMessages?.map((msg, index) => <ChatMessage key={index} message={msg} />)}
          {!collectionExists() && (
            <EmptyMessageContainer
              className={"w-full h-full flex justify-center items-center"}
              noChat
            />
          )}
          {collectionExists() &&
            !!messages &&
            !!secondMessages &&
            !messages?.length &&
            !secondMessages?.length && (
              <EmptyMessageContainer className={"w-full h-full flex justify-center items-center"} />
            )}

          <span ref={scrollToContainer}></span>
        </main>

        <form
          onSubmit={sendMessage}
          className="chat-form h-20 absolute inset-x-0 bottom-0 px-6 flex items-center gap-2"
        >
          <Input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder={t("chatPlaceholder")}
            className="chat-input rounded-xl py-6 px-4"
            autoComplete="off"
          />

          <Button className="chat-button h-auto rounded-xl p-3" type="submit" disabled={!formValue}>
            <Send className="stroke-primary-foreground" />
          </Button>
        </form>
      </section>
    </>
  );
};

export default Chat;

