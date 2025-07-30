
import "../lib/styles/hamburger.css"

interface HamburgerMenuProps {
    isOpen: boolean;
    onClick: () => void;
  }

const HamburgerMenu = ({ isOpen, onClick }: HamburgerMenuProps) => {
  return (
    <div id="nav-icon1" className={isOpen ? "open" : ""}
    onClick={onClick}>
    <span></span>
    <span></span>
    <span></span>
    </div>
  )
}

export default HamburgerMenu