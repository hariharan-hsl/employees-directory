import { useState } from "react";

import SummarySection from "../components/SummarySection";
import EmployeeSearchBox from "../components/EmployeeSearchBox";
import EmployeeList from "../components/EmployeeList";

import "./Home.css";

const Home = ({
  employees,
  loading,
  error,
  setError,
  total,
  loadMoreEmployees,
  loadingmore,
}) => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const departments = [
    ...new Set(
      employees
        .map((employee) => employee.company?.department)
        .filter(Boolean)
    ),
  ];


  const filteredEmployees = employees.filter((employee) => {
    const fullName =
      `${employee.firstName} ${employee.lastName}`.toLowerCase();

    const searchText = search.trim().toLowerCase();

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
    return <p className="status-message">Loading employees...</p>;
  }

  if (error && employees.length === 0) {
    return (
      <div className="status-message">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      {error && (
        <p className="error-message" role="alert">
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

      {filteredEmployees.length === 0 ? (
        <p className="status-message">
          No employees found. Try a different search or department.
        </p>
      ) : (
        <EmployeeList employees={filteredEmployees} />
      )}

      {employees.length < total && (
        <div className="load-more-container">
          <button
            className="load-more-button"
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