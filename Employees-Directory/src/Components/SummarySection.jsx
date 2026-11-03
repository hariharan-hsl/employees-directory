import React from 'react';
import "./SummarySection.css";

const SummarySection = ({ employees, totalEmployees = employees.length }) => {
  const departmentCounts = employees.reduce((counts, employee) => {
    const department = employee.company?.department;

    if (department) {
      counts[department] = (counts[department] || 0) + 1;
    }

    return counts;
  }, {});

  const departmentStyles = (department) => {
    const name = department.toLowerCase();

    if (/\bit\b/.test(name) || name.includes("engineer") || name.includes("tech")) {
      return { color: "#3974c6", icon: "fa-solid fa-code" };
    }

    if (name.includes("hr") || name.includes("human")) {
      return { color: "#c74725", icon: "fa-solid fa-users" };
    }

    if (name.includes("sales")) {
      return { color: "#217a43", icon: "fa-solid fa-chart-line" };
    }

    return { color: "#6b5aa6", icon: "fa-solid fa-building" };
  };

  const summaryData = [
    {
      id: "total",
      title: "Total Employees",
      count: totalEmployees,
      color: "#217a43",
      icon: "fa-solid fa-user",
    },
    ...Object.entries(departmentCounts)
      .sort(([departmentA, countA], [departmentB, countB]) =>
        countB - countA || departmentA.localeCompare(departmentB)
      )
      .slice(0, 3)
      .map(([department, count]) => ({
        id: department,
        title: `${department} Department`,
        count,
        ...departmentStyles(department),
      })),
  ];

  return (
    <section className="summary-section">
      {summaryData.map((item) => (
        <div key={item.id} className="summary-card" style={{ "--summary-accent": item.color }}>
          <h3>{item.title}</h3>
          <div className="summary-value">
            <i className={`summary-icon ${item.icon}`} aria-hidden="true"></i>
            <span className="summary-number">{item.count}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SummarySection;