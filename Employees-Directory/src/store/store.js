import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees/employeesSlice";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    filters: filtersReducer,
  },
});