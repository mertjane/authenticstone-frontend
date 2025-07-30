import { useDispatch, useSelector } from "react-redux";
import type { AttrItemType } from "../lib/api/attributeItems.api";
import type { RootState } from "../redux/store";
import { setAllSelectedFilters } from "../redux/slices/FilterSlice";

interface FilterDropdownProps {
  attribute: {
    id: number;
    name: string;
    slug: string;
  };
  terms: AttrItemType[];
}

const FilterDropdown = ({ attribute, terms }: FilterDropdownProps) => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.filters.selectedFilters);

  // Get selected terms for this attribute
  const getSelectedTermsForAttribute = () => {
    return terms.filter(term => 
      selectedFilters.includes(term.slug)
    );
  };

  const selectedTerms = getSelectedTermsForAttribute();
  const selectedCount = selectedTerms.length;

  const handleTermToggle = (term: AttrItemType) => {
    const filterKey = term.slug;
    const isSelected = selectedFilters.includes(filterKey);
    
    let newFilters;
    if (isSelected) {
      // Remove filter
      newFilters = selectedFilters.filter(filter => filter !== filterKey);
    } else {
      // Add filter
      newFilters = [...selectedFilters, filterKey];
    }
    
    dispatch(setAllSelectedFilters(newFilters));
  };

  const handleClearAttribute = () => {
    // Remove all filters for this attribute
    const filtersToRemove = terms.map(term => term.slug);
    const newFilters = selectedFilters.filter(filter => 
      !filtersToRemove.includes(filter)
    );
    dispatch(setAllSelectedFilters(newFilters));
  };

  const isTermSelected = (term: AttrItemType) => {
    return selectedFilters.includes(term.slug);
  };


  return (
    <div onClick={(e) => e.stopPropagation()} >
      <div className="action-section flex items-center justify-between h-max w-full">
        <small className="text-md text-gray-500 font-[var(--font-light)]">{selectedCount} selected</small>
        <button onClick={handleClearAttribute} className="font-[var(--font-regular)] uppercase tracking-wide text-xs text-[#1d2328] hover:text-amber-800 duration-300 transition-all">
          clear
        </button>
      </div>
      <span className="text-sm"></span>
      <div className="my-4">
        <ul className="flex flex-col gap-2 h-[200px] overflow-hidden transition-all duration-300">
          {terms.map((term) => (
            <li
              key={term.id}
              className="flex items-center justify-between tracking-normal font-[var(--font-light)] text-[#606465] hover:text-amber-800 duration-300"
            >
              <span className="flex items-center gap-2">
                <input
                  className="peer hidden"
                  type="checkbox"
                  id={`${attribute.slug}_${term.slug}`}
                  name={`${attribute.slug}_${term.slug}`}
                  checked={isTermSelected(term)}
                  onChange={() => handleTermToggle(term)}
                />
                <label
                  htmlFor={`${attribute.slug}_${term.slug}`}
                  className="w-[20px] h-[20px] relative rounded-[2px] border border-gray-400 flex items-center justify-center cursor-pointer peer-checked:border-amber-800 peer-checked:bg-amber-800"
                >
                  <svg
                    className={`absolute w-[14px] h-[14px] text-white transition-opacity duration-150 pointer-events-none ${
                      isTermSelected(term) ? 'opacity-100' : 'opacity-0'
                    }`}
                    viewBox="0 0 22 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </label>
                <span className="text-md">{term.name}</span>
              </span>
              <small>{term.count}</small>
            </li>
          ))}
        </ul>

        {terms.length > 7 && (
          <button className="mt-2 text-xs text-amber-800 underline">
            +{terms.length - 7} more
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
