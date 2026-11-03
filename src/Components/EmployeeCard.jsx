const EmployeeCard = ({ employee }) => {

  return (
    <div className="employee-card">
      <div
        className="employee-avatar"
        style={{ backgroundColor: employee.color}}
      >
        <h2>{employee.initials}</h2>
      </div>

      <div className="employee-details">
        <h3>{employee.name}</h3>

        <p className="employee-designation">
          {employee.designation}
        </p>

        <span
          className={`department-badge ${employee.department.toLowerCase()}`}
        >
          {employee.department}
        </span>

        <div className="divider"></div>

        <p className="employee-email">
          <i className="fa-solid fa-envelope"></i>
          {employee.email}
        </p>

        <p className="employee-phone">
          <i className="fa-solid fa-phone"></i>
          {employee.phone}
        </p>
      </div>
    </div>
  );
  
};

export default EmployeeCard;