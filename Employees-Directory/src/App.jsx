
import Header from './Components/Header'
import SummarySection from './Components/SummarySection'
import EmployeeSearchBox from './Components/EmployeeSearchBox'
import EmployeeList from './Components/EmployeeList'
import employee from '../src/employee-data/employee'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <div className="app-shell">
        <SummarySection />
        <EmployeeSearchBox />
        <EmployeeList props={employee} />
      </div>
    </>
  )
}

export default App
