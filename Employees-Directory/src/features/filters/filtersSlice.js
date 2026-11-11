import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  department: "All",
};

const filtersSlice  = createSlice({
    name:"filters",

      initialState,

    reducers:{
         setSearch: (state, action) => {
      state.search = action.payload;
    },

    setDepartment: (state, action) => {
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