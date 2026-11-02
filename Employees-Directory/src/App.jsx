import { useState } from 'react'
import Header from './Components/Header'
import SummarySection from './Components/SummarySection'
import EmployeeSearchBox from './Components/EmployeeSearchBox'
import EmployeeList from './Components/EmployeeList'
import employeesData  from "../src/data"
import './App.css'

function App() {

  const [employees] = useState(employeesData);

  const [search,setSearch] = useState("");
  const [department,setDepartment] = useState("All");

  const departments = [...new Set(employees.map((employee) => employee.department))];


  // fillterEmployess-function
  const filterEmployees = employees.filter((employee)=>{
    
    const searchText = search.trim().toLowerCase();

    const matchEmpSearch = employee.name.toLowerCase().includes(searchText) ||
    employee.designation.toLowerCase().includes(searchText) ||
    employee.email.toLowerCase().includes(searchText);


    const matchesDepartment = department === "All" || employee.department === department; 

    return matchEmpSearch && matchesDepartment;

  });


  // clearFilter:
  const clearFilters = () => {
    setSearch("");
    setDepartment("All")
  };




  return (
    <>
      <Header />

      <div className="app-shell">
        <SummarySection  employees={employees}/>
        <EmployeeSearchBox 
        search  ={search}
        setSearch= {setSearch}
        department = {department}
        setDepartment = {setDepartment}
        departments = {departments}
        clearFilters= {clearFilters} />


      
          <p className="result">Showing {filterEmployees.length} of {employees.length} employees</p><br />
       

        <EmployeeList employees={filterEmployees} />
      </div>
    </>
  )
}

export default App
