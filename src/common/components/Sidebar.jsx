import React from "react";
import "./Sidebar.css";
import SuwaseriyaLogo from "../../assets/images/SUWASERIYA_LOGO_IMG.png";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PersonIcon from "@mui/icons-material/Person";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";

const Sidebar = () => {
  return (
    <div className="sidebar-area">
      <div className="logo">
        <img src={SuwaseriyaLogo} />
        <h5>Suwaseriya</h5>
      </div>
      <div className="nav-area">
        <ul>
          <div>
            <li>
              <NavLink to="/" className="nav_link_style">
                <DashboardIcon />
                <span>Dashboard</span>
              </NavLink>
            </li>
          </div>
          <div>
            <li>
              <NavLink to="/patients" className="nav_link_style">
                <AccessibleIcon />
                <span>Patients</span>
              </NavLink>
            </li>
          </div>
          <div>
            <li>
              <NavLink to="/users" className="nav_link_style">
                <PersonIcon />
                <span>Users</span>
              </NavLink>
            </li>
          </div>
          <div>
            <li>
              <NavLink to="/ambulances" className="nav_link_style">
                <HealthAndSafetyIcon />
                <span>Ambulances</span>
              </NavLink>
            </li>
          </div>
          <div>
            <li>
              <NavLink to="/hospitals" className="nav_link_style">
                <LocalHospitalIcon />
                <span>Hospitals</span>
              </NavLink>
            </li>
          </div>
          <div>
            <li>
              <NavLink to="/settings" className="nav_link_style">
                <SettingsIcon />
                <span>Settings</span>
              </NavLink>
            </li>
          </div>
          <hr style={{ marginLeft: "-26%" }} />
          <div style={{ marginTop: "-5%" }}>
            <li>
              <HelpIcon />
              <span>Help</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
