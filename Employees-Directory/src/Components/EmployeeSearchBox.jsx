import "./EmployeeSearchBox.css";

const EmployeeSearchBox = ({
  search,
  setSearch,
  department,
  setDepartment,
  departments = [],
}) => {
  return (
    <section className="employee-search">
      <div className="search-input-box">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>

        <input
          type="text"
          className="search-input"
          placeholder="Search employees"
          aria-label="Search employees"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        )}
      </div>

      <div className="department-select-wrap">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="department-select"
        >
          <option value="All">All Departments</option>

          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default EmployeeSearchBox;