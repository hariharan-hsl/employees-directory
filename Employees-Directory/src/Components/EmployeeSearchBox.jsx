const EmployeeSearchBox = ({
  search,
  setSearch,
  department,
  setDepartment,
  departments = [],
}) => {
  return (
    <section className="mb-[22px] flex w-full items-center gap-3 max-[600px]:mb-[18px] max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-2.5">
      <div className="flex h-12 min-w-0 flex-1 items-center rounded-[14px] border border-[#dfe5ec] bg-[#f8fafc] px-[18px] max-[600px]:h-[46px] max-[600px]:w-full max-[600px]:flex-none max-[600px]:px-[13px] max-[360px]:px-2.5">
        <i className="fa-solid fa-magnifying-glass mr-2.5 text-[17px] text-[#7e8796] max-[360px]:mr-[7px]"></i>

        <input
          type="text"
          className="w-full min-w-0 border-0 bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-[#a0a9b4] max-[600px]:text-sm"
          placeholder="Search employees"
          aria-label="Search employees"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            type="button"
            className="shrink-0 cursor-pointer rounded-md border-0 bg-[#eef1f5] px-2.5 py-1.5 text-xs text-[#5b6470] hover:bg-[#e2e7ed] max-[360px]:px-2"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        )}
      </div>

      <div className="relative max-[600px]:w-full">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="h-12 w-[210px] min-w-[210px] cursor-pointer appearance-none rounded-[14px] border border-[#dfe5ec] bg-[#f8fafc] bg-[linear-gradient(45deg,transparent_50%,#6b7280_50%),linear-gradient(135deg,#6b7280_50%,transparent_50%)] bg-[length:6px_6px,6px_6px] bg-[position:calc(100%-18px)_calc(50%-2px),calc(100%-12px)_calc(50%-2px)] bg-no-repeat py-0 pr-10 pl-4 text-sm text-gray-800 focus:border-[#a7b1bd] focus:outline-none max-[600px]:h-[46px] max-[600px]:w-full max-[600px]:min-w-0"
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