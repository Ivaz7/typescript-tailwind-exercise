import { useState } from 'react';
import './inputHome.scss';
import RenderInput from './renderInput';

const InputHome = () => {
  const [valueInput, setValueInput] = useState<string[]>(["", ""]);

  return (
    <div className="inputHome max-w-[90vw] xs:w-90 sm:w-100 w-80 transition-all duration 150 ease-in-out flex flex-col gap-4 border hover:border-2 hover:shadow-2xl/50 boder-solid rounded-2xl p-6 mt-auto mb-auto">
      <p style={{ color: "var(--pink"}} className='text-center text-lg sm:text-xl md:text-2xl font-bold'>
        VazzChat
      </p>

      <p className='text-center text-base sm:text-lg md:text-xl lg:text-2xl'>
        Chat with anyone, anytime, anywhere — just using a Room ID.
      </p>

      <RenderInput valueInput={valueInput} setValueInput={setValueInput} />

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