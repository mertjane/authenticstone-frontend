import { useState } from "react";
import gatewayImage from "../assets/images/gateways-pay-logo.png";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router";
import { ROUTES } from "../routes/routePaths";

const MobileFooter = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setSelected((prev) => (prev === key ? null : key));
  };

  const routeMap: Record<string, string> = {
    "About Us": ROUTES.ABOUT_US,
    "Samples": "/samples",
    "Discover Our Blog": ROUTES.BLOGS_PAGE,
    "Reviews": ROUTES.REVIEWS,
    "Contact Us": ROUTES.CONTACT_US,
    "FAQ": ROUTES.FAQ,
    "Privacy Policy": ROUTES.PRIVACY_POLICY,
    "Terms & Conditions": ROUTES.TERMS_CONDITIONS,
    "Delivery Information": ROUTES.DELIVERY,
    "Return & Refun Policy": ROUTES.RETURN_POLICY,
    "Installation": ROUTES.INSTALLATION,
    "Adhesive & Grout Advice": ROUTES.ADHESIVE,
    "Sealing Maintenance Advice": ROUTES.SEALING_MAINTENANCE,
  };

  const sections = [
    {
      key: "company",
      title: "company",
      items: ["About Us", "Samples", "Discover Our Blog", "Reviews"],
    },
    {
      key: "support",
      title: "support",
      items: [
        "Contact Us",
        "FAQ",
        "Privacy Policy",
        "Terms & Conditions",
        "Delivery Information",
        "Return & Refun Policy",
      ],
    },
    {
      key: "advice",
      title: "advice from specialist",
      items: [
        "Installation",
        "Adhesive & Grout Advice",
        "Sealing Maintenance Advice",
      ],
    },
  ];

  return (
    <footer className="min-h-[50vh] bg-[#f9f8f3] border-t border-[#e5e5e5] py-8 flex flex-col gap-4">
      {sections.map((section) => {
        const isOpen = selected === section.key;
        return (
          <ul key={section.key} className="my-0 mx-auto w-5/6">
            <h3
              onClick={() => toggleSection(section.key)}
              className="pl-2 text-[#ae534d] cursor-pointer uppercase leading-loose border-b border-[#e5e5e5] flex flex-row items-center justify-between"
            >
              {section.title}
              <FiChevronDown
                className={`transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </h3>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen
                  ? "max-h-96 opacity-100 mt-2 visible"
                  : "max-h-0 opacity-0 invisible"
              } flex flex-col pl-2 text-sm gap-1.5 `}
            >
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="cursor-pointer duration-300 hover:text-gray-600"
                >
                  <Link to={routeMap[item]}>{item}</Link>
                </li>
              ))}
            </div>
          </ul>
        );
      })}

      <div className="mt-12 h-full w-full flex flex-col gap-2 items-center justify-end">
        <small className="text-gray-500">
          © 2025 All rights reserved, Authentic Stone
        </small>
        <img
          src={gatewayImage}
          alt="Gateway"
          className="w-min h-[20px] object-cover"
        />
      </div>
    </footer>
  );
};

export default MobileFooter;
