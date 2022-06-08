import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessage } from "./chatMessage";

type UseChatMessagesReturn = {
  messages: ChatMessage[];
  addMessage: (content: string) => void;
};

export const useChatMessages = (userId: string): UseChatMessagesReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const webSocketRef = useRef<WebSocket>();

  useEffect(() => {
    const socket = new WebSocket(`ws://${window.location.host}/chat`);
    webSocketRef.current = socket;

    socket.addEventListener("message", (event) => {
      setMessages(JSON.parse(event.data));
    });

    return () => socket.close();
  }, []);

  const addMessage = useCallback((content: string) => {
    webSocketRef.current?.send(JSON.stringify({ userId, content }));
  }, []);

  return { messages, addMessage };
};
