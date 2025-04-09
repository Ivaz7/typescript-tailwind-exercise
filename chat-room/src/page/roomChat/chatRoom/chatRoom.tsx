import { useAppDispatch, useAppSelector } from '../../../hooks/typedRedux';
import { useGetMessages } from '../../../service/firebase/firebaseQuery';
import './chatRoom.scss';
import type { Message } from '../../../service/firebase/firebaseAPI';
import { useEffect, useRef } from 'react';
import { timeFormat } from '../../../utils/timeFormat';
import { setReply } from '../../../service/replySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

const RoomChat = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName: realName }= userData;
  const dispatch = useAppDispatch();
  const { data: messages } = useGetMessages(idRoom);

  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollToMessage = (id: string) => {
    const el = messageRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };  

  const handleSetReply = (id: string, message: string, dataName: string) => {
    dispatch(setReply({
      id,
      message,
      username: dataName,
    }))
  }

  const renderMessages = messages?.map((val: Message, inx: number) => {
    const { reply, id, message, timestamp, username: dataName } = val;

    const theUserDataName: boolean = dataName === realName;

    const buttonReply = (
      <button
        className='m-2 cursor-pointer rounded-full bg-color-transparent duration-150 ease-in-out h-6 w-6 hover:[background-color:var(--gray)]'
        onClick={() => handleSetReply(id, message, dataName)}
      >
        <FontAwesomeIcon icon={faReply} />
      </button>
    )

    return (
      <div 
        key={inx} 
        className={`${theUserDataName ? "self-end" : 'self-start'} flex flex-row items-start`}
        ref={(el) => {messageRefs.current[id] = el}}
      >
        {!theUserDataName && 
          <div
            className='left-side-triangle'
          ></div>
        }

        {theUserDataName && 
          buttonReply
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
            {typeof timestamp === 'number' ? timeFormat(timestamp) : '-'}
          </p>
        </div>

        {theUserDataName && 
          <div
            className='right-side-triangle'
          ></div>
        }

        {!theUserDataName && 
          buttonReply
        }

        {reply &&
          <div
            className=''
            onClick={() => scrollToMessage(reply.id)}
          >
            {reply?.message}
            {reply?.username}
          </div>
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