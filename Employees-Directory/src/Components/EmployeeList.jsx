import "./EmployeeList.css";

const EmployeeList = ({ props }) => {
  return (
    <section className="employee-section">
      

      <div className="employee-grid">
        {props.map((item) => (
          <div className="employee-card" key={item.id}>
            <div className="employee-avatar">
              <h1 style={{ backgroundColor: item.color }}>{item.initials}</h1>
            </div>

            <div className="employee-details">
              <h3>{item.name}</h3>
              <p className="employee-designation">
                {item.designation}
              </p>

              <span
                className={`department-badge ${item.department.toLowerCase()}`}
              >
                {item.department}
              </span>
              <div className="divider"></div>
              <p className="employee-email">
                <i className="fa-solid fa-envelope"></i> {item.email}
              </p>

              <p className="employee-phone">
                <i className="fa-solid fa-phone"></i>{item.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmployeeList;