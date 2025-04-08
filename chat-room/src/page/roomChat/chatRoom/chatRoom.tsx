import { useAppSelector } from '../../../hooks/typedRedux';
import { useGetMessages } from '../../../service/firebase/firebaseQuery';
import './chatRoom.scss';
import type { Message } from '../../../service/firebase/firebaseAPI';
import { useEffect, useRef } from 'react';
import { timeFormat } from '../../../utils/timeFormat';

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
      <div key={inx} className={`${theUserDataName ? "self-end" : 'self-start'} flex flex-row items-start`}>
        {!theUserDataName && 
          <div
            className='left-side-triangle'
          ></div>
        }

        <div 
          className={`${theUserDataName ? "[background-color:var(--red)] rounded-tr-none" : '[background-color:var(--pink)] rounded-tl-none'} w-m-2/3 flex flex-col gap-1 max-w-[90vw] p-3 rounded-lg`}
        > 
          <p className='self-start font-bold text-xl'>
            {theUserDataName ? "You" : dataName}
          </p>

          <p className={`${theUserDataName ? "[background-color:var(--darkRed)]" : "[background-color:var(--darkPink)]"} break-normal p-2 rounded-sm`}>
            {message}
          </p>

          <p className='self-end'>
            {timeFormat(timestamp)}
          </p>
        </div>

        {theUserDataName && 
          <div
            className='right-side-triangle'
          ></div>
        }
      </div>
    )
  })

  return (
    <div className='grow overflow-y-auto flex-1'>
      <div className='roomChat min-h-full max-h-full overflow-y-auto flex flex-col gap-3 p-2'>
        {renderMessages}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
 
export default RoomChat;