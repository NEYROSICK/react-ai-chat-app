import { useState } from "react";
import { Button } from "./ui/button";
import { GB, UA } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

const LanguagesSwitch = ({ className }) => {
  const [lang, setLang] = useState(localStorage.getItem("language") || "en");
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className={`${className} flex gap-2`}>
      <Button
        className={`${lang === "uk" && "border-[1px]"} flex gap-1 p-3`}
        variant={lang === "uk" ? "default" : "outline"}
        onClick={() => changeLang("uk")}
      >
        <UA className="w-5 rounded-sm" />
        <span>Ukr</span>
      </Button>
      <Button
        className={`${lang === "en" && "border-[1px]"} flex gap-1 p-3`}
        variant={lang === "en" ? "default" : "outline"}
        onClick={() => changeLang("en")}
      >
        <GB className="w-5 rounded-sm" />
        <span>Eng</span>
      </Button>
    </div>
  );
};

export default LanguagesSwitch;

