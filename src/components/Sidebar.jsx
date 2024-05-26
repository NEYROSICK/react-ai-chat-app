import { firestore } from "@/lib/firebase";
import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import UserSettingsInfo from "./UserSettingsInfo";

const Sidebar = () => {
  const [chatList, setChatList] = useState([]);
  const usersRef = collection(firestore, "users");
  const userQuery = query(usersRef);
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [userList, loading] = useCollectionData(userQuery, { idField: "id" });

  useEffect(() => {
    if ((!loading, userList?.length)) {
      const index = userList?.findIndex((userItem) => userItem.email === loggedUser.email);
      const [savedMessages] = userList.splice(index, 1);
      userList.splice(0, 0, savedMessages);
      setChatList(userList);
    }
  }, [loading, userList]);

  return (
    <div className="h-full flex flex-col justify-between items-start">
      <ul className="flex flex-col gap-4 py-4 px-3 w-full">
        {userList && chatList.map((user) => <UserCard key={user.uid} userInfo={user} />)}
      </ul>
      <UserSettingsInfo />
    </div>
  );
};

export default Sidebar;

