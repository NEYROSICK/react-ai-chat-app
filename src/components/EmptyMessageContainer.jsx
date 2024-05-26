import { useTranslation } from "react-i18next";

function EmptyMessageContainer({ className, noChat }) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <div className="bg-secondary px-3 py-2 rounded-xl max-w-60">
        <p className="mb-1">{noChat ? t("noChatTitle") : t("noMessagesTitle")}</p>
        <p className="text-muted-foreground">
          {noChat ? t("noChatContent") : t("noMessagesContent")}
        </p>
      </div>
    </div>
  );
}

export default EmptyMessageContainer;

