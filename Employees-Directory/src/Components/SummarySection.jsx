import React from 'react'
import "./SummarySection.css"

const SummarySection = ({employees}) => {

    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        (employee)=>employee.status === "Active"
    ).length

    const inactiveEmployees = employees.filter(
        (employee)=>employee.status === "Inactive"
    ).length;

   const totalDepartments = new Set(
    employees.map((employee)=>employee.department)
   ).size;

    const summaryData = [
        {id:1,title:"Total Employees",logo:"fa-solid fa-user",count:totalEmployees ,colour:"5px solid #0d6b24"},
        {id:2,title:"Active",logo:"fa-solid fa-code",count:activeEmployees, colour:"5px solid #2e65cc"},
        {id:3,title:"Inactive",logo:"fa-solid fa-users",count:inactiveEmployees ,colour:"	5px solid #d1380a"},
        {id:4,title:"Departments",logo:"fa-solid fa-chart-line",count:totalDepartments ,colour:"5px solid #0d6b24"},
    ]
    return (
    <div>
        <section className='summary-section'>
            {
                summaryData.map((item)=>(
                    <div className='summary-card' key={item.id} style={{ borderLeft:item.colour }}>
                        <h3>{item.title}</h3>
                        <p><i className={item.logo}></i> {item.count}</p>
                    </div>
                ))
            }
        </section>
    </div>
  )
}

export default SummarySection
