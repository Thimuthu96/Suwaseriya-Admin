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
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { doc, setDoc, updateDoc } from "firebase/firestore";

//mui dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//components
import SideBar from "../../../common/components/Sidebar";
import TopBar from "../../../common/components/TopBar";
import Filter from "../../../common/components/Filter";
import CustomButton from "../../../common/components/Button";

//styles
import "../assets/Hospital.css";

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

const Hospitals = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(init);
  const [hospitals, setHospitals] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [Id, setId] = useState();
  const [HospitalName, setHospitalName] = useState();
  const [Address, setAddress] = useState();
  const [Contact, setContact] = useState();
  const [documentId, setDocumentId] = useState("");

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    /* const { name, value } = event.target;
    setFilter({ ...filter, [name]: value }); */
  };

  const onSearchHandler = (event) => {
    /* event.preventDefault();
    dispatch(getDevices(queryString(filter))); */
  };

  //update dialog
  const handleClickUpdateOpen = () => {
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [formValues, setFormValues] = useState(selectedData);

  const onClickHandler = () => {
    navigate("/hospitals/add-hospital");
  };

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "hospitals"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setHospitals(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  /* const handleUpdateHospital = () => {
    const firestore = firebase.db.ref("/hospitals").
  }; */

  const handleUpdateHospital = async (e) => {
    e.preventDefault();
    await (collection(db, "hospitals"),
    {
      Id: Id,
      HospitalName: HospitalName,
      Address: Address,
      Contact: Contact,
    });
    navigate("/hospitals");
  };

  const columns = [
    { field: "Id", headerName: "ID", width: 100 },
    { field: "HospitalName", headerName: "Hospital Name", width: 200 },
    { field: "Address", headerName: "Address", width: 150 },
    { field: "Contact", headerName: "Contact", width: 180 },
    {
      field: "Action",
      headerName: "Action",
      width: 180,
      renderCell: (data) => (
        <Tooltip title="edit">
          <IconButton
            onClick={() => {
              handleClickUpdateOpen();
              setSelectedData(data.row);
              setFormValues(data.row);
              setDocumentId(data.id);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

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
            <h4>Registered Hospitals</h4>
            <CustomButton
              id="customButton"
              label={"Add New"}
              onClick={onClickHandler}
            />
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
              rows={hospitals}
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
      {/* Update dialog */}
      <Dialog open={openUpdate} onClose={handleUpdateClose}>
        <DialogTitle>Update Patient</DialogTitle>
        <DialogContent style={{ width: "500px" }}>
          <TextField
            label="Hospital Id"
            margin="dense"
            id="Id"
            fullWidth
            variant="outlined"
            name="Id"
            defaultValue={formValues?.Id}
            onChange={(e) => setId(e.target.value)}
          />
          <br />
          <TextField
            margin="dense"
            id="outlined-required"
            label="Hospital Name"
            fullWidth
            variant="outlined"
            name="HospitalName"
            required
            onChange={handleChange}
            defaultValue={formValues?.HospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
          <br />
          <TextField
            margin="dense"
            id="outlined-required"
            label="Address"
            fullWidth
            variant="outlined"
            name="Address"
            required
            onChange={handleChange}
            defaultValue={formValues?.Address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <TextField
            margin="dense"
            id="outlined-required"
            label="Contact"
            fullWidth
            variant="outlined"
            name="Contact"
            required
            onChange={handleChange}
            defaultValue={formValues?.Contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="light"
            /* onClick={() => {
              handleUpdateClose();
            }} */
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUpdateHospital();
            }}
            type="submit"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Hospitals;
