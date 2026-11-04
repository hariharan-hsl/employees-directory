const employees_api = "https://dummyjson.com/users";
const local_employees_key = "employees-directory:employees";
const default_employee_image = "/default-user.svg";

const getLocalEmployees = () => {
  const savedEmployees = localStorage.getItem(local_employees_key);
  return savedEmployees ? JSON.parse(savedEmployees) : [];
};

export const getEmployees = async (limit = 30, skip = 0) => {
  const response = await fetch(
    `${employees_api}?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Employee not found");
  }

  const data = await response.json();
  const localEmployees = getLocalEmployees();

  return {
    employees: skip === 0 ? [...localEmployees, ...data.users] : data.users,
    total: data.total + localEmployees.length,
  };
};

export const createEmployee = async (employee) => {
  const localEmployees = getLocalEmployees();
  const newEmployee = {
    ...employee,
    id: `local-${crypto.randomUUID()}`,
    image: employee.image || default_employee_image,
  };

  localStorage.setItem(
    local_employees_key,
    JSON.stringify([newEmployee, ...localEmployees])
  );

  return newEmployee;
};

export const getEmployeeById = async (id) => {
  const localEmployee = getLocalEmployees().find(
    (employee) => String(employee.id) === String(id)
  );

  if (localEmployee) {
    return localEmployee;
  }

  const response = await fetch(`${employees_api}/${id}`);

  if (!response.ok) {
    throw new Error("Employee not found");
  }

  return await response.json();
};