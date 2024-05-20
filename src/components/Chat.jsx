import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { addDoc, collection, limit, orderBy, query } from "firebase/firestore";
import { signOut, updateProfile } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../lib/firebase";

import SendIcon from "../svg/send-icon.svg?react";
import LogoutIcon from "../svg/logout-icon.svg?react";

import logo from "../images/logo.png";
import ChatMessage from "./ChatMessage";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

const Chat = () => {
  const dummy = useRef();
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  let collectionName = `${user.email}${params.uid}`;
  let messagesRef = collection(firestore, collectionName);
  let userQuery = query(messagesRef, orderBy("createdAt"), limit(25)); // Use the new query() function
  let [messages] = useCollectionData(userQuery, { idField: "id" });

  collectionName = `${params.uid}${user.email}`;
  let secondMessagesRef = collection(firestore, collectionName);
  userQuery = query(secondMessagesRef, orderBy("createdAt"), limit(25));
  let [secondMessages] = useCollectionData(userQuery, { idField: "id" });

  // if (!messages.length) {
  //   collectionName = `${params.uid}${user.email}`;
  //   messagesRef = collection(firestore, collectionName);
  //   userQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  //   [messages] = useCollectionData(userQuery, { idField: "id" });
  // }

  console.log("collectionName");
  console.log(collectionName);

  console.log("messagesRef");
  console.log(messagesRef);
  console.log("userQuery");
  console.log(userQuery);
  console.log("messages");
  console.log(messages);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, email } = auth.currentUser;

    await updateProfile(auth.currentUser, {
      photoURL: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png",
    });

    await addDoc(messages?.length ? messagesRef : secondMessagesRef, {
      text: formValue,
      createdAt: new Date(),
      uid,
      photoURL,
      email,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* <header>
        <img className="logo" src={logo} alt="logo" />
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={user?.photoURL ?? ""} alt="avatar" />
            <span>{user && user.email}</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <LogoutIcon className="logout-icon" />
          </button>
        </div>
      </header> */}
      <section className="w-full h-full relative">
        <main className="h-[calc(100%-4rem)] overflow-auto">
          {messages?.length
            ? messages?.map((msg) => <ChatMessage key={msg.id} message={msg} />)
            : secondMessages?.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>
        </main>

        <form
          onSubmit={sendMessage}
          className="chat-form h-16 absolute inset-x-0 bottom-0 px-3 flex items-center gap-2"
        >
          <Input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="say something nice"
            className="chat-input rounded-xl"
          />

          <button
            className="chat-button min-h-10 min-w-10 bg-primary rounded-xl flex justify-center items-center cursor-pointer"
            type="submit"
            disabled={!formValue}
          >
            {/* <SendIcon className="send-icon" /> */}
            <Send className="stroke-primary-foreground h-5 w-5" />
          </button>
        </form>
      </section>
    </>
  );
};

export default Chat;

