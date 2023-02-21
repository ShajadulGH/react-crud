import "../src/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import EmployeeCreate from "./Employees/EmployeeCreate";
import EmployeeDetails from "./Employees/EmployeeDetails";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeList />}></Route>
          <Route path="/employee/create" element={<EmployeeCreate />}></Route>

          <Route
            path="/employee/details/:empid"
            element={<EmployeeDetails />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
