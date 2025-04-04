import './header.scss';

const Header = () => {
  return (
    <header className="headerHome w-full flex justify-center items-center border-b shadow-xl/20 border-solid">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold py-7">
        Ivaz Chat App
      </h1>
    </header>
  );
}
 
export default Header;