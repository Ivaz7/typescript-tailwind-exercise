import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sendMessage, getMessages } from './firebaseAPI'; 
import type { userData } from './firebaseAPI';

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
