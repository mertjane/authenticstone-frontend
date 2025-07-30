import { GoChevronDown } from "react-icons/go";
import useIsMobile from "../hooks/useIsMobile";
import { useEffect, useRef, useState } from "react";

const sortOptions = [
  { label: "Most Popular", value: "popularity-desc" },
  { label: "Newest First", value: "date-desc" },
  { label: "Oldest First", value: "date-asc" },
  { label: "Name A-Z", value: "title-asc" },
  { label: "Name Z-A", value: "title-desc" },
  { label: "Price Low to High", value: "price-asc" },
  { label: "Price High to Low", value: "price-desc" },
];

const Sort = () => {
  const isMobile = useIsMobile();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState(sortOptions[0].value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpenDropdown(false);
    // TODO: Trigger sort state update here (e.g. via context or Redux)
  };

  return (
    <div
      ref={dropdownRef}
      className="relative group"
      onClick={() => setOpenDropdown((prev) => !prev)}
    >
      {/* Trigger */}
      <div className="flex items-center space-x-2 md:space-x-0 cursor-pointer">
        <p className="uppercase font-[var(--font-regular)] tracking-wider font-[#1d2328] text-xs group-hover:text-amber-800 duration-300">
          {isMobile ? "sort" : "sort by"}
        </p>
        <GoChevronDown
          size={15}
          className={`text-gray-500 transition-transform duration-300 ${
            openDropdown ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {openDropdown && (
        <div className="absolute right-0 mt-2 w-55 bg-white rounded-md shadow-md z-50">
          <div className="px-4 py-2 font-[var(--font-light)] text-[15px]">
            <ul className="sort-by-options p-0.5 flex flex-col gap-1">
              {sortOptions.map((item) => (
                <li
                  key={item.value}
                  onClick={() => handleSelect(item.value)}
                  className={`pl-6 cursor-pointer duration-200 hover:text-[#1d2328] ${
                    selected === item.value
                      ? "text-[#1d2328]"
                      : "text-gray-500"
                  }`}
                  style={{
                    backgroundImage: `url('${
                      selected === item.value
                        ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMTMuNUMzLjQxMDA1IDEzLjUgMC41IDEwLjU4OTkgMC41IDdDMC41IDMuNDEwMDUgMy40MTAwNSAwLjUgNyAwLjVDMTAuNTg5OSAwLjUgMTMuNSAzLjQxMDA1IDEzLjUgN0MxMy41IDEwLjU4OTkgMTAuNTg5OSAxMy41IDcgMTMuNVpNNi4zNTE5NSA5LjZMMTAuOTQ3NCA1LjAwMzg1TDEwLjAyODMgNC4wODQ3NUw2LjM1MTk1IDcuNzYxOEw0LjUxMzEgNS45MjI5NUwzLjU5NCA2Ljg0MjA1TDYuMzUxOTUgOS42WiIgZmlsbD0iI0REN0Y0MSIvPgo8L3N2Zz4K"
                        : "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjQuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNCAxNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQgMTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZGlzcGxheTpub25lO2ZpbGw6I0REN0Y0MTt9Cgkuc3Qxe2ZpbGw6I0U1RTVFNTt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03LDEzLjVjLTMuNiwwLTYuNS0yLjktNi41LTYuNWMwLTMuNiwyLjktNi41LDYuNS02LjVjMy42LDAsNi41LDIuOSw2LjUsNi41QzEzLjUsMTAuNiwxMC42LDEzLjUsNywxMy41egoJIE02LjQsOS42TDEwLjksNUwxMCw0LjFMNi40LDcuOEw0LjUsNS45TDMuNiw2LjhMNi40LDkuNnoiLz4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNywyYzIuOCwwLDUsMi4yLDUsNXMtMi4yLDUtNSw1UzIsOS44LDIsN1M0LjIsMiw3LDIgTTcsMC41QzMuNCwwLjUsMC41LDMuNCwwLjUsN3MyLjksNi41LDYuNSw2LjUKCQlzNi41LTIuOSw2LjUtNi41UzEwLjYsMC41LDcsMC41TDcsMC41eiIvPgo8L2c+Cjwvc3ZnPgo="
                    }')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    backgroundSize: "18px 18px",
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
