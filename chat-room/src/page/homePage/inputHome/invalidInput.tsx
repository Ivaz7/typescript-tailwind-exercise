import './invalidInput.scss'
import FloatingContainer from "../../../component/floatingContainer/floatingContainter";
import { JSX, useEffect, useState } from 'react';

type Input = {
  valueInput: string[],
  setNotValid: React.Dispatch<React.SetStateAction<boolean>>,
}

const InvalidInput = ({ valueInput, setNotValid }: Input ) => {
  const [output, setOutput] = useState<(JSX.Element | null)[]>([null, null]);

  useEffect(() => {
    const res = [
      valueInput[0].trim().length < 1 
        ? <p>
            You need atleas 1 Character for your usename
          </p>
        : null,
      valueInput[1].trim().length < 4
        ? <p>
            You need atleas 4 Character for your ID room
          </p>
        : null,
    ]

    setOutput(res)
  }, [valueInput])

  return (
    <FloatingContainer>
      <div 
        style={{
          borderColor: "var(--red)",
          backgroundColor: "var(--black)"
        }}
        className="invalidContainer w-70 p-5 rounded-lg border flex flex-col gap-2"
      >
        <div className='flex justify-between items-center'>
          <p className='text-bold'>Error</p>

          <button 
            className="cancelBtn self-end cursor-pointer w-10 h-10 rounded-full flex justify-center items-center"
            onClick={() => setNotValid(false)}
          >
            X
          </button>
        </div>

        {output}
      </div>
    </FloatingContainer>
  );
}
 
export default InvalidInput;