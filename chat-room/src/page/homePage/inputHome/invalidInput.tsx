import './invalidInput.scss'
import FloatingContainer from "../../../component/floatingContainer/floatingContainter";
import { JSX, useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';

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
      <motion.div 
        style={{
          borderColor: "var(--red)",
          backgroundColor: "var(--black)"
        }}
        className="invalidContainer w-70 p-5 rounded-lg border flex flex-col gap-2"
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className='flex justify-between items-center'>
          <p style={{ color: "var(--red)"}} className='font-bold'>Error</p>

          <button 
            className="cancelBtn cursor-pointer w-7 h-7 rounded-full flex justify-center items-center"
            onClick={() => setNotValid(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

        {output}
      </motion.div>
    </FloatingContainer>
  );
}
 
export default InvalidInput;