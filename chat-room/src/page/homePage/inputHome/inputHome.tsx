import { useState } from 'react';
import './inputHome.scss';
import RenderInput from './renderInput';
import InvalidInput from './invalidInput';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/typedRedux';
import { devUsernameFilter } from '../../../utils/devUsernameFilter';

const InputHome = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName } = userData;
  const [notValid, setNotValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    if (userName.trim().length < 1 || idRoom.trim().length < 4 || devUsernameFilter(userName)) {
      setNotValid(true);
      return;
    }

    navigate("/chat");
  }

  return (
    <>
      {notValid && <InvalidInput setNotValid={setNotValid} />}

      <div className="inputHome max-w-[90vw] xs:w-90 sm:w-100 w-80 transition-all duration 150 ease-in-out flex flex-col gap-4 border hover:border-2 hover:shadow-2xl/50 boder-solid rounded-2xl p-6 mt-auto mb-auto">
        <p style={{ color: "var(--pink"}} className='text-center text-lg sm:text-xl md:text-2xl font-bold'>
          VazzChat
        </p>

        <p className='text-center text-base sm:text-lg md:text-xl lg:text-2xl'>
          Chat with anyone, anytime, anywhere — just using a Room ID.
        </p>

        <RenderInput />

        <button
          style={{ backgroundColor: "var(--red)"}}
          onClick={handleEnter}
          className='rounded-sm py-2 text-xl font-bold cursor-pointer duration-150 ease-in-out hover:opacity-70'
        >
          Enter
        </button>
      </div>
    </>
  );
}
 
export default InputHome; 