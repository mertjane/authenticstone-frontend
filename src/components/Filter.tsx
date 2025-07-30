import { GoChevronDown } from "react-icons/go";
import FilterDropdown from "./FilterDropdown";
import { useAttributes } from "../queries/attributes.query";
import { useAllAttributeTerms } from "../queries/attributesItems.query";
import type { AttrItemType } from "../lib/api/attributeItems.api";
import { useEffect, useRef, useState } from "react";

const desiredOrder = [
  "pa_material",
  "pa_room-type-usage",
  "pa_finish",
  "pa_colour",
];

const Filter = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: attributes, isLoading: attrLoading, error } = useAttributes();
  const {
    data: attributeTerms,
    isLoading: termsLoading,
    error: termsError,
  } = useAllAttributeTerms();

  const toggleDropdown = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (attrLoading || termsLoading || !attributes || !attributeTerms)
    return null;
  if (error || termsError) return null;

  // Sort attributes by desired order
  const sortedAttributes = [...attributes].sort(
    (a, b) => desiredOrder.indexOf(a.slug) - desiredOrder.indexOf(b.slug)
  );

  return (
    <div
      ref={containerRef}
      className="absolute left-0 flex items-center gap-2 font-[var(--font-light)]"
    >
      {sortedAttributes?.map((attr) => {
        let terms: AttrItemType[] = [];
        switch (attr.id) {
          case 6:
            terms = attributeTerms.material;
            break;
          case 7:
            terms = attributeTerms.usage;
            break;
          case 2:
            terms = attributeTerms.finish;
            break;
          case 8:
            terms = attributeTerms.colour;
            break;
        }

        const isOpen = openDropdown === attr.id;
        return (
          <div
            key={attr.id}
            onClick={() => toggleDropdown(attr.id)}
            className="flex items-center justify-between p-4 gap-2 cursor-pointer group relative"
          >
            <p className="uppercase tracking-wider font-[var(--font-regular)] text-xs group-hover:text-amber-800 duration-300">
              {attr.name}
            </p>
            <GoChevronDown
              size={15}
              className={`text-gray-500 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            {isOpen && (
              <div className="bg-white rounded-xs h-[300px] overflow-hidden shadow-md text-[#1d2328] m-1.5 p-4 absolute text-left top-10 left-0 w-[250px] z-50 cursor-default  transition-all duration-300">
                <FilterDropdown attribute={attr} terms={terms} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
