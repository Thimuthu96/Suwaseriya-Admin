import React, { useState, useEffect } from "react";
import "../assets/Dashboard.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateWidget from "../../../common/components/DateWidget";
import TimeWidget from "../../../common/components/TimeWidget";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import OnGoingIcon from "../../../assets/icons/ongoing.svg";
import PatientIcon from "../../../assets/icons/Patients.svg";
import UsersIcon from "../../../assets/icons/User.svg";
import HospitalIcon from "../../../assets/icons/hospital.svg";

import { db } from "../../../api/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const DashboardView = () => {
  const [totalUsers, setTotalUsers] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBe28r3HHTP5-looNAEaP1EY7H19zBio_g",
  });
  if (!isLoaded) return <div>...Loading</div>;
  return <Map />;

  /* useEffect(() => {
    firebase
      .firestore()
      .collection("patients")
      .get()
      .then((querySnapshot) => {
        const TotalUsers = querySnapshot.size;
        setTotalUsers(TotalUsers);
      });
  }, []); */

  function Map() {
    return (
      <div className="dashboard-view">
        <div className="tabs-area">
          <div className="tab1">
            <div className="tab-icon">
              <img src={OnGoingIcon} />
            </div>
            <div className="tab-details">
              <div className="tab-header">
                <h6>OnGoing</h6>
              </div>
              <div className="tab-count">
                <h6>210</h6>
              </div>
            </div>
          </div>
          <div className="tab">
            <div className="tab-icon">
              <img src={PatientIcon} />
            </div>
            <div className="tab-details">
              <div className="tab-header">
                <h6>Patients</h6>
              </div>
              <div className="tab-count">
                <h6>104</h6>
              </div>
            </div>
          </div>
          <div className="tab">
            <div className="tab-icon">
              <img src={UsersIcon} />
            </div>
            <div className="tab-details">
              <div className="tab-header">
                <h6>Users</h6>
              </div>
              <div className="tab-count">
                <h6>250</h6>
              </div>
            </div>
          </div>
          <div className="tab">
            <div className="tab-icon">
              <img src={HospitalIcon} />
            </div>
            <div className="tab-details">
              <div className="tab-header">
                <h6>Ambulances</h6>
              </div>
              <div className="tab-count">
                <h6>50</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="map-area">
          <div className="map-header">
            <h5>OnGoing Tasks</h5>
            <h6 style={{ display: "flex" }}>
              <CalendarTodayIcon id="date-time-icon" /> <DateWidget />
              <AccessTimeIcon id="date-time-icon" /> <TimeWidget />
            </h6>
          </div>
          <div className="task-map">
            <GoogleMap
              zoom={12}
              center={{ lat: 6.927079, lng: 80 }}
              mapContainerClassName="map-container"
            >
              <Marker />
            </GoogleMap>
          </div>
        </div>
      </div>
    );
  }
};

export default DashboardView;
