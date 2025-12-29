import { useState } from "react";
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
// import { addLanguage } from "store/reducers/languageThunk";
// import { resetLanguageState } from "store/reducers/languageSlice";
import MDModal from "components/MDModal";
import AddLanguageForm from "./addLangg";

function Languages() {
  const [open, setOpen] = useState(false);

  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);


  return (
    <DashboardLayout>
      <DashboardNavbar />
    

      <MDModal open={open} onClose={() => setOpen(false)} title="Add Language">
        <AddLanguageForm onClose={() => setOpen(false)} />
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
          <MDTypography variant="h5">Languages</MDTypography>

          <MDButton
            variant="gradient"
            color="info"
            onClick={() => setOpen(true)}
          >
            Add Language
          </MDButton>
        </MDBox>

        <MDBox pt={2} px={2}></MDBox>
      </Card>
    </Grid>
  </Grid>
</MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Languages;
