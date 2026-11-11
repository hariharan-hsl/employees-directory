import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import SummarySection from "../Components/SummarySection";
import EmployeeSearchBox from "../Components/EmployeeSearchBox";
import EmployeeList from "../Components/EmployeeList";
import {fetchEmployees,fetchMoreEmployees,} from "../features/employees/employeesSlice";
import {clearFilters,setDepartment,setSearch,} from "../features/filters/filtersSlice";
import {
  selectAllEmployees,
  selectDepartment,
  selectDepartmentCounts,
  selectEmployeeError,
  selectEmployeeStatus,
  selectFilteredEmployees,
  selectLoadMoreError,
  selectLoadingMore,
  selectSearch,
  selectTotalEmployees,
} from "../features/employees/employeeSelectors";

const Home = () => {
  const dispatch = useDispatch();
  const employees = useSelector(selectAllEmployees);
  const search = useSelector(selectSearch);
  const department = useSelector(selectDepartment);
  const status = useSelector(selectEmployeeStatus);
  const error = useSelector(selectEmployeeError);
  const loadMoreError = useSelector(selectLoadMoreError);
  const loadingMore = useSelector(selectLoadingMore);
  const total = useSelector(selectTotalEmployees);
  const departmentCounts = useSelector(selectDepartmentCounts);
  const debouncedSearch = useDebounce(search, 400);
  const isSearching = search !== debouncedSearch;
  const filteredEmployees = useSelector((state) =>
    selectFilteredEmployees(state, debouncedSearch)
  );
  const departments = Object.keys(departmentCounts);

  if (status === "loading" && employees.length === 0) {
    return <p className="mx-auto w-[calc(100%-32px)] max-w-[640px] wrap-anywhere px-4 py-8 text-center text-base leading-[1.6] text-slate-700">Loading employees...</p>;
  }

  if (error && employees.length === 0) {
    return (
      <div className="mx-auto w-[calc(100%-32px)] max-w-[640px] wrap-anywhere px-4 py-8 text-center text-base leading-[1.6] text-slate-700">
        <p>Error: {error}</p>
        <button className="mt-4 cursor-pointer rounded-lg border-0 bg-[#117451] px-5 py-2.5 font-semibold text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(37,99,235,0.35)]" onClick={() => dispatch(fetchEmployees())}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[calc(100%-48px)] max-w-[1400px] pt-2 pb-12 max-[700px]:w-[min(100%-32px,560px)] max-[700px]:pt-1 max-[700px]:pb-9 max-[380px]:w-[calc(100%-24px)]">
      {error && (
        <p className="my-3 wrap-anywhere rounded-lg bg-red-100 px-4 py-3 leading-6 text-red-700" role="alert">
          {error}
        </p>
      )}
      {loadMoreError && (
        <p className="my-3 wrap-anywhere rounded-lg bg-red-100 px-4 py-3 leading-6 text-red-700" role="alert">
          {loadMoreError}
        </p>
      )}

      <SummarySection
        totalEmployees={total}
      />

      <EmployeeSearchBox
        search={search}
        setSearch={(value) => dispatch(setSearch(value))}
        department={department}
        setDepartment={(value) => dispatch(setDepartment(value))}
        departments={departments}
      />
      {(search || department !== "All") && (
        <button
          type="button"
          className="mb-4 cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={() => dispatch(clearFilters())}
        >
          Clear filters
        </button>
      )}

      {isSearching && (
        <p className="mx-auto w-[calc(100%-32px)] max-w-[640px] wrap-anywhere px-4 py-8 text-center text-base leading-[1.6] text-slate-700">Searching...</p>
      )}

      {filteredEmployees.length === 0 ? (
        <p className="mx-auto w-[calc(100%-32px)] max-w-[640px] wrap-anywhere px-4 py-8 text-center text-base leading-[1.6] text-slate-700">
          No employees found. Try a different search or department.
        </p>
      ) : (
        <EmployeeList employees={filteredEmployees} />
      )}

      {employees.length < total && (
        <div className="flex justify-center pt-7 max-[380px]:pt-5">
          <button
            className="min-h-11 cursor-pointer rounded-full border-0 bg-blue-600 px-6 py-2.5 text-[15px] font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-blue-700 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(37,99,235,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => dispatch(fetchMoreEmployees())}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;