import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import { getEmployeeById } from "../api";
import "./EmployeeDetails.css";

const EmployeeDetails = () =>{
    const {id} = useParams();

    const [employee,setEmployee] = useState(null);
    const[loading,setLoading] = useState(true);
    const [error,setError] = useState("");

    useEffect(()=>{
    const fetchEmployee = async () =>{
        try {
            setLoading(true);
            setError("");
            setEmployee(null);

    const data = await getEmployeeById(id);
    setEmployee(data);
  } 
 catch (error) {
    setError(error.message || "Unable to fetch employee");
  } finally {
    setLoading(false);
  }
        }
    fetchEmployee();
    },[id]);


    if (loading) {
return <p className="status-message">Loading employee profile...</p>;
}

if (error || !employee) {
return (
<div className="employee-not-found">
<h2>Employee not found</h2>
<p>{error}</p>
<Link to="/">Back to Home</Link>
</div>
);
}


const fullName = `${employee.firstName} ${employee.lastName}`;
const address = employee.address;

return (
<div className="employee-profile">
<Link to="/" className="back-link">
← Back to Employees
</Link>

  <div className="profile-card">
    <div className="profile-header">
      <img
        src={employee.image || "/default-user.svg"}
        alt={fullName}
        className="profile-image"
        onError={(event) => {
          event.currentTarget.src = "/default-user.svg";
        }}
      />

      <div>
        <h2>{fullName}</h2>
        <p>{employee.company?.title || "Not Available"}</p>
        <span className="profile-department">
          {employee.company?.department || "Other"}
        </span>
      </div>
    </div>

    <div className="profile-information">
      <h3>Personal Information</h3>

      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>
      <p><strong>Age:</strong> {employee.age}</p>

      <h3>Address</h3>

      <p>
        {[address?.address, address?.city, address?.state]
          .filter(Boolean)
          .join(", ") || "Address not available"}
      </p>
      {address?.postalCode && <p><strong>Pincode:</strong> {address.postalCode}</p>}
      {address?.country && <p>{address.country}</p>}
    </div>
  </div>
</div>

);
}
export default EmployeeDetails;
