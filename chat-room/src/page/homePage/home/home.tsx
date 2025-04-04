import Header from '../header/header';
import InputHome from '../inputHome/inputHome';
import './home.scss';

const HomePage = () => {
  return (
    <div className="homePage w-full min-h-screen flex flex-col items-center">
      <Header />
      <InputHome />
    </div>
  );
}
 
export default HomePage;