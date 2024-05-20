import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { useNavigate } from "react-router-dom";

const UserCard = ({ userInfo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${userInfo.email}`);
  };

  return (
    <li className="flex items-center gap-3">
      <Toggle
        className="w-full flex justify-start gap-3 py-8 border-primary-foreground"
        onClick={handleClick}
      >
        <Avatar>
          <AvatarImage src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
          <AvatarFallback>
            {String(userInfo.email[0] + userInfo.email[1]).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p>{userInfo.email}</p>
      </Toggle>
    </li>
  );
};

export default UserCard;

