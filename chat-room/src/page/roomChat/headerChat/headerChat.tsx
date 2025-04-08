import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/typedRedux';
import './headerChat.scss';
import { setDeleteIdRoom, setDeleteUserName } from '../../../service/userData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
    <header className='flex flex-row justify-between headerChat w-full flex items-center border-b border-solid md:px-7 lg:px-10 py-1 md:py-4 lg:py-5 px-3'>
      <div className='flex flex-col'>
        <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl font-bold'>
          {userName}
        </h1>

        <p className='text-sm sm:text-base md:text-md lg:text-lg'>
          {idRoom}
        </p>
      </div>

      <button
        className='py-1 md:py-2 md:px-3 px-4 cursor-pointer duration-150 ease-in-out [background-color:var(--red)] hover:[background-color:var(--lightRed)] rounded-sm sm:text-base md:text-lg lg:text-xl font-bold'
        onClick={handleExit}
      >
        <FontAwesomeIcon icon={faRightFromBracket} /> Exit
      </button>
    </header>
  );
}
 
export default HeaderChat;