import { Link } from "react-router-dom";

const departmentBadgeClasses = (department) => {
  const name = department.toLowerCase();

  if (["it", "it-department", "engineering"].includes(name)) {
    return "bg-blue-100 text-blue-700";
  }

  if (["hr", "human-resources"].includes(name)) {
    return "bg-purple-100 text-violet-600";
  }

  if (["sales", "marketing"].includes(name)) {
    return "bg-green-100 text-green-700";
  }

  return "bg-gray-200 text-gray-700";
};

const EmployeeCard = ({ employee }) => {
  const firstName = employee.firstName || "";
  const lastName = employee.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim();
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`;

  const department = employee.company?.department || "Other";
  const designation = employee.company?.title || "Not Available";

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
 <Link to={`/employee/${employee.id}`} className="block text-inherit no-underline">
    <div className="flex min-h-[196px] min-w-0 items-start gap-[14px] rounded-2xl border border-[#e4e7eb] bg-white/90 px-4 py-[18px] shadow-[0_1px_0_rgba(15,23,42,0.02)] max-[620px]:min-h-0 max-[620px]:p-4 max-[360px]:gap-2.5 max-[360px]:px-3 max-[360px]:py-[14px]">
      <div
        className="flex h-[60px] w-[60px] flex-[0_0_60px] items-center justify-center rounded-full text-lg font-bold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] max-[620px]:h-[52px] max-[620px]:w-[52px] max-[620px]:flex-[0_0_52px] max-[360px]:h-[46px] max-[360px]:w-[46px] max-[360px]:flex-[0_0_46px]"
        style={{ backgroundColor: avatarColor }}
      >
        <img
          src={employee.image || "/default-user.svg"}
          alt=""
          className="h-full w-full rounded-full object-cover"
          onError={(event) => {
            event.currentTarget.src = "/default-user.svg";
          }}
        />
        {!employee.image && <h2 className="text-lg font-bold text-white max-[620px]:text-base">{initials}</h2>}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="m-0 wrap-anywhere text-lg leading-[1.3] font-bold text-gray-800 max-[620px]:text-[17px]">{fullName}</h3>

        <p className="my-[6px] mb-[10px] wrap-anywhere text-sm leading-[1.45] text-gray-500 max-[620px]:mb-[9px] max-[620px]:text-[13px]">{designation}</p>

        <span className={`inline-flex min-w-[52px] max-w-full items-center justify-center wrap-anywhere rounded-full px-3 py-[5px] text-xs font-semibold max-[360px]:px-2.5 max-[360px]:py-1 max-[360px]:text-[11px] ${departmentBadgeClasses(department)}`}>
          {department}
        </span>

        <div className="mt-3 mb-[10px] h-px w-full bg-gray-200"></div>

        <p className="mb-[9px] flex items-start gap-2 wrap-anywhere text-[13px] leading-[1.45] text-gray-700 max-[620px]:text-xs">
          <i className="fa-solid fa-envelope mt-[3px] w-[14px] flex-[0_0_14px] text-xs text-gray-500"></i>
          {employee.email || "Email not available"}
        </p>

        <p className="mb-[9px] flex items-start gap-2 wrap-anywhere text-[13px] leading-[1.45] text-gray-700 max-[620px]:text-xs">
          <i className="fa-solid fa-phone mt-[3px] w-[14px] flex-[0_0_14px] text-xs text-gray-500"></i>
          {employee.phone || "Phone not available"}
        </p>
      </div>
    </div>
 </Link>
  );
};

export default EmployeeCard;