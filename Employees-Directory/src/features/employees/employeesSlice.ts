
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEmployee, getEmployees } from "../../api";
import type { EmployeeCreateData, EmployeeResponse, EmployeeState } from "../../types";
import type { RootState } from "../../store/store";

export const fetchEmployees = createAsyncThunk<EmployeeResponse>(
  "employees/fetchEmployees",
  async () => {
    return await getEmployees(20, 0);
  }
);

// Load more employees
export const fetchMoreEmployees = createAsyncThunk<EmployeeResponse>(
  "employees/fetchMoreEmployees",
  async (_, { getState }) => {
    const skip = (getState() as RootState).employees.skip;
    return await getEmployees(10, skip);
  }
);

// Add-employee
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData: EmployeeCreateData) => {
    return await createEmployee(employeeData);
  }
);

const initialState: EmployeeState = {
  employees: [],
  total: 0,
  skip: 0,
  status: "idle",
  error: null,
  loadMoreError: null,
  loadingMore: false,
  addStatus: "idle",
  addError: null,
};

const employeesSlice = createSlice({
  name: "employees",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload.employees;
        state.total = action.payload.total;
        state.skip = state.employees.length;
      })

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Load more employees
      .addCase(fetchMoreEmployees.pending, (state) => {
        state.loadingMore = true;
      })

      .addCase(fetchMoreEmployees.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.employees.push(...action.payload.employees);
        state.skip += action.payload.employees.length;
      })

      .addCase(fetchMoreEmployees.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.error.message;
      })

      // Add employee
      .addCase(addEmployee.pending, (state) => {
        state.addStatus = "loading";
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.employees.unshift(action.payload);
        state.total += 1;
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.error.message;
      });
  },
});

export default employeesSlice.reducer;
