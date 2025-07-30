import { Link } from "react-router";
import type { MegaMenuItem } from "../types/menuContent.types";
import { generateCategoryLink } from "../utils/generateCategoryLink";

interface MegamenuProps {
  data: MegaMenuItem;
  isMenuOpen: boolean;
  onClose: () => void;
}

const Megamenu = ({ data, isMenuOpen, onClose }: MegamenuProps) => {
  const children = data.children || [];
  const handleMegamenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseMenu = () => onClose();

  // Force 1 column if children exist but no grandchildren (flat list)
  const isFlatList =
    children.length > 0 &&
    !children.some((c) => c.children && c.children.length > 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 top-40 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
      <div
        className={`w-screen border-t border-[#e5e5e5] pt-2 pb-5 px-10 bg-white absolute top-[95px] left-[-40px] z-[1001] megamenu-wrapper
      transition-all duration-300 ease-in-out transform
      ${
        isMenuOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-[-10px]"
      }
    `}
        style={{
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        onClick={handleMegamenuClick}
      >
        <div
          className="grid gap-8 h-auto"
          style={{
            gridTemplateColumns: isFlatList
              ? "1fr"
              : "repeat(auto-fit, minmax(180px, 1fr))", // min 180px per column, adjust as needed
          }}
        >
          {isFlatList ? (
            // ONE column: heading + all children as vertical list
            <div className="pr-6 last:border-r-0">
              <h2 className="uppercase text-lg font-semibold mb-4 text-amber-800">
                {data.title}
              </h2>
              <ul className="space-y-2">
                {children.map((child, i) => (
                  <li key={child.title + i} className="w-max">
                    <Link
                      onClick={handleCloseMenu}
                      to={generateCategoryLink(data.title, child.title)}
                      className="text-lg text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200 block"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            // Normal case: multiple columns for categories with subchildren
            children.map((category, i) => {
              const hasSubChildren =
                Array.isArray(category.children) &&
                category.children.length > 0;
              return (
                <div
                  key={`${category.title}-${i}`}
                  className="pr-6  last:border-r-0"
                >
                  <h2 className="uppercase text-lg font-semibold mb-4 text-amber-800">
                    {category.title}
                  </h2>
                  {hasSubChildren ? (
                    <ul className="space-y-2">
                      {category.children!.map((child, j) => (
                        <li key={`${child.title}-${j}`} className="w-max">
                          <Link
                            onClick={handleCloseMenu}
                            to={generateCategoryLink(
                              category.title,
                              child.title
                            )}
                            className="text-lg text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200 block"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Link
                      onClick={handleCloseMenu}
                      to={generateCategoryLink(data.title, category.title)}
                      className="text-lg text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200 block"
                    >
                      {category.title}
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer with additional navigation */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <a
              href="/collections"
              className="text-amber-800 hover:text-amber-900 font-medium transition-colors duration-200"
            >
              View All Collections →
            </a>
            <div className="flex gap-4">
              <a
                href="/contact"
                className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900 transition-colors duration-200"
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Megamenu;
