
import React from 'react'
import EmployeeCard from "./EmployeeCard";
import "./EmployeeList.css";


const EmployeeList = ({employees }) => {
  return (
    <section className="employee-section">
        {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
        />
      ))}
    </section>
  );
}

export default EmployeeList

