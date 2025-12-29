import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDModal from "components/MDModal";
import AddPersonsForm from "./addPerson";
import { getpersons, deletepersons } from "../../apiCalls/persons";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "examples/Tables/DataTable";
import ConfirmDialog from "components/MDConfirmation";

function Persons() {
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [dataList, setdatalist] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedItem, setSelecteditem] = useState({});
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    dispatch(getpersons()).then((res) => {
      console.log("res", res);
      setdatalist(res?.payload);
    });
  };
  useEffect(() => {
    if (dataList.length > 0) {
      setRows(
        dataList?.map((item) => ({
          first_name: (
            <MDTypography variant="button" fontWeight="regular">
              {item.first_name}
            </MDTypography>
          ),
          middle_name: (
            <MDTypography variant="button" fontWeight="regular">
              {item.middle_name}
            </MDTypography>
          ),
          last_name: (
            <MDTypography variant="button" fontWeight="regular">
              {item.last_name}
            </MDTypography>
          ),
          gender: (
            <MDTypography variant="button" fontWeight="regular">
              {item.gender}
            </MDTypography>
          ),

          biography: (
            <MDTypography variant="button" fontWeight="regular">
              {item.biography ? item.biography?.slice(0, 50) + "..." : ""}
            </MDTypography>
          ),

          actions: (
            <MDBox display="flex" justifyContent="center" gap={1}>
              <IconButton
                color="info"
                size="small"
                onClick={() => handleEdit(item)}
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                color="error"
                size="small"
                onClick={() => handleDelete(item.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </MDBox>
          ),
        }))
      );
    }
  }, [dataList]);
  const columns = [
    { Header: "First name", accessor: "first_name", align: "left" },
    { Header: "Middle name", accessor: "middle_name", align: "left" },
    { Header: "Last name", accessor: "last_name", align: "left" },
    { Header: "Gender", accessor: "gender", align: "left" },
    { Header: "Biography", accessor: "biography", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  const handleEdit = (item) => {
    setSelecteditem(item);
    setOpen(true);
    console.log("Edit clicked:", item);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    console.log("selectedId", id);

    setOpenConfirm(true);

    console.log("Delete clicked, id:", id);
  };

  const handleConfirmDelete = () => {
    dispatch(deletepersons(selectedId)).then((res) => {
      if (res?.payload?.id) {
        console.log("res", res);
        setMessage("Person deleted successfully");
        setOpenSnack(true);
        loadData();
      } else {
        setMessage("Failed to delete Person");
        setOpenSnack(true);
      }
    });
    setOpenConfirm(false);
  };
  const closeSnackbar = () => {
    setMessage("");
    setOpenSnack(false);
    setSelectedId("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDSnackbar
        color={message?.includes("successfully") ? "success" : "error"}
        icon={message?.includes("successfully") ? "check" : "warning"}
        title={message?.includes("successfully") ? "Success" : "Error"}
        content={message}
        open={openSnack}
        onClose={closeSnackbar}
        close={closeSnackbar}
        bgWhite
      />

      <MDModal
        open={open}
        onClose={() => {
          setOpen(false);
          loadData();
        }}
        title="Add Persons"
        width={1200}
      >
        <AddPersonsForm
          onClose={() => {
            setOpen(false);
            loadData();
          }}
          selectedItem={selectedItem}
        />
      </MDModal>
      <ConfirmDialog
        open={openConfirm}
        title="Delete Language"
        biography="Are you sure you want to delete this? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <MDTypography variant="h5">Persons</MDTypography>

                <MDButton
                  variant="gradient"
                  color="info"
                  onClick={() => setOpen(true)}
                >
                  Add Persons
                </MDButton>
              </MDBox>

              <MDBox pt={3}>
                {dataList.length > 0 && (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    showTotalEntries={false}
                    noEndBorder
                    entriesPerPage={false}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Persons;
