import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export type FilterState = {
  selectedFilters: string[];
  isFilterSidebarOpen: boolean;
};

const initialState: FilterState = {
  selectedFilters: [],
  isFilterSidebarOpen: false,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<string[]>) {
      state.selectedFilters = action.payload;
    },
    resetFilters(state) {
      state.selectedFilters = [];
    },
    setFilterSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isFilterSidebarOpen = action.payload;
    },
    toggleFilterSidebar(state) {
      state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
    },
  },
});

export const {
  setFilters: setAllSelectedFilters,
  resetFilters,
  setFilterSidebarOpen,
  toggleFilterSidebar,
} = filterSlice.actions;

export default filterSlice.reducer;
