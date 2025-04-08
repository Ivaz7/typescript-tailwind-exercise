import { ref, push, serverTimestamp, DatabaseReference } from "firebase/database";
import { database } from "./firebaseConfig";

export interface userData {
  idRoom: string,
  message: string,
  username: string,
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
