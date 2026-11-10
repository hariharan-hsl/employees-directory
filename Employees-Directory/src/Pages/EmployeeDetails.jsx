
import { useParams, Link } from "react-router-dom";
import { useEmployees } from "../Context/EmployeeContext";
import useFetch from "../hooks/useFetch";

const EmployeeDetails = () => {
  const { id } = useParams();


  const { employees } = useEmployees();


  const employeeFromContext = employees.find(
    (employee) => String(employee.id) === String(id)
  );


  const {
    data: fetchedEmployee,
    loading,
    error,
  } = useFetch(
    employeeFromContext
      ? null
      : `https://dummyjson.com/users/${id}`
  );

  const employee = employeeFromContext || fetchedEmployee;

  if (!employeeFromContext && loading) {
    return (
      <p className="mx-auto w-[calc(100%-32px)] max-w-[640px] overflow-wrap-anywhere px-4 py-8 text-center text-base leading-[1.6] text-slate-700">
        Loading employee profile...
      </p>
    );
  }

  if (error && !employee) {
    return (
      <div className="mx-5 my-20 text-center">
        <h2 className="my-[0.83em] text-2xl font-bold">Employee not found</h2>
        <p>{error}</p>
        <Link to="/" className="text-[#08764f] no-underline">Back to Home</Link>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="mx-5 my-20 text-center">
        <h2 className="my-[0.83em] text-2xl font-bold">Employee not found</h2>
        <Link to="/" className="text-[#08764f] no-underline">Back to Home</Link>
      </div>
    );
  }

  const fullName = `${employee.firstName} ${employee.lastName}`;
  const address = employee.address;

  return (
    <div className="mx-auto my-10 max-w-[850px] p-5">
      <Link to="/" className="mb-5 inline-block font-semibold text-[#08764f] no-underline">
        ← Back to Employees
      </Link>

      <div className="rounded-[14px] border border-slate-200 bg-white p-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] max-[480px]:p-[18px]">
        <div className="flex items-center gap-6 border-b border-slate-200 pb-[25px] max-[480px]:flex-col max-[480px]:items-start">
          <img
            src={employee.image || "/default-user.svg"}
            alt={fullName}
            className="h-[120px] w-[120px] rounded-full bg-slate-100 object-cover max-[480px]:h-[90px] max-[480px]:w-[90px]"
            onError={(event) => {
              event.currentTarget.src = "/default-user.svg";
            }}
          />

          <div>
            <h2 className="mb-2 text-2xl font-bold text-[#172033]">{fullName}</h2>

            <p className="text-slate-500">
              {employee.company?.title || "Not Available"}
            </p>

            <span className="inline-block rounded-[20px] bg-green-100 px-3 py-1.5 text-[13px] text-green-800">
              {employee.company?.department || "Other"}
            </span>
          </div>
        </div>

        <div className="mt-[25px]">
          <h3 className="my-5 mb-3 text-[1.17em] font-bold text-[#172033]">Personal Information</h3>

          <p className="my-3 leading-[1.6] text-slate-600"><strong>Email:</strong> {employee.email}</p>
          <p className="my-3 leading-[1.6] text-slate-600"><strong>Phone:</strong> {employee.phone}</p>
          <p className="my-3 leading-[1.6] text-slate-600"><strong>Age:</strong> {employee.age}</p>

          <h3 className="my-5 mb-3 text-[1.17em] font-bold text-[#172033]">Address</h3>

          <p className="my-3 leading-[1.6] text-slate-600">
            {[
              address?.address,
              address?.city,
              address?.state,
            ]
              .filter(Boolean)
              .join(", ") || "Address not available"}
          </p>

          {address?.postalCode && (
            <p className="my-3 leading-[1.6] text-slate-600">
              <strong>Pincode:</strong> {address.postalCode}
            </p>
          )}

          {address?.country && <p className="my-3 leading-[1.6] text-slate-600">{address.country}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
