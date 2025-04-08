import { ref, push, serverTimestamp, DatabaseReference, get, child } from "firebase/database";
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

export const getMessages = async (idRoom: string): Promise<Message[]> => {
  const chatRef = ref(database);
  const snapshot = await get(child(chatRef, `chats/${idRoom}`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([key, value]) => ({
      id: key,
      ...(value as Omit<Message, 'id'>),
    }));
  } else {
    return [];
  }
};
