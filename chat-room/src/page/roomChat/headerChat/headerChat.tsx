import { useAppSelector } from '../../../hooks/typedRedux';
import './headerChat.scss';

const HeaderChat = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName } = userData;

  return (
    <header className='headerChat w-full flex items-center border-b shadow-xl/20 border-solid'>
      <div className='flex flex-col md:m-3 lg:m-4 md:px-7 lg:px-10 py-1 px-3'>
        <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl font-bold'>
          {userName}
        </h1>

        <p className='text-sm sm:text-base md:text-md lg:text-lg'>
          {idRoom}
        </p>
      </div>
    </header>
  );
}
 
export default HeaderChat;