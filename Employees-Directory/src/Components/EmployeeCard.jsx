const EmployeeCard = ({ employee }) => {
  const firstName = employee.firstName || "";
  const lastName = employee.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim();
  const initials = `${firstName[0] || ""}${lastName[0]}`;

  const department = employee.company?.department;
  const designation = employee.company?.title;

  const colorMap = {
    IT: "#bbd5ff",
    HR: "#ef476f",
    Sales: "#1bbf8d",
    Engineering: "#69790e",
    Human: "#ef476f",
    Marketing: "#1bbf8d",
  };

  const avatarColor =
    colorMap[department] || colorMap[department.split(" ")[0]] ||
    "#ae5fe4";

  return (
    <div className="employee-card">
      <div className="employee-avatar" style={{ backgroundColor: avatarColor }}>
        <h2>{initials}</h2>
      </div>

      <div className="employee-details">
        <h3>{fullName}</h3>

        <p className="employee-designation">{designation}</p>

        <span className={`department-badge ${department.toLowerCase()}`}>
          {department}
        </span>

        <div className="divider"></div>

        <p className="employee-email">
          <i className="fa-solid fa-envelope"></i>
          {employee.email || "Email not available"}
        </p>

        <p className="employee-phone">
          <i className="fa-solid fa-phone"></i>
          {employee.phone || "Phone not available"}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;