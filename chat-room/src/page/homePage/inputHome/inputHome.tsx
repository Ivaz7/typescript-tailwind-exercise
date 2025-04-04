import './inputHome.scss';

const InputHome = () => {
  interface Input {
    inputName: string,
    inputPlaceholder: string,
    type: string,
  }

  const inputName: Input[] = [
    {
      inputName: "Enter Your Username",
      inputPlaceholder: "Type Your Username Here",
      type: "text",
    },
    {
      inputName: "Create or Enter Room Chat",
      inputPlaceholder: "Type new ID or existed ID",
      type: "number",
    }
  ] 

  const renderInput = inputName.map((val: Input, inx: number) => {
    const { inputName, inputPlaceholder, type } = val;

    return (
      <div key={inx} className='flex flex-col gap-2'>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-center'>
          {inputName}
        </p>

        <input className='border border-solid rounded-sm py-1 px-2 focus:outline-1 focus:outline-offset-2' placeholder={inputPlaceholder} type={type} />
      </div>
    )
  })

  return (
    <div className="inputHome flex flex-col gap-4 border hover:border-2 hover:shadow-2xl/50 boder-solid rounded-2xl p-6 mt-auto mb-auto">
      {renderInput}
    </div>
  );
}
 
export default InputHome; 