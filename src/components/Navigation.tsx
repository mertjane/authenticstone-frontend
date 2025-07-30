import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BiBasket } from "react-icons/bi";
import logo from "../assets/images/Authentic-Stone-Logo-Black-400x33-1.png";
import useIsMobile from "../hooks/useIsMobile";
import { useEffect } from "react";
import Cart from "./Cart";
import { useCartState } from "../hooks/useCartState";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router";

const Navigation = () => {
  const isMobile = useIsMobile();
  const { isCartOpen, toggleCart } = useCartState();
  const { cartItems } = useCart();

  // Calculate total items count
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isCartOpen]);

  return (
    <>
      <div className="w-full h-[55px] border-b-0 md:border-b md:border-[#e5e5e5] flex items-center justify-between">
        {/* Searchbar */}
        <span className="h-full relative hidden md:flex items-center">
          <CiSearch
            size={22}
            color="#1d2328"
            strokeWidth={1}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            className="h-full w-full pl-8 border-none outline-none text-sm placeholder:font-light"
            placeholder="Search for products..."
          />
        </span>
        {/* Mobile screen Logo */}
        <Link to="/">
          <img
            className="object-contain w-[300px] h-full md:hidden"
            src={logo}
            alt="Site Logo"
            title="Home"
          />
        </Link>
        {/* profile and basket */}
        <span className="h-full flex items-center gap-4 md:gap-8">
          {isMobile ? (
            <></>
          ) : (
            <Link to="/my-account" className="flex items-center">
              <CgProfile
                color="#1d2328"
                className="cursor-pointer size-[22px] md:size[25px]"
                title="My Account"
              />
            </Link>
          )}

          <div className="relative">
            <BiBasket
              color="#1d2328"
              className="cursor-pointer relative bottom-[1.4px] size-[24px] md:size[30px]"
              title="Shopping Cart"
              onClick={toggleCart}
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#aa4a44] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </span>
      </div>
      <Cart />
    </>
  );
};

export default Navigation;
