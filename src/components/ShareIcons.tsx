import { FaFacebook, FaInstagramSquare, FaPinterest } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ShareIcons = () => {
  return (
    <div className="flex items-center justify-center gap-3 pt-5 pb-10">
      <span className="text-amber-800 uppercase font-[var(--font-light)] tracking-wider text-[14px]">
        share:
      </span>
      <FaFacebook
        size={34}
        className="rounded-full w-9 h-9 p-2 border border-[#e5e5e5] cursor-pointer text-[#808387] hover:text-amber-800 duration-300"
      />
      <FaInstagramSquare
        className="rounded-full w-9 h-9 p-2 border border-[#e5e5e5] cursor-pointer text-[#808387] hover:text-amber-800 duration-300"
        size={34}
      />
      <FaPinterest
        className="rounded-full w-9 h-9 p-2 border border-[#e5e5e5] cursor-pointer text-[#808387] hover:text-amber-800 duration-300"
        size={34}
      />
      <MdEmail
        className="rounded-full w-9 h-9 p-2 border border-[#e5e5e5] cursor-pointer text-[#808387] hover:text-amber-800 duration-300"
        size={34}
      />
    </div>
  );
};

export default ShareIcons;
