
import EmployeeCard from "./EmployeeCard";
import "./EmployeeList.css";

import React from 'react'

const EmployeeList = ({employees }) => {
  return (
    <section className="employee-section">
      {employees.length > 0 ? (
        <div className="employee-grid">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
            />
          ))}
        </div>
      ) : (
        <h3 className="empty-message">No employees found!</h3>
      )}
    </section>
  );
}

export default EmployeeList

