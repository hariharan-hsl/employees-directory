
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Pages/Home";
import EmployeeDetails from "./Pages/EmployeeDetails";
import AddEmployee from "./Pages/AddEmployee";
import NotFound from "./Pages/NotFound";

import "./App.css";

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home/>} />

        <Route
          path="/employee/:id"
          element={<EmployeeDetails />}
        />

        <Route
          path="/add"
          element={<AddEmployee/>}
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
