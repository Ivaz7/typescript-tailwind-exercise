import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sendMessage, getMessages } from './firebaseAPI'; 
import type { Message, userData } from './firebaseAPI';
import { useEffect } from 'react';
import { database } from './firebaseConfig';
import { DataSnapshot, off, onValue, ref } from 'firebase/database';

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: userData) => sendMessage(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.idRoom],
      });
    },
  });
}

export function useGetMessages(idRoom: string) {
  return useQuery({
    queryKey: ['messages', idRoom],
    queryFn: () => getMessages(idRoom),
    enabled: !!idRoom,
  });
}

export function useSubscribeMessages(idRoom: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!idRoom) return;

    const chatRef = ref(database, `chats/${idRoom}`);

    const callback = (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      let messages: Message[] = [];
      if (data) {
        messages = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...(value as Omit<Message, 'id'>),
        }));
      }
      queryClient.setQueryData(['messages', idRoom], messages);
    };

    onValue(chatRef, callback);

    return () => {
      off(chatRef, 'value', callback);
    };
  }, [idRoom, queryClient]);
}
