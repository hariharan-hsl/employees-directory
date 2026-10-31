
import "./EmployeeSearchBox.css";

const EmployeeSearchBox = () => {
  return (
    <div className="employee-search">
      <div className="search-input-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          className="search-input"
          placeholder="Search employees"
        />
      </div>

      <select
        className="department-select"

      >
        <option value="All Departments">All Departments</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Sales">Sales</option>
      </select>
    </div>
  );
};

export default EmployeeSearchBox;