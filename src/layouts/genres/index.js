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
// import { addGenres } from "store/reducers/languageThunk";
// import { resetGenrestate } from "store/reducers/Genreslice";
import MDModal from "components/MDModal";
import AddGenresForm from "./addGenres";
import {
  addGenres,
  getGenres,
  deletegenres,
  updategenres,
} from "../../apiCalls/genres";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "examples/Tables/DataTable";

function Genres() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [dataList, setdatalist] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedItem, setSelecteditem] = useState({});
  const [deleteId, setdeleteID] = useState("");



  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    dispatch(getGenres()).then((res) => {
      console.log("res", res);
      setdatalist(res?.payload);
    });
  };
  useEffect(() => {
    if (dataList.length > 0) {
      setRows(
        dataList?.map((item) => ({
          name: (
            <MDTypography variant="button" fontWeight="regular">
              {item.name}
            </MDTypography>
          ),

          description: (
            <MDTypography variant="button" fontWeight="regular">
              {item.description}
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
    { Header: "Genres", accessor: "name", align: "left" },
    { Header: "Code", accessor: "description", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  const handleEdit = (item) => {
    setSelecteditem(item);
    setOpen(true)
    console.log("Edit clicked:", item);
  };

  const handleDelete = (id) => {
    setdeleteID(id)
    
    console.log("Delete clicked, id:", id);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDModal
        open={open}
        onClose={() => {
          setOpen(false);
          loadData();
        }}
        title="Add Genres"
      >
        <AddGenresForm
          onClose={() => {
            setOpen(false);
            loadData();
          }}
          selectedItem={selectedItem}
        />
      </MDModal>
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
                <MDTypography variant="h5">Genres</MDTypography>

                <MDButton
                  variant="gradient"
                  color="info"
                  onClick={() => setOpen(true)}
                >
                  Add Genres
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

export default Genres;
