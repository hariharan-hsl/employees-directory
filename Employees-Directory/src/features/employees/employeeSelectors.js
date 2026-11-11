
import { createSelector } from "@reduxjs/toolkit";


export const selectAllEmployees = (state) =>
  state.employees.employees;


export const selectSearch = (state) =>
  state.filters.search;


export const selectDepartment = (state) =>
  state.filters.department;


export const selectFilteredEmployees = createSelector(
  [
    selectAllEmployees,
    (state, searchAll = selectSearch(state)) => searchAll,
    selectDepartment,
  ],
  (employees, search, department) => {
    const searchText = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();
      const matchesSearch = [
        fullName,
        employee.email,
        employee.company?.title,
      ].some((value) => value?.toLowerCase().includes(searchText));

      const employeeDepartment =
        employee.company?.department || "Other";

      const matchesDepartment =
        department === "All" ||
        employeeDepartment === department;

      return matchesSearch && matchesDepartment;
    });
  }
);


export const selectDepartmentCounts = createSelector(
  [selectAllEmployees],
  (employees) => {
    return employees.reduce((counts, employee) => {
      const department = employee.company?.department;

      if (department) {
        counts[department] = (counts[department] || 0) + 1;
      }

      return counts;
    }, {});
  }
);

export const selectEmployeeStatus = (state) =>
  state.employees.status;

export const selectEmployeeError = (state) =>
  state.employees.error;

export const selectTotalEmployees = (state) =>
  state.employees.total;

export const selectLoadingMore = (state) =>
  state.employees.loadingMore;

export const selectLoadMoreError = (state) =>
  state.employees.loadMoreError;
