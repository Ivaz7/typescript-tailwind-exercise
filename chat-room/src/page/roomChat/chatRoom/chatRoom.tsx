import { useAppSelector } from '../../../hooks/typedRedux';
import { useGetMessages } from '../../../service/firebase/firebaseQuery';
import './chatRoom.scss';
import type { Message } from '../../../service/firebase/firebaseAPI';

const RoomChat = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName: realName }= userData;
  const { data: messages } = useGetMessages(idRoom);

  console.log(messages)

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
    <div className='grow'>
      <div className='roomChat min-h-full max-h-full flex flex-col'>
        {renderMessages}
      </div>
    </div>
  );
}
 
export default RoomChat;