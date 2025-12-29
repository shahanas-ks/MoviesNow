import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function MDModal({ open, onClose, title, children, width = 400 }) {
  return (
    <Modal open={open} onClose={onClose}>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Card sx={{ width, borderRadius: 2 }}>
          {/* Header */}
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            borderBottom="1px solid #eee"
          >
            <MDTypography variant="h6">{title}</MDTypography>
            <Icon sx={{ cursor: "pointer" }} onClick={onClose}>
              close
            </Icon>
          </MDBox>

          {/* Content */}
          <MDBox p={2}>{children}</MDBox>
        </Card>
      </MDBox>
    </Modal>
  );
}

export default MDModal;
