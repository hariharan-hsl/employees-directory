import { useSelector } from "react-redux";
import { selectDepartmentCounts } from "../features/employees/employeeSelectors";

const SummarySection = ({ totalEmployees }) => {
  //Department count Redux-Store:
  const departmentCounts = useSelector(selectDepartmentCounts);

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
    <section className="my-5 mb-[22px] grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[900px]:gap-[14px] max-[520px]:my-4 max-[520px]:mb-5 max-[520px]:gap-2.5">
      {summaryData.map((item) => (
        <div key={item.id} className="flex min-h-[108px] min-w-0 flex-col justify-center rounded-xl border border-[#e8e9eb] border-l-4 bg-white px-[18px] py-4 shadow-[0_2px_6px_rgba(15,23,42,0.045)] max-[520px]:min-h-[94px] max-[520px]:px-[15px] max-[520px]:py-[14px]" style={{ borderLeftColor: item.color }}>
          <h3 className="mb-3 break-words text-[15px] leading-[1.35] font-semibold text-[#55575b] max-[520px]:mb-[9px] max-[520px]:text-sm">{item.title}</h3>
          <div className="flex items-center gap-2.5 font-bold text-[#242629]">
            <i className={`${item.icon} w-[22px] text-xl`} style={{ color: item.color }} aria-hidden="true"></i>
            <span className="text-[26px] leading-none text-[#25272a] max-[520px]:text-[23px]">{item.count}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SummarySection;