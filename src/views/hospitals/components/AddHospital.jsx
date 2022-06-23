import React, { useState } from "react";
import { Typography, IconButton, Tooltip, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

//mui dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//components
import SideBar from "../../../common/components/Sidebar";
import TopBar from "../../../common/components/TopBar";
import CustomButton from "../../../common/components/Button";
import { db } from "../../../api/firebase-config";

const AddHospital = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [Id, setId] = useState();
  const [HospitalName, setHospitalName] = useState();
  const [Address, setAddress] = useState();
  const [Contact, setContact] = useState();
  const [open, setOpen] = React.useState(false);

  const onClickHeader = () => {
    navigate("/hospitals");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "hospitals"), {
      Id: Id,
      HospitalName: HospitalName,
      Address: Address,
      Contact: Contact,
    });
    navigate("/hospitals");
  };

  return (
    <div>
      <div className="dashboard-sidebar">
        <SideBar />
      </div>
      <div>
        <TopBar />
      </div>
      <div className="App-routing-section table-frame">
        {/* <form onSubmit={handleAdd}> */}
        <div className="table-background">
          <Typography
            variant="h5"
            onClick={onClickHeader}
            style={{ cursor: "pointer" }}
          >
            <IconButton>
              <Tooltip title="Go back">
                <ArrowBackIosIcon />
              </Tooltip>
            </IconButton>
            Add Hospital
          </Typography>
          <div className="add-form-area">
            <br />
            <TextField
              id="Id"
              label="Hospital Id"
              variant="outlined"
              size="small"
              value={Id}
              required
              onChange={(e) => setId(e.target.value)}
              style={{ width: "400px" }}
            />
            <br />
            <TextField
              id="Name"
              label="Hospital Name"
              variant="outlined"
              size="small"
              value={HospitalName}
              required
              onChange={(e) => setHospitalName(e.target.value)}
              style={{ width: "400px" }}
            />
            <br />
            <TextField
              id="Address"
              label="Address"
              variant="outlined"
              size="small"
              value={Address}
              required
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "400px" }}
            />
            <br />
            <TextField
              id="ContactNumber"
              label="Contact Number"
              variant="outlined"
              size="small"
              value={Contact}
              required
              onChange={(e) => setContact(e.target.value)}
              style={{ width: "400px" }}
            />
            <br />
            <CustomButton
              label="Submit"
              type="submit"
              onClick={handleClickOpen}
            />
            <Button onClick={onClickHeader}>Cancel</Button>
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Add Ward To System"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are you sure to add this ward to system?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="light" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleAdd}>Ok</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default AddHospital;
