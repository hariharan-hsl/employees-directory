
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userImage from "../assets/user.png";
import "./AddEmployee.css";

const AddEmployee = ({ addEmployee }) => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    department: "IT",
    age: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Submit employee details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const employeeData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        age: Number(formData.age),
        image: userImage,
        address: {
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          postalCode: formData.postalCode.trim(),
          country: formData.country.trim(),
        },

        company: {
          title: formData.designation.trim(),
          department: formData.department,
        },
      };

      await addEmployee(employeeData);

      navigate("/");
    } catch (error) {
      setError(error.message || "Unable to add employee");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-employee-page">

      <div className="add-employee-header">
        <div>
          <h2>Add New Employee</h2>
          <p>Enter the employee details below.</p>
        </div>

        <Link to="/" className="back-button">
          ← Back
        </Link>
      </div>

      <form
        className="add-employee-form"
        onSubmit={handleSubmit}
      >
        <div className="employee-photo-preview">
          <img src={userImage} alt="Default employee profile" />
          <span>Default employee photo</span>
        </div>

        <div className="form-grid">

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Accounting">Accounting</option>
              <option value="Finance">Finance</option>

            </select>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              min="18"
              max="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter street address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Pincode</label>
            <input
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Enter pincode"
              autoComplete="postal-code"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
            />
          </div>

        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions">
          <Link to="/" className="cancel-button">
            Cancel
          </Link>

          <button
            type="submit"
            className="submit-button"
            disabled={saving}
          >
            {saving ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
