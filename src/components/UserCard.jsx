import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const UserCard = ({ userInfo }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const isActive = userInfo.email === params.uid;
  const isSavedMessages = userInfo.email === user.email;

  const handleClick = () => {
    navigate(`/chat/${userInfo.email}`);
  };

  const usernameArr = userInfo.username.split(" ");

  return (
    <li
      className={`flex items-center gap-3 py-4 px-4 rounded-xl border-primary-foreground cursor-pointer ${
        isActive ? "bg-primary" : "hover:bg-secondary transition-colors"
      }`}
      onClick={handleClick}
    >
      {isSavedMessages ? (
        <>
          <Avatar>
            <AvatarImage src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
            <AvatarFallback>
              <Save />
            </AvatarFallback>
          </Avatar>
          <p>{t("savedMessagesTitle")}</p>
        </>
      ) : (
        <>
          <Avatar>
            <AvatarImage src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
            <AvatarFallback>
              {usernameArr.length >= 2
                ? String(usernameArr[0][0] + usernameArr[1][0])
                : String(usernameArr[0][0])}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{userInfo?.username}</p>
            <p className="text-sm text-muted-foreground">{userInfo?.email}</p>
          </div>
        </>
      )}
    </li>
  );
};

export default UserCard;

