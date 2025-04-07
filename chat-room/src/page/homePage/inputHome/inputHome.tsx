import { useEffect, useRef, useState } from 'react';
import './inputHome.scss';

const InputHome = () => {
  const [clicked, setCliked] = useState<boolean[]>([false, false]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([null, null]);
  const containerRef = useRef<(HTMLDivElement | null)[]>([null, null]);
  const [valueInput, setValueInput] = useState<string[]>(["", ""]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current[0] && !containerRef.current[0].contains(e.target as Node) &&
        containerRef.current[1] && !containerRef.current[1].contains(e.target as Node) 
      ) {
        const newClicked = [
          valueInput[0] !== "",
          valueInput[1] !== ""
        ];
        setCliked(newClicked);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [valueInput]);

  const inputName: string[] = ["Enter Your Username", "Create or Enter ID"];
  
  const handleClick = (inx: number) => {
    setCliked(prev => {
      const updated = [...prev];

      for (let i = 0; i < updated.length; i++) {
        if (inx === i) {
          if (updated[inx] !== true) { 
            updated[inx] = !updated[inx];
          }
        } else {
          if (valueInput[i] === "") {
            updated[i] = false;
          }
        }
      }

      return updated;
    });
    inputRef.current[inx]?.focus();
  }


  const handleChange = (inx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValueInput(prev => {
      const updated = [...prev];
      updated[inx] = value;
      return updated;
    })
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
      if (valueInput[inx] === "") {
        updated[inx] = false;
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
        className={`${clicked[inx] ? "outline-1 outline-offset-2" : ""} h-12 sm:h-13 md:h-14 relative flex flex-col justify-end gap-2 border border-solid rounded-sm`}
        style={{ borderColor: "var(--white)", outlineColor: "var(--lightRed)" }} 
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
          value={valueInput[inx]} 
          onChange={(e) => handleChange(inx, e)} 
          onFocus={() => handleFocus(inx)}
          onBlur={() => handleBlur(inx)}
          ref={(el) => {inputRef.current[inx] = el}} 
          className='w-full py-1 px-2 focus:outline-none' 
          type="text" 
        />
      </div>
    )
  })

  return (
    <div className="inputHome max-w-[90vw] xs:w-90 sm:w-100 w-80 transition-all duration 150 ease-in-out flex flex-col gap-4 border hover:border-2 hover:shadow-2xl/50 boder-solid rounded-2xl p-6 mt-auto mb-auto">
      <p style={{ color: "var(--pink"}} className='text-center text-lg sm:text-xl md:text-2xl font-bold'>
        VazzChat
      </p>

      <p className='text-center text-base sm:text-lg md:text-xl lg:text-2xl'>
        Chat with anyone, anytime, anywhere — just using a Room ID.
      </p>

      {renderInput}

      <button
        style={{ backgroundColor: "var(--red)"}}
        className='rounded-sm py-2 text-xl font-bold cursor-pointer duration-150 ease-in-out hover:opacity-70'
      >
        Enter
      </button>
    </div>
  );
}
 
export default InputHome; 