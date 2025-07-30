import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setFilterSidebarOpen } from "../redux/slices/FilterSlice";
import { useAttributes } from "../queries/attributes.query";
import { useAllAttributeTerms } from "../queries/attributesItems.query";
import { GoChevronDown } from "react-icons/go";
import type { AttrItemType } from "../lib/api/attributeItems.api";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";

const desiredOrder = [
  "pa_material",
  "pa_room-type-usage",
  "pa_finish",
  "pa_colour",
];

const MobileFilter = () => {
  const [openAttr, setOpenAttr] = useState<number | null>(null);
  const { data: attributes, isLoading: attrLoading, error } = useAttributes();
  const {
    data: attributeTerms,
    isLoading: termsLoading,
    error: termsError,
  } = useAllAttributeTerms();
  const dispatch = useDispatch();
  const isFilterSidebarOpen = useSelector(
    (state: RootState) => state.filters.isFilterSidebarOpen
  );
  const handleClose = () => dispatch(setFilterSidebarOpen(false));

  if (attrLoading || termsLoading || !attributes || !attributeTerms)
    return null;
  if (error || termsError) return null;

  // Sort attributes by desired order
  const sortedAttributes = [...attributes].sort(
    (a, b) => desiredOrder.indexOf(a.slug) - desiredOrder.indexOf(b.slug)
  );

  const getTerms = (attrId: number): AttrItemType[] => {
    switch (attrId) {
      case 6:
        return attributeTerms.material;
      case 7:
        return attributeTerms.usage;
      case 2:
        return attributeTerms.finish;
      case 8:
        return attributeTerms.colour;
      default:
        return [];
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isFilterSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sliding Cart */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[650px] h-screen py-10 pl-6 pr-5 bg-white z-[1001] transform transition-transform duration-300 flex flex-col ${
          isFilterSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <header className="pb-5 border-b border-[#e5e5e5] flex items-center justify-between">
            <h2 className="text-[25px] font-normal text-[#1d2328]">Filters</h2>
            <svg
              onClick={handleClose}
              className="cursor-pointer"
              width="15"
              height="12"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="hover:stroke-amber-800 duration-300"
                d="M1 8.5l8-8m-8 0l8 8"
                stroke="#1d2328"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </header>

          {/* Body */}
          {/* Accordion Body */}
          <div className="flex flex-col mt-6 flex-1">
            {sortedAttributes.map((attr) => {
              const terms = getTerms(attr.id);
              const isOpen = openAttr === attr.id;

              return (
                <div key={attr.id} className="border-b border-[#e5e5e5]">
                  <button
                    onClick={() => setOpenAttr(isOpen ? null : attr.id)}
                    className="w-full flex items-center justify-between py-4 cursor-pointer group"
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
                  </button>
                  {isOpen && (
                    <div className="pb-4">
                      <FilterDropdown attribute={attr} terms={terms} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4">
            <button className="uppercase font-[var(--font-light)] text-sm tracking-wider py-[.6em] px-[1.5em] border border-[#e5e5e5] hover:bg-[#1d2328] hover:text-white duration-300">
              clear filters
            </button>
            <button
              onClick={handleClose}
              className="uppercase font-[var(--font-light)] text-sm tracking-wider py-[.6em] px-[1.5em] bg-[#1d2328] text-white"
            >
              apply filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilter;
