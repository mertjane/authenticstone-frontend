
import { PiPencilRulerLight } from "react-icons/pi";

interface DisplayCutProps {
  isOpen: () => void;
}

const DisplayWeCanCut = ({isOpen}: DisplayCutProps) => {
  return (
    <div className="mt-14 mb-5" onClick={isOpen}>
      <div
        className="flex items-center justify-center space-x-4 cursor-pointer border-b-2 border-r-2 border-amber-800 mx-auto w-max py-2 px-6"
        title="Request Tile Cut Form"
      >
        <div>
          <PiPencilRulerLight size={50} className="text-gray-700" />
        </div>
        <span className="flex flex-col">
          <p className="text-gray-800 text-lg tracking-wide uppercase font-[var(--font-regular)]">
            can't find your size?
          </p>
          <p className="text-gray-800 text-lg tracking-wide uppercase font-[var(--font-regular)]">
            we can cut any sizes
          </p>
        </span>
      </div>
    </div>
  );
};

export default DisplayWeCanCut;
