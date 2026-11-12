
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import userImage from "../assets/user.png";
import { addEmployee } from "../features/employees/employeesSlice";
import { selectAllEmployees } from "../features/employees/employeeSelectors";

const initialForm = {
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
};


// Remove whitespace trim function
const trimFormValues = (form) =>
  Object.fromEntries(
    Object.entries(form).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );

const fieldClassName =
  "box-border w-full rounded-lg border border-gray-300 bg-white px-[14px] py-3 text-sm outline-none focus:border-[#08764f] focus:shadow-[0_0_0_3px_rgba(8,118,79,0.1)]";
const fieldErrorClassName =
  "!border-red-500 focus:!border-red-500 focus:!shadow-[0_0_0_3px_rgba(239,68,68,0.12)]";
const labelClassName = "text-sm font-semibold text-slate-700";
const fieldErrorMessageClassName = "text-[13px] leading-5 text-red-600";
const submitErrorMessageClassName =
  "mt-1 mb-3 rounded-lg bg-red-100 px-4 py-3 text-[13px] leading-6 text-red-600";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const employees = useSelector(selectAllEmployees);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form fields:
  const validate = (form) => {
    const errors = {};
    const trimmedForm = trimFormValues(form);

    const firstName = trimmedForm.firstName;
    const lastName = trimmedForm.lastName;
    const email = trimmedForm.email;
    const phone = trimmedForm.phone;
    const designation = trimmedForm.designation;
    const department = trimmedForm.department;
    const age = trimmedForm.age;
    const postalCode = trimmedForm.postalCode;

    // pattern fields
    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!firstName) {
      errors.firstName = "First name is required";
    } else if (firstName.length < 3) {
      errors.firstName = "Minimum 3 characters required";
    } else if (!namePattern.test(firstName)) {
      errors.firstName = "Only letters are allowed";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    } else if (lastName.length < 3) {
      errors.lastName = "Minimum 3 characters required";
    } else if (!namePattern.test(lastName)) {
      errors.lastName = "Only letters are allowed";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Enter a valid email";
    } else if (
      employees.some(
        (employee) =>
          employee.email?.trim().toLowerCase() === email.toLowerCase()
      )
    ) {
      errors.email = "This email already exists";
    }

    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!phonePattern.test(phone)) {
      errors.phone = "Phone must contain exactly 10 digits";
    }

    if (!designation) {
      errors.designation = "Designation is required";
    }

    if (!department) {
      errors.department = "Department is required";
    }

    if (!age) {
      errors.age = "Age is required";
    } else if (!Number.isInteger(Number(age)) || Number(age) < 18 || Number(age) > 100) {
      errors.age = "Age must be a whole number between 18 and 100";
    }

    if (!trimmedForm.address) {
      errors.address = "Street address is required";
    }

    if (!trimmedForm.city) {
      errors.city = "City is required";
    }

    if (!trimmedForm.state) {
      errors.state = "State is required";
    }

    if (!postalCode) {
      errors.postalCode = "Pincode is required";
    } else if (!/^\d{6}$/.test(postalCode)) {
      errors.postalCode = "Pincode must contain exactly 6 digits";
    }

    if (!trimmedForm.country) {
      errors.country = "Country is required";
    }

    return errors;
  };

  // HandleChange
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // Validate
  const handleBlur = (e) => {
    const { name } = e.target;

    const validationErrors = validate(trimFormValues(formData));

    setErrors((previous) => ({
      ...previous,
      [name]: validationErrors[name] || "",
    }));
  };

  // Submit employee details
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    const trimmedForm = trimFormValues(formData);
    setFormData(trimmedForm);

    const validationErrors = validate(trimmedForm);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSaving(true);

      const employeeData = {
        ...trimmedForm,
        age: Number(trimmedForm.age),
        image: userImage,
        address: {
          address: trimmedForm.address.trim(),
          city: trimmedForm.city.trim(),
          state: trimmedForm.state.trim(),
          postalCode: trimmedForm.postalCode.trim(),
          country: trimmedForm.country.trim(),
        },
        company: {
          title: trimmedForm.designation,
          department: trimmedForm.department,
        },
      };

  //2-second timer
  await Promise.all([
    dispatch(addEmployee(employeeData)).unwrap(),

    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);



      setFormData(initialForm);
      setErrors({});

      navigate("/");
    } catch (error) {
      setErrors((previous) => ({
        ...previous,
        submit: error.message || "Unable to add employee",
      }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-[900px] p-5 max-[600px]:my-5 max-[600px]:p-[14px]">
      <div className="mb-[25px] flex items-center justify-between">
        <div>
          <h2 className="m-0 text-[26px] font-bold text-[#172033] max-[600px]:text-[21px]">Add New Employee</h2>
          <p className="mt-2 text-[#737b85]">Enter the employee details below.</p>
        </div>

        <Link to="/" className="font-semibold text-[#08764f] no-underline">
          ← Back
        </Link>
      </div>

      <form
        className="rounded-xl border border-slate-200 bg-white p-[30px] max-[600px]:p-5"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-6 flex items-center gap-[14px] text-sm text-slate-500">
          <img className="h-[72px] w-[72px] rounded-full bg-slate-100 object-cover" src={userImage} alt="Default employee profile" />
          <span>Default employee photo</span>
        </div>

        <div className="grid grid-cols-2 gap-[22px] max-[600px]:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label className={labelClassName}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter first name"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className={`${fieldClassName} ${errors.firstName ? fieldErrorClassName : ""}`}
            />
            {errors.firstName && (
              <p id="firstName-error" className={fieldErrorMessageClassName} role="alert">{errors.firstName}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter last name"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={`${fieldClassName} ${errors.lastName ? fieldErrorClassName : ""}`}
            />
            {errors.lastName && (
              <p id="lastName-error" className={fieldErrorMessageClassName} role="alert">{errors.lastName}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter email address"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${fieldClassName} ${errors.email ? fieldErrorClassName : ""}`}
            />
            {errors.email && (
              <p id="email-error" className={fieldErrorMessageClassName} role="alert">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter phone number"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`${fieldClassName} ${errors.phone ? fieldErrorClassName : ""}`}
            />
            {errors.phone && (
              <p id="phone-error" className={fieldErrorMessageClassName} role="alert">{errors.phone}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Frontend Developer"
              aria-invalid={Boolean(errors.designation)}
              aria-describedby={errors.designation ? "designation-error" : undefined}
              className={`${fieldClassName} ${errors.designation ? fieldErrorClassName : ""}`}
            />
            {errors.designation && (
              <p id="designation-error" className={fieldErrorMessageClassName} role="alert">{errors.designation}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.department)}
              aria-describedby={errors.department ? "department-error" : undefined}
              className={`${fieldClassName} ${errors.department ? fieldErrorClassName : ""}`}
            >
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Accounting">Accounting</option>
              <option value="Finance">Finance</option>
            </select>
            {errors.department && (
              <p id="department-error" className={fieldErrorMessageClassName} role="alert">{errors.department}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName}>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter age"
              min="18"
              max="100"
              step="1"
              aria-invalid={Boolean(errors.age)}
              aria-describedby={errors.age ? "age-error" : undefined}
              className={`${fieldClassName} ${errors.age ? fieldErrorClassName : ""}`}
            />
            {errors.age && (
              <p id="age-error" className={fieldErrorMessageClassName} role="alert">{errors.age}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName} htmlFor="address">Street Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter street address"
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "address-error" : undefined}
              className={`${fieldClassName} ${errors.address ? fieldErrorClassName : ""}`}
            />
            {errors.address && (
              <p id="address-error" className={fieldErrorMessageClassName} role="alert">{errors.address}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName} htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter city"
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? "city-error" : undefined}
              className={`${fieldClassName} ${errors.city ? fieldErrorClassName : ""}`}
            />
            {errors.city && (
              <p id="city-error" className={fieldErrorMessageClassName} role="alert">{errors.city}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName} htmlFor="state">State</label>
            <input
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter state"
              aria-invalid={Boolean(errors.state)}
              aria-describedby={errors.state ? "state-error" : undefined}
              className={`${fieldClassName} ${errors.state ? fieldErrorClassName : ""}`}
            />
            {errors.state && (
              <p id="state-error" className={fieldErrorMessageClassName} role="alert">{errors.state}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName} htmlFor="postalCode">Pincode</label>
            <input
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter pincode"
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={6}
              aria-invalid={Boolean(errors.postalCode)}
              aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
              className={`${fieldClassName} ${errors.postalCode ? fieldErrorClassName : ""}`}
            />
            {errors.postalCode && (
              <p id="postalCode-error" className={fieldErrorMessageClassName} role="alert">{errors.postalCode}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClassName} htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter country"
              aria-invalid={Boolean(errors.country)}
              aria-describedby={errors.country ? "country-error" : undefined}
              className={`${fieldClassName} ${errors.country ? fieldErrorClassName : ""}`}
            />
            {errors.country && (
              <p id="country-error" className={fieldErrorMessageClassName} role="alert">{errors.country}</p>
            )}
          </div>
        </div>

        {errors.submit && (
          <p className={submitErrorMessageClassName} role="alert">
            {errors.submit}
          </p>
        )}

        <div className="mt-[30px] flex justify-end gap-3 max-[600px]:flex-col-reverse">
          <Link to="/" className="cursor-pointer rounded-lg border border-gray-300 bg-white px-[22px] py-3 text-center text-sm font-semibold text-slate-600 no-underline">
            Cancel
          </Link>

          <button
  type="submit"
  disabled={saving}
  className="cursor-pointer rounded-lg border-0 bg-[#08764f] px-[22px] py-3 text-sm font-semibold text-white hover:bg-[#065f40] disabled:cursor-not-allowed disabled:opacity-60"
>
  {saving ? "Adding..." : "Add Employee"}
</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
