function EmptyMessageContainer({ className, noChat }) {
  return (
    <div className={className}>
      <div className="bg-secondary px-3 py-2 rounded-xl max-w-60">
        <p className="mb-1">{noChat ? "Choose some chat ;)" : "There are no messages yet..."}</p>
        <p className="text-muted-foreground">
          {noChat
            ? "To start messaging with someone please choose chat on the left sidebar"
            : "Send the message first, to start chat"}
        </p>
      </div>
    </div>
  );
}

export default EmptyMessageContainer;

