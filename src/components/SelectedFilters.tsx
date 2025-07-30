import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setAllSelectedFilters } from "../redux/slices/FilterSlice";

const SelectedFilters = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.filters.selectedFilters);

  const handleRemove = (filterToRemove: string) => {
    const newFilters = selectedFilters.filter(
      (filter) => filter !== filterToRemove
    );
    dispatch(setAllSelectedFilters(newFilters));
  };

/*   const handleClearAll = () => {
    dispatch(setAllSelectedFilters([]));
  }; */

  // Convert filter keys to display labels
  const getDisplayLabel = (filterKey: string) => {
    // Convert slug to readable format
    return filterKey
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (selectedFilters.length === 0) return null;

  return (
    <div className="h-[30px] flex items-center px-2 py-4">
      <div className="flex items-center">
        <div className="selected flex">
          <ul className="flex gap-2">
            {selectedFilters.map((filter) => (
              <li
                key={filter}
                onClick={() => handleRemove(filter)}
                className="flex items-center border border-[#e5e5e5] rounded-full py-1.5 px-2 font-[var(--font-light)] hover:bg-gray-100 cursor-pointer duration-300 text-gray-600"
              >
                <IoIosClose size={20} className="mr-1" />
                {getDisplayLabel(filter)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectedFilters;
