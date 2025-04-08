import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks/typedRedux';
import './inputChat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSendMessage } from '../../../service/firebase/firebaseQuery';

const InputChat = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName } = userData;
  const { mutate, isPending } = useSendMessage();

  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`; 
    }
  }, [message]);

  const handleSend = () => {
    mutate({
      idRoom: idRoom,
      message: message,
      username: userName,
    })
  }

  return (
    <div 
      style={{
        borderColor: "var(--red)",
      }}
      className='inputChat border-t flex flex-row items-center gap-5 md:px-7 lg:px-10 py-3 md:py-4 lg:py-5 px-3'
    >
      <textarea
        style={{
          borderColor: "var(--white)",
          outlineColor: "var(--pink)",
        }} 
        className='w-full p-2 border overflow-hidden resize-none rounded-sm focus:outline-offset-2 focus:outline-2'
        rows={1}
        ref={textareaRef}
        value={message} 
        onChange={handleInput}
      ></textarea>

      <button
        className='rounded-sm cursor-pointer duration-150 ease-in-out [background-color:var(--red)] hover:[background-color:var(--lightRed)] flex justify-center items-center gap-2 p-2'
        onClick={handleSend}
      >
        <FontAwesomeIcon icon={isPending ? faSpinner : faPaperPlane} /> {!isPending ? "Send" : "Wait"}
      </button>
    </div>
  );
}
 
export default InputChat;