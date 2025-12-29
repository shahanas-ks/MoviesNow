import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function ConfirmDialog({
  open,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  loading,
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>
        <MDTypography variant="h6">{title}</MDTypography>
      </DialogTitle>

      <DialogContent>
        <MDBox mt={1}>
          <MDTypography variant="button" color="secondary">
            {description}
          </MDTypography>
        </MDBox>
      </DialogContent>

      <DialogActions>
        <MDButton variant="outlined" color="secondary" onClick={onCancel}>
          {cancelText}
        </MDButton>

        <MDButton
          variant="gradient"
          color="error"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Please wait..." : confirmText}
        </MDButton>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.defaultProps = {
  confirmText: "Confirm",
  cancelText: "Cancel",
  loading: false,
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default ConfirmDialog;
