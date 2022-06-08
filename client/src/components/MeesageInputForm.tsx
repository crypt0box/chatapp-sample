import { useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import ReactTextareaAutosize from "react-textarea-autosize";
import { css } from "../stitches-config";

const inputForm = css({
  display: "flex",
  alignItems: "flex-end",
  gap: "$1",
  padding: "$1 $2",
});

const textarea = css({
  flex: 1,
  fontSize: "$4",
  resize: "none",
  padding: "$3 $2",
  "&::placeholder": {
    color: "$blackAlpha500",
  },
});

const submitButton = css({
  display: "inline-flex",
  alignItems: "center",
  color: "$green400",
  fontSize: "$6",
  padding: "$3",
  borderRadius: "$sm",
  backgroundColor: "White",
  transition: "background-color 0.2s, color 0.2s ease",
  "&:focus": {
    outline: "2px solid $green200",
  },
  "&:hover": {
    backgroundColor: "$blackAlpha200",
  },
  "&:disabled": {
    color: "$blackAlpha400",
    pointerEvents: "none",
  },
});

export const MeesageInputForm: React.FC<{
  onSubmit: (message: string) => void;
}> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    if (message === "") return;
    onSubmit(message);
    setMessage("");
  };

  const keyBind: React.KeyboardEventHandler = (event) => {
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form ref={formRef} className={inputForm()} onSubmit={submitHandler}>
      <ReactTextareaAutosize
        className={textarea()}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={keyBind}
        placeholder="メッセージを入力"
        aria-label="メッセージを入力"
        maxLength={500}
      />
      <button
        type="submit"
        className={submitButton()}
        disabled={message === ""}
        title="送信する"
        aria-label="送信する"
      >
        <MdSend />
      </button>
    </form>
  );
};
