import { Link } from "react-router";
import footerLogo from "../assets/images/Authentic-Stone-Logo-Black-400x33-1.png";
import gatewayImage from "../assets/images/gateways-pay-logo.png";
import { FaRegPaperPlane } from "react-icons/fa6";
import { ROUTES } from "../routes/routePaths";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <div className="bg-[#f9f8f3] border-t border-[#e5e5e5] h-[90vh] w-full text-[#1d2328] p-10 flex flex-col">
      <div className="h-4/5 w-full flex gap-4">
        <div className="column flex-[1.6] flex flex-col gap-2">
          <img
            src={footerLogo}
            alt="Authentic Stone"
            className="h-[28px] w-auto object-contain"
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
          />
          <p className="mt-5">
            <small className="font-[var(--font-regular)] text-[1em] leading-[2]">
              Unit D2 / A1 Ranalah Estate, New Rd, Newhaven BN9 0EH, UK <br />
              PHONE: 01273 434 903 <br />
              EMAIL: info@authenticstone.co.uk <br />
              Warehouse / Showroom Opening Hours <br />
              Monday - Friday: 9:00am - 5:30pm Saturday : Closed
              (AppointmentsOnly) <br />
              Sunday : Closed Bank Holidays : Closed <br />
              COMPANY REGISTRATION NO: 07962075 <br />
              VAT NO: 134274722 <br />
            </small>
          </p>
        </div>
        <div className="column flex-1 pl-14 flex flex-col gap-2">
          <strong className="flex text-[14px] text-amber-700 font-light uppercase tracking-widest border-b border-[#e5e5e5] pb-2">
            Company
          </strong>
          <ul className="mt-5 flex flex-col gap-4 w-max text-[15px] tracking-wide">
            <li>
              <Link to={ROUTES.ABOUT_US}>About Us</Link>
            </li>
            <li>
              <Link to="/samples">Samples</Link>
            </li>
            <li>
              <Link to={ROUTES.BLOGS_PAGE}>Discover Our Blog</Link>
            </li>
            <li>
              <Link to={ROUTES.REVIEWS}>Reviews</Link>
            </li>
          </ul>
        </div>
        <div className="column flex-1 pl-14 flex flex-col gap-2">
          <strong className="flex text-[14px] text-amber-700 font-light uppercase tracking-widest border-b border-[#e5e5e5] pb-2">
            SUPPORT
          </strong>
          <ul className="mt-5 flex flex-col gap-4 w-max text-[15px] tracking-wide">
            <li>
              <Link to={ROUTES.CONTACT_US}>Contact Us</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
            </li>
            <li>
              <Link to={ROUTES.TERMS_CONDITIONS}>Terms & Conditions</Link>
            </li>
            <li>
              <Link to={ROUTES.DELIVERY}>Delivery Information</Link>
            </li>
            <li>
              <Link to={ROUTES.RETURN_POLICY}>Return & Refund Policy</Link>
            </li>
          </ul>
        </div>
        <div className="colcolumn flex-1 pl-14 flex flex-col gap-2">
          <strong className="flex text-[14px] text-amber-700 font-light uppercase tracking-widest border-b border-[#e5e5e5] pb-2">
            Advice From Specialist
          </strong>
          <ul className="mt-5 flex flex-col gap-4 w-max text-[15px] tracking-wide">
            <li>
              <Link to={ROUTES.INSTALLATION}>Installation</Link>
            </li>
            <li>
              <Link to={ROUTES.ADHESIVE}>Adhesive & Grout Advice</Link>
            </li>
            <li>
              <Link to={ROUTES.SEALING_MAINTENANCE}>Selaing Maintenance Advice</Link>
            </li>
          </ul>
        </div>
        <div className="column flex-[1.1] pl-14 flex flex-col justify-start">
          <h3 className="text-[1.5em] text-amber-700 text-center font-light relative top-[-4px]">
            Join Our Newsletter
          </h3>
          <small className="text-[14px] flex mt-7 text-center text-[#1d2328] tracking-wide">
            Get E-Mail Updates About Our Latest Shop And Special Offers
          </small>
          <div className="relative flex items-center py-8 w-full">
            <input
              className="px-4 w-full focus:border-[#1d2328] duration-300 border border-[#e5e5e5] py-4 outline-none bg-[#f9f8f3] placeholder:font-light placeholder:text-[15px]"
              type="text"
              placeholder="Enter your email here..."
            />
            <FaRegPaperPlane
              color="#1d2328"
              size={14}
              className="absolute right-3 bottom-13 cursor-pointer"
              title="Join Newsletter"
            />
          </div>
          <SocialIcons /> 
        </div>
      </div>
      <div className="h-1/5 w-full flex flex-col gap-2 items-center justify-end">
        <small className="text-slate-600">
          © 2025 All rights reserved, Authentic Stone
        </small>
        <img
          src={gatewayImage}
          alt="Gateway"
          className="w-min h-[20px] object-cover"
        />
      </div>
    </div>
  );
};

export default Footer;
