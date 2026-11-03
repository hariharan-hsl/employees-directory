import { useEffect, useState } from "react";
import Header from "./components/Header";
import SummarySection from "./components/SummarySection";
import EmployeeSearchBox from "./components/EmployeeSearchBox";
import EmployeeList from "./components/EmployeeList";
import { getEmployees } from "./api";
import "./App.css";

function App() {

  // States
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const [skip, setSkip] = useState(30);
  const [total, setTotal] = useState(0);
  const [loadingmore, setLoadingmore] = useState(false);


  useEffect(() => {

    const fetchEmployees = async () => {

      try {
        setLoading(true);
        setError("");

        const result = await getEmployees(20, 0);

        setEmployees(result.employees);
        setTotal(result.total);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }
    };

    fetchEmployees();

  }, []);

  
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

  // loadmoreEmployees
  const loadMoreEmployees = async () => {

    try {

      setLoadingmore(true);
      setError("");

      const result = await getEmployees(10, skip);

      setEmployees((previousEmployees) => [
        ...previousEmployees,
        ...result.employees,
      ]);

      setSkip((previousSkip) => previousSkip + result.employees.length);

      setTotal(result.total);

    } catch (err) {

      setError(err.message || "Unable to load more employees.");

    } finally {

      setLoadingmore(false);

    }
  };


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
    <>
      <Header />
    <div className="app">


      {/* Load More Error */}
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {/* Summary */}
      <SummarySection employees={employees} totalEmployees={total} />

      {/* Search and Department Filter */}
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
    </>
  );
}

export default App;