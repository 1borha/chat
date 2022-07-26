export interface ChatMessageInterface {
  uid: string;
  nickname: string;
  content: string;
  date: string;
  id: string;
  time: number;
}

export interface ChatMessagesInterface {
  messages: Array<ChatMessageInterface>;
}
