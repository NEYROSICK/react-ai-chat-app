import { Languages, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import LanguagesSwitch from "./LanguagesSwitch";
import { useTranslation } from "react-i18next";

const UserSettingsInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { t } = useTranslation();
  const usernameArr = user.displayName?.split(" ");

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

  return (
    <div className="gap-2 py-4 px-3 w-full">
      <Card
        variant="outline"
        className="flex items-center justify-between gap-3 py-4 px-4 rounded-xl w-full h-auto"
      >
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={"https://api.adorable.io/avatars/23/abott@adorable.png"} />
            <AvatarFallback>
              {usernameArr?.length >= 2
                ? String(usernameArr[0][0] + usernameArr[1][0])
                : usernameArr && String(usernameArr[0][0])}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{user?.displayName}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Popover>
            <PopoverTrigger variant="outline">
              <Card
                variant="outline"
                className="p-2 h-auto w-auto hover:bg-accent transition-colors"
              >
                <Languages />
              </Card>
            </PopoverTrigger>
            <PopoverContent sideOffset={26} className="w-auto rounded-xl">
              <LanguagesSwitch />
            </PopoverContent>
          </Popover>

          <TooltipProvider>
            <Tooltip delayDuration={500}>
              <TooltipTrigger onClick={handleLogout}>
                <Card
                  variant="outline"
                  className="p-2 h-auto w-auto hover:bg-accent transition-colors"
                >
                  <LogOut />
                </Card>
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>
                <p>{t("logoutTitle")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </div>
  );
};

export default UserSettingsInfo;

