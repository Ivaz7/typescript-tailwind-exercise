import { useState } from "react";

const HiOrSqr = () => {
  const [input, setInput] = useState<string>();
  const [answer, setAnswer] = useState<string | number>();

  const HiOrSqr = () => {
    const num = Number(input);

    if (!isNaN(num)) {
      setAnswer(num * 2);
    } else {
      setAnswer(`Hi ${input}!`);
    }
  }

  return ( 
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />

      <button onClick={HiOrSqr}>
        Okay
      </button>

      <p>
        {answer}
      </p>
    </>
  );
}
 
export default HiOrSqr;