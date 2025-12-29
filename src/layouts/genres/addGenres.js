import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { addGenres, updategenres } from "../../apiCalls/genres";
import MDSnackbar from "components/MDSnackbar";

function AddLanguageForm({ onClose, selectedItem }) {
  console.log("selectedItem", selectedItem);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.languages || {}
  );

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    if (selectedItem?.id) {
      setname(selectedItem?.name);
      setDescription(selectedItem?.description);
    }
  }, [selectedItem]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Genre name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Genre description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    console.log("hit");
    e.preventDefault();

    if (!validate()) return;
    if (selectedItem?.id) {
      dispatch(updategenres({ name, description, id: selectedItem?.id })).then(
        (res) => {
          if (res?.payload?.id) {
            console.log("res", res);
            setMessage("Genre updated successfully");
            setOpenSnack(true);

            setTimeout(() => {
              setname("");
              setDescription("");
              onClose();
            }, 1000);
          } else {
            setMessage("Failed to add genre");
            setOpenSnack(true);
          }
        }
      );
    } else {
      dispatch(addGenres({ name, description })).then((res) => {
        if (res?.payload?.id) {
          console.log("res", res);
          setMessage("Genre added successfully");
          setOpenSnack(true);

          setTimeout(() => {
            setname("");
            setDescription("");
            onClose();
          }, 1000);
        } else {
          setMessage("Failed to add genre");
          setOpenSnack(true);
        }
      });
    }
  };

  useEffect(() => {
    if (success) {
      setname("");
      setDescription("");
      setErrors({});
      onClose();
    }
  }, [success, dispatch, onClose]);

  const closeSnackbar = () => {
    setMessage("");
    setOpenSnack(false);
  };

  return (
    <MDBox component="form" onSubmit={handleSubmit}>
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
      <MDBox mb={2}>
        <MDInput
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => {
            setname(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
          error={Boolean(errors.name)}
        />
        {errors.name && (
          <MDTypography variant="caption" color="error">
            {errors.name}
          </MDTypography>
        )}
      </MDBox>

      <MDBox mb={2}>
        <MDInput
          label="Description"
          fullWidth
          multiline
          rows={4} // you can increase this (5–6) if needed
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((prev) => ({ ...prev, description: "" }));
          }}
          error={Boolean(errors.description)}
        />
        {errors.description && (
          <MDTypography variant="caption" color="error">
            {errors.description}
          </MDTypography>
        )}
      </MDBox>

      {error && (
        <MDTypography variant="caption" color="error" mb={2}>
          {error}
        </MDTypography>
      )}

      <MDBox display="flex" justifyContent="flex-end" gap={1}>
        <MDButton variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </MDButton>

        <MDButton
          type="submit"
          variant="gradient"
          color="success"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add"}
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default AddLanguageForm;
