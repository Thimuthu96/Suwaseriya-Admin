import React, { useState, useEffect } from "react";
import "../../../common/styles/TablePage.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { db } from "../../../api/firebase-config";
import { collection, getDocs } from "firebase/firestore";

//components
import SideBar from "../../../common/components/Sidebar";
import TopBar from "../../../common/components/TopBar";
import Filter from "../../../common/components/Filter";

//styles
import "../assets/AmbulancePage.css";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  { field: "Id", headerName: "ID", width: 60 },
  { field: "DriverName", headerName: "Driver Name", width: 180 },
  { field: "Mobile", headerName: "Mobile", width: 150 },
  { field: "Email", headerName: "Email", width: 180 },
  { field: "VehicleNumber", headerName: "Vehicle Number", width: 180 },
];

const filters = [
  {
    key: "f1",
    label: "Id",
    name: "id",
  },
  {
    key: "f2",
    label: "Name",
    name: "name",
  },
  {
    key: "f3",
    label: "Mobile Number",
    name: "mobile",
  },
  {
    key: "f4",
    label: "Email",
    name: "email",
  },
  {
    key: "f5",
    label: "Vehicle Number",
    name: "vehicleNumber",
  },
];

const init = {
  id: "",
  admitDate: "",
  patientName: "",
};

const AmbulanceView = () => {
  const [filter, setFilter] = useState(init);
  const [ambulances, setAmbulances] = useState([]);

  const onChangeHandler = (event) => {
    /* const { name, value } = event.target;
    setFilter({ ...filter, [name]: value }); */
  };

  const onSearchHandler = (event) => {
    /* event.preventDefault();
    dispatch(getDevices(queryString(filter))); */
  };

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "ambulance"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setAmbulances(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="dashboard-sidebar">
        <SideBar />
      </div>
      <div>
        <TopBar />
      </div>
      <div className="App-routing-section table-frame">
        <div className="table-background">
          <div className="page-header">
            <h4>Active Ambulances</h4>
          </div>
          <hr style={{ color: "#0E9E52" }} />
          <div className="page-structure">
            <Filter
              values={filter}
              filters={filters}
              onChange={onChangeHandler}
              onSearch={onSearchHandler}
            />
            <DataGrid
              style={{ height: "400px" }}
              rows={ambulances}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceView;
