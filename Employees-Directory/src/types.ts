export interface Company {
  title?: string;
  department?: string;
}

export type EmployeeId = number | string;
export type LoadStatus = "idle" | "loading" | "succeeded" | "failed";
export type Department =
  | "IT"
  | "HR"
  | "Sales"
  | "Marketing"
  | "Accounting"
  | "Finance";

export const departmentOptions = [
  "IT",
  "HR",
  "Sales",
  "Marketing",
  "Accounting",
  "Finance",
] as const satisfies readonly Department[];

export interface Address {
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface Employee {
  id: EmployeeId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number | string;
  image?: string;
  company?: Company;
  address?: Address;
}

export interface EmployeeForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  department: Department;
  age: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type EmployeeCreateData = Omit<EmployeeForm, "age" | "address" | "city" | "state" | "postalCode" | "country"> & {
  age: number;
  image: string;
  address: Address;
  company: Company;
};

export type EmployeeDraft = Partial<Pick<Employee, "firstName" | "lastName" | "email">>;
export type EmployeeSummary = Readonly<Pick<Employee, "id" | "firstName" | "lastName">>;

export interface EmployeeResponse {
  employees: Employee[];
  total: number;
}

export interface ApiUsersResponse {
  users: Employee[];
  total: number;
}

export interface EmployeeState {
  employees: Employee[];
  total: number;
  skip: number;
  status: LoadStatus;
  error: string | null | undefined;
  loadMoreError: string | null | undefined;
  loadingMore: boolean;
  addStatus: LoadStatus;
  addError: string | null | undefined;
}

export interface FiltersState {
  search: string;
  department: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  designation?: string;
  department?: string;
  age?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  submit?: string;
}
