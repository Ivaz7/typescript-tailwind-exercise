import { ref, push, serverTimestamp, DatabaseReference, onValue, off } from "firebase/database";
import { database } from "./firebaseConfig";

export interface userData {
  idRoom: string,
  message: string,
  username: string,
}

export interface Message {
  id: string;
  message: string;
  username: string;
  timestamp?: number;
}

export const sendMessage = (data: userData): Promise<DatabaseReference> => {
  const chatRef = ref(database, `chats/${data.idRoom}`);
  const result = push(chatRef, {
    message: data.message,
    username: data.username,
    timestamp: serverTimestamp(),
  });

  return Promise.resolve(result);
};

export const getMessages = (idRoom: string): Promise<Message[]> => {
  return new Promise((resolve) => {
    const chatRef = ref(database, `chats/${idRoom}`);

    const listener = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...(value as Omit<Message, 'id'>),
        }));
        resolve(parsed);
      } else {
        resolve([]);
      }
      off(chatRef, 'value', listener); 
    });
  });
};
