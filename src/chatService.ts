type ChatMessage = {
  id: string;
  userId: string;
  createdAt: string;
  content: string;
};

const chatData: ChatMessage[] = [];
const CHAT_MAX_LENGTH = 50;

export function getChatMessages(): readonly ChatMessage[] {
  return chatData.slice();
}

export function addChatMessage(
  message: Omit<ChatMessage, "id" | "createdAt">
): readonly ChatMessage[] {
  chatData.unshift({
    ...message,
    id: Math.random().toString(36).slice(-8),
    createdAt: new Date().toISOString(),
  });

  if (chatData.length > CHAT_MAX_LENGTH) {
    chatData.length = CHAT_MAX_LENGTH;
  }

  return chatData.slice();
}
