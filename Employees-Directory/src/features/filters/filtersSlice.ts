import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FiltersState } from "../../types";

const initialState: FiltersState = {
  search: "",
  department: "All",
};

const filtersSlice  = createSlice({
    name:"filters",

      initialState,

    reducers:{
         setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setDepartment: (state, action: PayloadAction<string>) => {
      state.department = action.payload;
    },

     clearFilters: (state) => {
      state.search = "";
      state.department = "All";
    },
    }
});

export const {
  setSearch,
  setDepartment,
  clearFilters,
}  =  filtersSlice.actions; 

export default filtersSlice.reducer;
