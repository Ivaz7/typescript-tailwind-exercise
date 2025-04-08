import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/typedRedux';
import HeaderChat from '../headerChat/headerChat';
import './mainChatPg.scss';
import RoomChat from '../chatRoom/chatRoom';
import InputChat from '../inputChat/inputChat';

const MainChatPage = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName } = userData;
  const navigate = useNavigate();

  if (idRoom === "" && userName === "") {
    navigate("/");
    return;
  }

  return (
    <div className="mainChatPg flex flex-col min-h-full">
      <HeaderChat />
      <RoomChat />
      <InputChat />
    </div>
  );
}
 
export default MainChatPage;