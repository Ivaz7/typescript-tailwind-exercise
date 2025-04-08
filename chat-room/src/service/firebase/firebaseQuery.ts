import { useMutation } from '@tanstack/react-query';
import { sendMessage } from './firebaseAPI'; 
import type { userData } from './firebaseAPI';

export function useSendMessage() {
  return useMutation({
    mutationFn: (data: userData) => sendMessage(data),
  });
}
