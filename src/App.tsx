import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { EmployeeDetail } from "./pages/EmployeeDetail";
import { Navbar } from "./components/Navbar";
import { CreateEmployee } from "./pages/CreateEmployee";
import Notification from "./components/Notification";
import "react-loading-skeleton/dist/skeleton.css";
import { UpdateEmployee } from "./pages/UpdateEmployee";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<EmployeeDetail />} />
        <Route path="/addEmployee" element={<CreateEmployee />} />
        <Route path="/updatePerson/:id" element={<UpdateEmployee />} />
      </Routes>
      <Notification />
    </Router>
  );
}

export default App;
