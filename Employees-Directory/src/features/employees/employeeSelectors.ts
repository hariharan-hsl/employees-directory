import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { Employee } from "../../types";

export const selectAllEmployees = (state: RootState): Employee[] =>
  state.employees.employees;

export const selectSearch = (state: RootState): string => state.filters.search;

export const selectDepartment = (state: RootState): string =>
  state.filters.department;

export const selectFilteredEmployees = createSelector(
  [
    selectAllEmployees,
    (state: RootState, searchAll = selectSearch(state)) => searchAll,
    selectDepartment,
  ],
  (employees: Employee[], search: string, department: string): Employee[] => {
    const searchText = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();
      const matchesSearch = [
        fullName,
        employee.email,
        employee.company?.title,
      ].some((value) => value?.toLowerCase().includes(searchText));

      const employeeDepartment = employee.company?.department || "Other";

      const matchesDepartment =
        department === "All" || employeeDepartment === department;

      return matchesSearch && matchesDepartment;
    });
  },
);

export const selectDepartmentCounts = createSelector(
  [selectAllEmployees],
  (employees) => {
    return employees.reduce<Record<string, number>>((counts, employee) => {
      const department = employee.company?.department;

      if (department) {
        counts[department] = (counts[department] || 0) + 1;
      }

      return counts;
    }, {});
  },
);

export const selectEmployeeStatus = (state: RootState) =>
  state.employees.status;

export const selectEmployeeError = (state: RootState) => state.employees.error;

export const selectTotalEmployees = (state: RootState) => state.employees.total;

export const selectLoadingMore = (state: RootState) =>
  state.employees.loadingMore;

export const selectLoadMoreError = (state: RootState) =>
  state.employees.loadMoreError;
