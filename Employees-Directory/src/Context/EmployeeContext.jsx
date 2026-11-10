import {createContext,useContext,useState,useEffect} from "react"
import { getEmployees,createEmployee  } from "../api"


const EmployeeContext = createContext();

export const EmployeeProvider = ({children})=>{

    const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const [skip, setSkip] = useState(20);
  const [total, setTotal] = useState(0);
  const [loadingmore, setLoadingmore] = useState(false);


// fetch the data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getEmployees(20, 0);

        setEmployees(result.employees);
        setTotal(result.total);
      } catch (error) {
        setError(error.message || "Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  
  // Add new employee
  const addEmployee = async (employeeData) => {
    try {
      const newEmployee = await createEmployee(employeeData);

      setEmployees((previousEmployees) => [
        newEmployee,
        ...previousEmployees,
      ]);

      setTotal((previousTotal) => previousTotal + 1);

      return newEmployee;
    } catch (error) {
      throw error;
    }
  };

// load more employeed
  const loadMoreEmployees = async () => {
    try {
      setLoadingmore(true);
      setError("");

      const result = await getEmployees(10, skip);

      setEmployees((previousEmployees) => [
        ...previousEmployees,
        ...result.employees,
      ]);

      setSkip((previousSkip) => previousSkip + result.employees.length);
      setTotal(result.total);
    } catch (error) {
      setError(error.message || "Unable to load more employees");
    } finally {
      setLoadingmore(false);
    }
  };



const value = {
    employees,  
    addEmployee,
    loading,
    error,
    total,
    loadMoreEmployees,
    loadingmore,

};


return (
    <EmployeeContext.Provider value={value}>
        {children}
    </EmployeeContext.Provider>
);
};

// custom-hooks
export const useEmployees = () =>{
    const context = useContext(EmployeeContext);

    if(!context){
        throw new Error("useEmployees must be used inside EmployeeProvider")
    }

    return context; 
};

export const useEmployee = useEmployees;
