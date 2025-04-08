import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/typedRedux';
import './headerChat.scss';
import { setDeleteIdRoom, setDeleteUserName } from '../../../service/userData';

const HeaderChat = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName } = userData;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleExit = () => {
    dispatch(setDeleteIdRoom());
    dispatch(setDeleteUserName());
    navigate("/")
  } 

  return (
    <header className='fixed top-0 left-0 flex flex-row justify-between headerChat w-full flex items-center border-b shadow-xl/20 border-solid md:px-7 lg:px-10 py-1 md:py-4 lg:py-5 px-3'>
      <div className='flex flex-col'>
        <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl font-bold'>
          {userName}
        </h1>

        <p className='text-sm sm:text-base md:text-md lg:text-lg'>
          {idRoom}
        </p>
      </div>

      <button
      style={{
        backgroundColor: "var(--red)",
      }}
        className='py-1 md:py-2 md:px-3 px-4 rounded-sm sm:text-base md:text-lg lg:text-xl font-bold'
        onClick={handleExit}
      >
        Exit
      </button>
    </header>
  );
}
 
export default HeaderChat;