import './header.scss';

const Header = () => {
  return (
    <header className="headerHome w-full flex items-center border-b shadow-xl/20 border-solid">
      <div className='flex md:m-3 lg:m-4'>
        <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold py-1 px-3 md:px-7 lg:px-10">
          VazzChat
        </h1>
      </div>
    </header>
  );
}
 
export default Header;