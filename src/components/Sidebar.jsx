import { firestore } from "@/lib/firebase";
import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserCard from "./UserCard";

const Sidebar = () => {
  const usersRef = collection(firestore, "users");
  const userQuery = query(usersRef); // Use the new query() function

  const [userList] = useCollectionData(userQuery, { idField: "id" });

  return (
    <>
      <ul className="flex flex-col gap-2 py-3 px-2">
        {userList && userList.map((user) => <UserCard key={user.uid} userInfo={user} />)}
      </ul>
    </>
  );
};

export default Sidebar;

