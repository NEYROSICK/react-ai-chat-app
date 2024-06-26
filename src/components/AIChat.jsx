// import { openai } from "@/lib/openai";
import { Send } from "lucide-react";
import OpenAILogo from "../svg/openai-icon.svg?react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef } from "react";
import Typewriter from "./Typewriter";
import { scrollToBottom } from "@/lib/utils";
import { openai } from "@/lib/openai";
import { useTranslation } from "react-i18next";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Separator } from "./ui/separator";

const AIChat = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef();
  const formRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));
  const collectionName = `chatgpt${user.email}`;
  const messagesRef = collection(firestore, collectionName);
  const userQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(userQuery, { idField: "id" });

  useEffect(() => {
    setTimeout(() => scrollToBottom(scrollContainerRef), 100);
  }, [messages]);

  const updateAllDocuments = async () => {
    try {
      const q = query(messagesRef);
      const querySnapshot = await getDocs(q);

      const batch = writeBatch(firestore);
      querySnapshot.forEach((docSnapshot) => {
        const docRef = doc(firestore, collectionName, docSnapshot.id);
        batch.update(docRef, { noAnim: true });
      });

      await batch.commit();
    } catch (error) {
      console.error("Error updating documents: ", error);
    }
  };

  const sendMessage = async (message) => {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });

    const { role, content } = chatCompletion.choices[0].message;
    await addDoc(messagesRef, {
      content,
      role,
      createdAt: new Date(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;

    await addDoc(messagesRef, {
      content: message,
      role: "user",
      createdAt: new Date(),
    });

    if (formRef.current) {
      formRef.current.reset();
    }

    await updateAllDocuments();
    await sendMessage(message);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="px-3 ">
        <div className="py-6 flex gap-3 items-center justify-center">
          <Avatar>
            <AvatarImage src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
            <AvatarFallback className="bc-muted">
              <OpenAILogo className="fill-secondary-foreground w-6" />
            </AvatarFallback>
          </Avatar>
          <p>{t("aiAssistantTitle")}</p>
        </div>
        <Separator />
      </div>

      {!!messages?.length && (
        <div
          className="flex flex-col gap-3 justify-start items-start h-[calc(100%-9rem)] overflow-auto py-4 px-3"
          ref={scrollContainerRef}
        >
          {messages.map((item, index) =>
            item.role === "user" ? (
              <Card className="border-primary px-3 py-2 self-end" key={index} variant="default">
                {item.content}
              </Card>
            ) : !!item.content?.length && !item?.noAnim ? (
              <Typewriter
                className="px-3 py-2 mb-4"
                key={index}
                variant="default"
                text={item.content}
              />
            ) : (
              !!item.content?.length &&
              item?.noAnim && (
                <Card className="px-3 py-2" key={index} variant="default">
                  {item.content}
                </Card>
              )
            )
          )}
        </div>
      )}
      <div className="py-4 px-3">
        <Card
          variant="outline"
          className="flex items-center justify-between gap-3 py-4 px-4 rounded-xl w-full h-auto"
        >
          <form ref={formRef} className="flex gap-3 items-center w-full" onSubmit={handleSubmit}>
            <Input name="message" placeholder={t("AIchatPlaceholder")} autoComplete="off" />

            <Button variant="outline" className="p-2 h-auto w-auto">
              <Send />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;

