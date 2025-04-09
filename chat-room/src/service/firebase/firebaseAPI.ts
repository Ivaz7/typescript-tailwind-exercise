import { ref, push, serverTimestamp, DatabaseReference, onValue, off, DataSnapshot } from "firebase/database";
import { database } from "./firebaseConfig";
import type { Reply } from "../replySlice";

export interface userData {
  idRoom: string,
  message: string,
  username: string,
  reply?: Reply,
}

export interface Message {
  id: string;
  message: string;
  username: string;
  reply?: Reply,
  timestamp?: number | object;
}

export const sendMessage = (data: userData): Promise<DatabaseReference> => {
  const chatRef = ref(database, `chats/${data.idRoom}`);
  const payload: Omit<Message, 'id'> = {
    message: data.message,
    username: data.username,
    timestamp: serverTimestamp(),
  };

  if (data.reply) {
    payload.reply = data.reply;
  }

  const result = push(chatRef, payload);

  return Promise.resolve(result);
};

export const getMessages = (idRoom: string): Promise<Message[]> => {
  return new Promise((resolve) => {
    const chatRef = ref(database, `chats/${idRoom}`);

    const callback = (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed: Message[] = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...(value as Omit<Message, 'id'>),
        }));
        resolve(parsed);
      } else {
        resolve([]);
      }

      off(chatRef, 'value', callback);
    };

    onValue(chatRef, callback);
  });
};
