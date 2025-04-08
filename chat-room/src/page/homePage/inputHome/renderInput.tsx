import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/typedRedux";
import { setIdRoom, setUserName } from "../../../service/userData";
import { motion } from "framer-motion";
import './renderInput.scss';

const RenderInput = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const { idRoom, userName } = userData;
  const dispatch = useAppDispatch();

  const [clicked, setCliked] = useState<boolean[]>([false, false]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([null, null]);
  const containerRef = useRef<(HTMLDivElement | null)[]>([null, null]);
  const [showSayHi, setShowSayHi] = useState(false); 

  useEffect(() => {
    setCliked([
      userName !== "",
      idRoom !== ""
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSayHi(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current[0] && !containerRef.current[0].contains(e.target as Node) &&
        containerRef.current[1] && !containerRef.current[1].contains(e.target as Node) 
      ) {
        const newClicked = [
          userName !== "",
          idRoom !== ""
        ];
        setCliked(newClicked);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userName, idRoom]);

  const inputName: string[] = ["Enter Your Username", "Create or Enter ID"];

  const handleClick = (inx: number) => {
    setCliked(prev => {
      const updated = [...prev];

      updated[inx] = true;

      if (inx === 0 && idRoom === "") {
        updated[1] = false;
      }

      if (inx === 1 && userName === "") {
        updated[0] = false;
      }

      return updated;
    });

    setTimeout(() => {
      inputRef.current[inx]?.focus();
    }, 0);
  }

  const handleChange = (inx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (inx === 0) {
      dispatch(setUserName(value))
    } else {
      dispatch(setIdRoom(value))
    }
  }

  const handleFocus = (inx: number) => {
    setCliked(prev => {
      const updated = [...prev];
      updated[inx] = true;
      return updated;
    });
  };

  const handleBlur = (inx: number) => {
    setCliked(prev => {
      const updated = [...prev];
      if (inx === 1 && idRoom === "") {
        updated[1] = false;
      } else if (inx === 0 && userName === "") {
        updated[0] = false;
      }
      return updated;
    });
  };

  const renderInput = inputName.map((val: string, inx: number) => {
    return (
      <div 
        key={inx}
        ref={(el) => {containerRef.current[inx] = el}} 
        onClick={() => handleClick(inx)}
        className={`${clicked[inx] ? "outline-2 outline-offset-2" : ""} relative h-12 sm:h-13 md:h-14 relative flex flex-col justify-end gap-2 border border-solid rounded-sm cursor-text`}
        style={{ borderColor: "var(--white)", outlineColor: "var(--pink)" }} 
      >
        <p
          style={{
            color: !clicked[inx] ? "var(--pink)" : "var(--red)"
          }}
          className={`absolute w-full px-2 transition-all duration-250 ease-in-out left-0 select-none
            ${clicked[inx]
              ? "top-0  translate-y-0 text-xs sm:text-base md:text-lg lg:text-xl"
              : "top-1/2 -translate-y-1/2 text-base sm:text-lg md:text-xl lg:text-2xl"
            }`}
        >
          {val}
        </p>

        <input 
          value={inx === 0 ? userName : idRoom} 
          onChange={(e) => handleChange(inx, e)} 
          onFocus={() => handleFocus(inx)}
          onBlur={() => handleBlur(inx)}
          ref={(el) => {inputRef.current[inx] = el}} 
          className='w-full py-1 px-2 focus:outline-none' 
          type="text" 
        />

        {inx === 1 && showSayHi &&
          <motion.button 
            initial={{ scale: 0.8, rotate: 270 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="btnComment absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 duration-150 ease-in-out [background-color:var(--red)] hover:[background-color:var(--lightRed)] p-2 rounded-md rounded-l-none"
            onClick={() => dispatch(setIdRoom("0001"))}
          >
            <p>Say Hi!</p>
            <p>Using 0001</p>
          </motion.button>
        }
      </div>
    )
  })

  return renderInput;
}

export default RenderInput;
