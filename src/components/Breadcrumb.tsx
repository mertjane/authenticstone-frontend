import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router";
import { useBreadcrumbs } from "../utils/breadcrumbBuilder";

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();
  return (
    <div className="bg-white border-b border-t border-[#e5e5e5]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center relative overflow-hidden">
        <nav className="flex overflow-x-scroll" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index !== 0 && (
                  <BsChevronRight size={18} className="text-gray-500 mx-2" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-black font-thin">{crumb.name}</span>
                ) : (
                  <Link
                    to={crumb.link}
                    className="text-gray-500 hover:text-gray-700 transition-colors font-[var(--font-light)] tracking-wide text-md"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
