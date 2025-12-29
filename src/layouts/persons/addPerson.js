import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { addpersons, updatepersons } from "../../apiCalls/persons";
import MDSnackbar from "components/MDSnackbar";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function AddpersonsForm({ onClose, selectedItem }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: null,
    middle_name: null,
    date_of_birth: null,
    date_of_death: null,
    gender: null,
    biography: null,
    wiki_url: null,
    birth_place: null,
    is_actor: false,
    is_director: false,
    is_writer: false,
    is_producer: false,
    photo_path: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    console.log(key,value)
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // e.stop

    if (!form.first_name.trim()) {
      setErrors({ first_name: "First name is required" });
      return;
    }

    dispatch(addpersons(form)).then((res) => {
      if (res?.payload?.id) {
        console.log("res", res);
        setMessage("person added successfully");
        setOpenSnack(true);

        setTimeout(() => {
          setname("");
          setDescription("");
          onClose();
        }, 1000);
      } else {
        setMessage("Failed to add person");
        setOpenSnack(true);
      }
    });
  };

  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedItem?.id) {
      setname(selectedItem?.name);
      setDescription(selectedItem?.description);
    }
  }, [selectedItem]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "person name is required";
    }

    if (!description.trim()) {
      newErrors.description = "person description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeSnackbar = () => {
    setMessage("");
    setOpenSnack(false);
  };

  return (
    <MDBox component="form" onSubmit={handleSubmit} width="100%">
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
      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={12} md={4}>
          <MDInput
            label="First Name *"
            fullWidth
            value={form.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
            error={Boolean(errors.first_name)}
          />
          {errors.first_name && (
            <MDTypography variant="caption" color="error">
              {errors.first_name}
            </MDTypography>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <MDInput
            label="Middle Name"
            fullWidth
            value={form.middle_name}
            onChange={(e) => handleChange("middle_name", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MDInput
            label="Last Name"
            fullWidth
            value={form.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} md={4}>
          <MDInput
            type="date"
            label="Date of Birth"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange("date_of_birth", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MDInput
            type="date"
            label="Date of Death"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange("date_of_death", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MDInput
            label="Birth Place"
            fullWidth
            value={form.birth_place}
            onChange={(e) => handleChange("birth_place", e.target.value)}
          />
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} md={4}>
          <MDInput
            label="Wiki URL"
            fullWidth
            value={form.wiki_url}
            onChange={(e) => handleChange("wiki_url", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <MDInput
            label="Biography"
            fullWidth
            multiline
            rows={3}
            value={form.biography}
            onChange={(e) => handleChange("biography", e.target.value)}
          />
        </Grid>

        {/* Roles */}
        <Grid item xs={6}>
          <MDTypography variant="button" fontWeight="medium">
            Roles
          </MDTypography>

          <MDBox display="flex" gap={3} mt={1}>
            {["is_actor", "is_director", "is_writer", "is_producer"].map(
              (role) => (
                <FormControlLabel
                  key={role}
                  control={
                    <Checkbox
                      checked={form[role]}
                      onChange={(e) => handleChange(role, e.target.checked)}
                    />
                  }
                  label={role.replace("is_", "").toUpperCase()}
                />
              )
            )}
          </MDBox>
        </Grid>

        {/* Image Upload */}
        <Grid item xs={12} md={6}>
          <MDTypography variant="button" fontWeight="medium">
            Profile Photo
          </MDTypography>
          <MDBox display="flex" gap={3} mt={1}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange("photo_path", e.target.files[0])}
            />
          </MDBox>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <MDBox display="flex" justifyContent="flex-end" gap={1}>
            <MDButton variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </MDButton>
            <MDButton type="submit" variant="gradient" color="info">
              Save
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default AddpersonsForm;
