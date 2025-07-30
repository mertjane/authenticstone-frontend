import { FiYoutube, FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const SocialIcons = () => {
  return (
    <div className="w-max p-2 flex items-center gap-4 mx-auto">
      <Link
        to="https://www.facebook.com/authenticstoneofficial"
        className="flex items-center"
        title="Facebook"
        target="_blank"
      >
        <FiFacebook className="cursor-pointer" color="#1d2328" size={22} />
      </Link>
      <Link
        to="https://www.youtube.com/@evrimbas"
        className="flex items-center"
        title="Youtube"
        target="_blank"
      >
        <FiYoutube className="cursor-pointer" color="#1d2328" size={22} />
      </Link>
      <Link
        to="https://www.instagram.com/authenticstoneofficial/"
        className="flex items-center"
        title="Instagram"
        target="_blank"
      >
        <FaInstagram className="cursor-pointer" color="#1d2328" size={22} />
      </Link>
    </div>
  );
};

export default SocialIcons;
