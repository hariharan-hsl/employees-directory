
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./Pages/Home";
import EmployeeDetails from "./Pages/EmployeeDetails";
import AddEmployee from "./Pages/AddEmployee";
import NotFound from "./Pages/NotFound";

import { getEmployees, createEmployee } from "./api";
import "./App.css";

function App() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [skip, setSkip] = useState(20);
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
        setError(error.message || "Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);


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
    } catch (error) {
      setError(error.message || "Unable to load more employees");
    } finally {
      setLoadingmore(false);
    }
  };

  // Add new employee
  const addEmployee = async (employeeData) => {
    try {
      const newEmployee = await createEmployee(employeeData);

      setEmployees((previousEmployees) => [
        newEmployee,
        ...previousEmployees,
      ]);

      setTotal((previousTotal) => previousTotal + 1);

      return newEmployee;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              employees={employees}
              loading={loading}
              error={error}
              setError={setError}
              total={total}
              loadMoreEmployees={loadMoreEmployees}
              loadingmore={loadingmore}
            />
          }
        />

        <Route
          path="/employee/:id"
          element={<EmployeeDetails />}
        />

        <Route
          path="/add"
          element={<AddEmployee addEmployee={addEmployee} />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;
