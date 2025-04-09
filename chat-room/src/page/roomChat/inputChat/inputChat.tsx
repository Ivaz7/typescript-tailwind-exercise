import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/typedRedux';
import './inputChat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner, faX } from '@fortawesome/free-solid-svg-icons';
import { useSendMessage } from '../../../service/firebase/firebaseQuery';
import { setDeleteReply } from '../../../service/replySlice';
import { AnimatePresence, motion } from 'framer-motion';

const InputChat = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const reply = useAppSelector((state) => state.replySlice.reply);
  const dispatch = useAppDispatch();
  const { idRoom, userName } = userData;
  const { mutate, isPending } = useSendMessage();

  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

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
    if (message.trim() === "") {
      return;
    }
    
    dispatch(setDeleteReply());
    setMessage("");

    mutate({
      idRoom: idRoom,
      message: message,
      username: userName,
      reply: reply,
    });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isEnter = e.key === "Enter";
    const isShift = e.shiftKey;
  
    if (!isMobile && isEnter && !isShift) {
      e.preventDefault();
      handleSend();
    }
  };  

  const handleDeleteReply = () => {
    dispatch(setDeleteReply());
  } 

  return (
    <div 
      style={{
        borderColor: "var(--red)",
      }}
      className='inputChat border-t flex flex-row items-center gap-5 md:px-7 lg:px-10 py-3 md:py-4 lg:py-5 px-3'
    > 
      <div className='flex w-full flex-col'>
        <AnimatePresence>
          {reply.id !== "" && reply.message !== "" && reply.username !== "" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className='[background-color:var(--red)] overflow-hidden p-2 rounded-lg'
            >
              <div className='[background-color:var(--darkPink)] p-2 rounded-sm flex flex-col gap-1'>
                <div className='flex flex-row items-center justify-between'>
                  <p className='font-bold text-lg'>
                    Reply
                  </p>

                  <button
                    className='cursor-pointer h-7 w-7 rounded-full flex justify-center items-center [background-color:transparent] hover:[background-color:var(--pink)]'
                    onClick={handleDeleteReply}
                  >  
                    <FontAwesomeIcon icon={faX} className='text-lg'/>
                  </button>
                </div>

                <div className='flex flex-col'>
                  <p className='font-bold text-md'>
                    {reply.username}
                  </p>

                  <p className='text-sm'>
                    {reply.message}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>

      <button
        className='self-end rounded-sm cursor-pointer duration-150 ease-in-out [background-color:var(--red)] hover:[background-color:var(--lightRed)] flex justify-center items-center gap-2 p-2'
        onClick={handleSend}
      >
        <FontAwesomeIcon icon={isPending ? faSpinner : faPaperPlane} /> {!isPending ? "Send" : "Wait"}
      </button>
    </div>
  );
}
 
export default InputChat;