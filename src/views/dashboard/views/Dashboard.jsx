import React from "react";
import "../assets/Dashboard.css";
import SideBar from "../../../common/components/Sidebar";
import DashboardView from "../components/DashboardView";
import TopBar from "../../../common/components/TopBar";

const Dashboard = () => {
  return (
    <div>
      <div className="dashboard-sidebar">
        <SideBar />
      </div>
      <div>
        <TopBar />
      </div>
      <div className="dashboard">
        <div style={{ marginLeft: "250px" }}>
          <DashboardView />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
