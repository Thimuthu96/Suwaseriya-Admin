import React, { useEffect, useState } from "react";
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
  { field: "Name", headerName: "Name", width: 180 },
  { field: "Email", headerName: "Email", width: 180 },
  { field: "Mobile", headerName: "Mobile", width: 150 },
  { field: "RegisteredDate", headerName: "Registered Date", width: 180 },
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
];

const init = {
  id: "",
  admitDate: "",
  patientName: "",
};

const Users = () => {
  const [filter, setFilter] = useState(init);
  const [users, setUsers] = useState([]);

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
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
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
          <h4>User List</h4>
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
              rows={users}
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

export default Users;
