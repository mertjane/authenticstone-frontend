import logo from "../assets/images/Authentic-Stone-Logo-Black-400x33-1.png";
import { CiSearch } from "react-icons/ci";
import Megamenu from "./Megamenu";
import { useEffect, useState } from "react";
import type { MegaMenuItem } from "../types/menuContent.types";
import { useMegamenuQuery } from "../queries/megamenu.queries";
import { staticMegamenuData } from "../utils/staticMenuItems";
import useIsMobile from "../hooks/useIsMobile";
import MobileMegamenu from "./MobileMegamenu";
import HamburgerMenu from "./hamburgerMenu";
import { Link } from "react-router";

const Menubar = () => {
  const isMobile = useIsMobile();
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: apiData } = useMegamenuQuery();

  const handleClick = (title: string) => {
    setActiveTitle((prev) => (prev === title ? null : title));
  };

  // Merge static top-level items with dynamic children (optional)
  const mergedMenuData: MegaMenuItem[] = staticMegamenuData.map((item) => {
    const match = apiData?.find((apiItem) => apiItem.title === item.title);
    return {
      ...item,
      children: match?.children ?? [],
    };
  });

  const activeData = mergedMenuData.find((item) => item.title === activeTitle);
  const leftMenus = mergedMenuData.slice(0, 2);
  const rightMenus = mergedMenuData.slice(2);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden"); // Cleanup
    };
  }, [isMenuOpen]);

  return (
    <div className="py-2 md:py-8 w-full flex items-center justify-between relative">
      {/* MOBILE SEARCHBAR */}
      <span className="h-full w-[90%] mb-4 relative flex md:hidden border-b border-[#e5e5e5] items-center">
        <CiSearch
          size={22}
          color="#1d2328"
          strokeWidth={1}
          className="absolute left-0 top-1/2 -translate-y-1/2"
        />
        <input
          type="text"
          className="h-full py-2 w-full pl-8 border-none outline-none text-sm placeholder:font-light"
          placeholder="Search for products..."
        />
      </span>
      <ul className="hidden md:flex items-center gap-8 text-xl">
        {leftMenus.map((menu) => (
          <li
            key={menu.title}
            className={`menu-trigger font-[var(--font-medium)] cursor-pointer hover:text-amber-800 ${
              activeTitle === menu.title ? "text-amber-800" : ""
            }`}
            onClick={() => handleClick(menu.title)}
          >
            {menu.title}
          </li>
        ))}
      </ul>
      <Link to="/">
        <img
          className="object-contain w-[400px] h-full hidden md:block"
          width={400}
          height={33}
          src={logo}
          alt="Site Logo"
          title="Home"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <img
          className="object-contain w-[300px] h-full hidden md:hidden"
          width={300}
          height={25}
          src={logo}
          alt="Site Logo"
          title="Home"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </Link>
      <ul className="hidden md:flex items-center gap-8 text-xl">
        {rightMenus.map((menu) => (
          <li
            key={menu.title}
            className={`menu-trigger cursor-pointer hover:text-amber-800 ] ${
              activeTitle === menu.title ? "text-amber-800 " : ""
            }`}
            onClick={() => handleClick(menu.title)}
          >
            {menu.title}
          </li>
        ))}
      </ul>

      {/* MOBILE BURGER MENU */}
      <div className="md:hidden w-[30px] h-[30px] relative flex items-center justify-center">
        {isMobile && <HamburgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />}
      </div>

      {/* Conditionally render mobile megamenu */}
      {isMobile && isMenuOpen && <MobileMegamenu data={mergedMenuData} onClose={() => setIsMenuOpen(false)}/>}
      {/* DYNAMIC MEGAMENU */}
      <Megamenu
        isMenuOpen={!!activeData}
        data={activeData || mergedMenuData[0]} // Provide fallback data
        onClose={() => setActiveTitle(null)} // Add close handler
      />
    </div>
  );
};

export default Menubar;
