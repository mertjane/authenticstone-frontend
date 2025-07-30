import { IoChevronDownOutline } from "react-icons/io5";
import type { MegaMenuItem } from "../types/menuContent.types";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { generateCategoryLink } from "../utils/generateCategoryLink";

interface Props {
  data: MegaMenuItem[];
  onClose: () => void;
}

const MobileMegamenu = ({ data, onClose }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Trigger the entrance animation after mounting
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const toggleIndex = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match with transition duration
  };

  return (
    <div className={`megamenu-container fixed w-screen h-screen top-[110px] left-0 z-50 bg-[#f9f8f3] overflow-y-auto transition-all duration-500 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="px-4 py-8">
        <ul className="flex flex-col">
          {data.map((menuItem, index) => {
            const hasChildren =
              Array.isArray(menuItem.children) && menuItem.children.length > 0;

            return (
              <li key={menuItem.title}>
                <div
                  className="flex items-center justify-between py-4 cursor-pointer"
                  onClick={() => toggleIndex(index)}
                >
                  <span className="text-xl hover:text-amber-800 duration-300">
                    {menuItem.title}
                  </span>
                  <IoChevronDownOutline
                    className={`transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </div>

                {/* Accordion Content */}
                {activeIndex === index && hasChildren && (
                  <div className="pl-4 pb-4">
                    {menuItem.children!.map((category) => {
                      const hasSubChildren =
                        Array.isArray(category.children) &&
                        category.children.length > 0;

                      return (
                        <div key={category.title} className="mb-6">
                          {hasSubChildren ? (
                            <>
                              <h3 className="text-lg font-medium text-amber-800 mb-3">
                                {category.title}
                              </h3>
                              <ul className="space-y-2">
                                {category.children!.map((child) => {
                                  const link = generateCategoryLink(
                                    category.title,
                                    child.title
                                  );
                                  return (
                                    <li key={child.title}>
                                      <Link
                                        onClick={handleClose}
                                        to={link}
                                        className="text-gray-600 hover:text-gray-900 block py-1"
                                      >
                                        {child.title}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </>
                          ) : (
                            // If no children, render category itself as a link
                            <Link
                              onClick={handleClose}
                              to={generateCategoryLink(
                                menuItem.title,
                                category.title
                              )}
                              className="text-gray-600 hover:text-gray-900 block py-1"
                            >
                              {category.title}
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}

          {/* Account link */}
          <li className="text-md cursor-pointer flex items-center gap-4 mt-6">
            <Link
              className="flex items-center hover:text-amber-800 duration-300"
              onClick={onClose}
              to="/my-account"
              title="My Account"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.167 22.917a8.333 8.333 0 0116.666 0H18.75a6.25 6.25 0 00-12.5 0H4.167zm8.333-9.375a6.248 6.248 0 01-6.25-6.25 6.248 6.248 0 016.25-6.25 6.248 6.248 0 016.25 6.25 6.248 6.248 0 01-6.25 6.25zm0-2.084a4.165 4.165 0 004.167-4.166A4.165 4.165 0 0012.5 3.125a4.166 4.166 0 00-4.167 4.167 4.166 4.166 0 004.167 4.166z"
                  fill="#DD7F41"
                ></path>
              </svg>
              <span className="ml-[15px]">Account</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="px-4 pb-8">
        <div className="border-t border-gray-200 pt-4">
          <a
            href="/collections"
            className="text-amber-800 hover:text-amber-900 font-medium block mb-4"
          >
            View All Collections →
          </a>
          <a
            href="/contact"
            className="bg-amber-800 text-white px-6 py-3 rounded hover:bg-amber-900 transition-colors duration-200 block text-center"
          >
            Get Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMegamenu;
