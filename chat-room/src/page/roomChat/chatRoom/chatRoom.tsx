import { useAppSelector } from '../../../hooks/typedRedux';
import { useGetMessages } from '../../../service/firebase/firebaseQuery';
import './chatRoom.scss';
import type { Message } from '../../../service/firebase/firebaseAPI';
import { useEffect, useRef } from 'react';

const RoomChat = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName: realName }= userData;
  const { data: messages } = useGetMessages(idRoom);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessages = messages?.map((val: Message, inx: number) => {
    const { message, timestamp, username: dataName } = val;

    const theUserDataName: boolean = dataName === realName;

    return (
      <div 
        key={inx}
        className={`${theUserDataName ? "self-end" : 'self-start'} w-m-2/3 flex flex-col`}
      > 
        <p>
          {theUserDataName ? "You" : dataName}
        </p>

        <p>
          {message}
        </p>

        <p>
          {timestamp}
        </p>
      </div>
    )
  })

  return (
    <div className='grow overflow-y-auto flex-1'>
      <div className='roomChat min-h-full max-h-full overflow-y-auto flex flex-col'>
        {renderMessages}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
 
export default RoomChat;