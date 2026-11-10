
import React from 'react'
import EmployeeCard from "./EmployeeCard";


const EmployeeList = ({employees }) => {
  return (
    <section className="grid w-full grid-cols-3 gap-4 max-[1050px]:grid-cols-2 max-[620px]:grid-cols-1 max-[620px]:gap-3">
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
