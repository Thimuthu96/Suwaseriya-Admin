import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../views/dashboard/views/Dashboard";
import Patients from "../views/patients/views/Patients";
import Users from "../views/users/views/Users";
import Abulances from "../views/ambulances/views/AmbulanceView";
import Hospitals from "../views/hospitals/views/Hospitals";
import Settings from "../views/settings/views/Settings";
import DriverTasks from "../views/settings/components/DriverTasks";
import Sidebar from "../common/components/Sidebar";
import TopBar from "../common/components/TopBar";
import Login from "../login/Login";
import AddHospital from "../views/hospitals/components/AddHospital";
import { AuthContext } from "../context/AuthContext";

const Routings = () => {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  console.log("====================================");
  console.log(currentUser);
  console.log("====================================");

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/patients"
            element={
              <RequireAuth>
                <Patients />
              </RequireAuth>
            }
          />
          <Route
            path="/ambulances"
            element={
              <RequireAuth>
                <Abulances />
              </RequireAuth>
            }
          />
          <Route
            path="/hospitals"
            element={
              <RequireAuth>
                <Hospitals />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="/hospitals/add-hospital"
            element={
              <RequireAuth>
                <AddHospital />
              </RequireAuth>
            }
          />
          <Route
            path="/settings/driver-tasks"
            element={
              <RequireAuth>
                <DriverTasks />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default Routings;
