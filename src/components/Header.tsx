import Navigation from "./Navigation";
import Menubar from "./Menubar";


const Header = () => {

  return (
    <div className="h-auto xl:px-10 lg:8 md:4 px-4">
      <Navigation />
      <Menubar />
    </div>
  );
};

export default Header;
