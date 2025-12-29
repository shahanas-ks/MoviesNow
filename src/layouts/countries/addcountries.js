import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { addCountries } from "../../apiCalls/countries";
import MDSnackbar from "components/MDSnackbar";

function AddCountriesForm({ onClose }) {
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.countries || {}
  );

  const [name, setCountries] = useState("");
  const [code, setCode] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    code: "",
  });

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Country name is required";
    }

    if (!code.trim()) {
      newErrors.code = "Country code is required";
    } else if (!/^[A-Z]{2,2}$/.test(code)) {
      newErrors.code = "Code must be 2 uppercase letters (e.g. EN, FR)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    console.log("hit");
    e.preventDefault();

    if (!validate()) return;

    dispatch(addCountries({ name, code })).then((res) => {
      if (res?.payload?.id) {
        console.log("res", res);
        setMessage("Country added successfully");
        setOpenSnack(true);

        setTimeout(() => {
          setCountries("");
          setCode("");
          onClose();
        }, 1000);
      } else {
        setMessage(res?.payload || "Failed to add country");
        setOpenSnack(true);
      }
    });
  };

  useEffect(() => {
    if (success) {
      setCountries("");
      setCode("");
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
            setCountries(e.target.value);
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
          label="Code"
          fullWidth
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setErrors((prev) => ({ ...prev, code: "" }));
          }}
          error={Boolean(errors.code)}
        />
        {errors.code && (
          <MDTypography variant="caption" color="error">
            {errors.code}
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

export default AddCountriesForm;
