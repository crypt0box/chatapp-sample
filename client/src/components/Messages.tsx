import { useEffect, useRef } from "react";
import { MdAccountCircle } from "react-icons/md";
import { ChatMessage } from "../chatMessage";
import { css } from "../stitches-config";

const messagesCss = css({
  listStyle: "none",
  display: "flex",
  flexDirection: "column-reverse",
  gap: "$3",
  paddingLeft: "$2",
  paddingRight: "$2",
});

export const Messages: React.FC<{
  userId: string;
  messages: ChatMessage[];
}> = ({ userId, messages }) => {
  const topItem = useRef<HTMLLIElement>(null);
  useEffect(() => {
    topItem.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <ul className={messagesCss()}>
      {messages.map((message, index) => (
        <li key={message.id} ref={index === 0 ? topItem : undefined}>
          {message.userId === userId ? (
            <MyMessage message={message} />
          ) : (
            <OthersMessage message={message} />
          )}
        </li>
      ))}
    </ul>
  );
};

const messageCss = css({
  display: "flex",
  variants: {
    isMine: {
      true: {
        justifyContent: "flex-end",
      },
    },
  },
});

const userIcon = css({
  display: "inline-flex",
  fontSize: "$10",
});

const messageContentBaseCss = css({
  position: "relative",
  borderRadius: "$xl",
  padding: "$2 $4",
  overflowWrap: "anywhere",
  whiteSpace: "pre-wrap",
  lineHeight: 1.6,
});

// https://saruwakakun.com/html-css/reference/speech-bubble#section7
const othersMessageContentCss = css(messageContentBaseCss, {
  backgroundColor: "$gray200",
  marginLeft: "$3",
  maxWidth: "calc(100% - $10 - $24 - $12)",
  "&::after": {
    content: "",
    display: "inline-block",
    position: "absolute",
    top: "3px",
    left: "-19px",
    border: "8px solid transparent",
    borderRight: "18px solid $gray200",
    transform: "rotate(35deg)",
  },
});

const myMessageContentCss = css(messageContentBaseCss, {
  backgroundColor: "$green200",
  marginRight: "$6",
  maxWidth: "calc(100% - $10 - $24 - $12)",
  "&::after": {
    content: "",
    position: "absolute",
    top: "3px",
    right: "-19px",
    border: "8px solid transparent",
    borderLeft: "18px solid $green200",
    transform: "rotate(-35deg)",
  },
});

const createdAtCss = css({
  fontSize: "$2",
  color: "$gray500",
  alignSelf: "flex-end",
  marginBottom: "$1",
  width: "$24",
  variants: {
    isMine: {
      true: { marginRight: "$1" },
      false: { marginLeft: "$1" },
    },
  },
});

const OthersMessage: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <div id={message.id} className={messageCss({ isMine: false })}>
      <div className={userIcon()}>
        <MdAccountCircle />
      </div>
      <p className={othersMessageContentCss()}>{message.content}</p>
      <time dateTime={message.createdAt} className={createdAtCss({ isMine: false })}>
        {formatDateTime(message.createdAt)}
      </time>
    </div>
  );
};

const MyMessage: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <div id={message.id} className={messageCss({ isMine: true })}>
      <time dateTime={message.createdAt} className={createdAtCss({ isMine: true })}>
        {formatDateTime(message.createdAt)}
      </time>
      <p className={myMessageContentCss()}>{message.content}</p>
    </div>
  );
};

const formatDateTime = (datetime: string): string => {
  return Intl.DateTimeFormat("ja", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(datetime));
};
