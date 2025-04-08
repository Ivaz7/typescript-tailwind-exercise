import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks/typedRedux';
import './inputChat.scss';

const InputChat = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName } = userData;

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
    console.log(idRoom, "idRoom")
    console.log(userName, "userName")
  }

  return (
    <div 
      style={{
        borderColor: "var(--red)",
      }}
      className='inputChat border-t flex flex-row justify-between gap-5 md:px-7 lg:px-10 py-1 md:py-4 lg:py-5 px-3'
    >
      <textarea
        style={{
          borderColor: "var(--white)",
          outlineColor: "var(--pink)",
        }} 
        className='grow p-2 border overflow-hidden resize-none rounded-sm focus:outline-offset-2 focus:outline-2'
        rows={1}
        ref={textareaRef}
        value={message} 
        onChange={handleInput}
      ></textarea>

      <button
        style={{
          backgroundColor: "var(--red)",
        }}
        className='self-end rounded-full h-15 w-15'
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
 
export default InputChat;