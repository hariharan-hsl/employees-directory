import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import SummarySection from "../Components/SummarySection";
import EmployeeSearchBox from "../Components/EmployeeSearchBox";
import EmployeeList from "../Components/EmployeeList";
import { useEmployee } from "../Context/EmployeeContext";

const Home = () => {

    const {
      employees,
      loading,
      error,
      total,
      loadMoreEmployees,
      loadingmore
    } = useEmployee();


  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const debouncedSearch = useDebounce(search,400);
  const isSearching = search !==debouncedSearch;


  const departments = [
    ...new Set(
      employees
        .map((employee) => employee.company?.department)
        .filter(Boolean)
    ),
  ];


  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();

    const searchText = debouncedSearch.trim().toLowerCase();

    const matchesSearch =
      fullName.includes(searchText) ||
      employee.email?.toLowerCase().includes(searchText) ||
      employee.company?.title?.toLowerCase().includes(searchText);

    const matchesDepartment =
      department === "All" ||
      employee.company?.department === department;

    return matchesSearch && matchesDepartment;
  });

  if (loading) {
    return <p className="mx-auto w-[calc(100%-32px)] max-w-[640px] wrap-anywhere px-4 py-8 text-center text-base leading-[1.6] text-slate-700">Loading employees...</p>;
  }

  if (error && employees.length === 0) {
    return (
      <div className="mx-auto w-[calc(100%-32px)] max-w-[640px] wrap-anywhere px-4 py-8 text-center text-base leading-[1.6] text-slate-700">
        <p>Error: {error}</p>
        <button className="mt-4 cursor-pointer rounded-lg border-0 bg-[#117451] px-5 py-2.5 font-semibold text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(37,99,235,0.35)]" onClick={() => window.location.reload()}>
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

      <SummarySection
        employees={employees}
        totalEmployees={total}
      />

      <EmployeeSearchBox
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        departments={departments}
      />

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
            onClick={loadMoreEmployees}
            disabled={loadingmore}
          >
            {loadingmore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;