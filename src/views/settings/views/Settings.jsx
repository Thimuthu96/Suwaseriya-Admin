import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

//mui dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//components
import SideBar from "../../../common/components/Sidebar";
import TopBar from "../../../common/components/TopBar";
import Button from "react-bootstrap/esm/Button";

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

const Settings = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/settings/driver-tasks");
  };

  //open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [Id, setId] = useState();
  const [JobDate, setJobDate] = useState();
  const [CompleteTime, setCompleteTime] = useState();
  const [documentId, setDocumentId] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [task, setTask] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "task"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTask(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [task]);

  //columns
  const columns = [
    { field: "Id", headerName: "User Id", width: 100 },
    { field: "JobDate", headerName: "Complete Date", width: 200 },
    { field: "CompleteTime", headerName: "Complete Time", width: 150 },
  ];

  return (
    <div>
      <div className="dashboard-sidebar">
        <SideBar />
      </div>
      <div>
        <TopBar />
      </div>

      <div
        className="App-routing-section"
        style={{ paddingTop: ".8em", paddingLeft: "1em" }}
      >
        <Button
          className="tab"
          style={{ backgroundColor: "#0E9E52" }}
          onClick={handleClickOpen}
        >
          Driver Tasks
        </Button>
      </div>
      {/* Update dialog */}
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle>Driver Daily Tasks</DialogTitle>
        <DialogContent style={{ width: "600px" }}>
          <br />
          <DataGrid
            style={{ height: "350px" }}
            rows={task}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="light"
            onClick={() => {
              handleClickClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
