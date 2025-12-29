import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { addLanguages } from "../../apiCalls/languages";

// import { addLanguage } from "store/reducers/languageThunk";
// import { resetLanguageState } from "store/reducers/languageSlice";

function AddLanguageForm({ onClose }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.languages || {}
  );

  const [name, setLanguage] = useState("");
  const [code, setCode] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    code: "",
  });

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Language name is required";
    }

    if (!code.trim()) {
      newErrors.code = "Language code is required";
    } else if (!/^[A-Z]{2,5}$/.test(code)) {
      newErrors.code = "Code must be 2–5 uppercase letters (e.g. EN, FR)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    console.log("hit")
    e.preventDefault();

    // if (!validate()) return;

    dispatch(addLanguages({ name, code }));
  };

  useEffect(() => {
    if (success) {
      setLanguage("");
      setCode("");
      setErrors({});
      // dispatch(resetLanguageState());
      onClose();
    }
  }, [success, dispatch, onClose]);

  return (
    <MDBox component="form" onSubmit={handleSubmit}>
      {/* Language Field */}
      <MDBox mb={2}>
        <MDInput
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => {
            setLanguage(e.target.value);
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

      {/* Code Field */}
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

      {/* API Error */}
      {error && (
        <MDTypography variant="caption" color="error" mb={2}>
          {error}
        </MDTypography>
      )}

      {/* Actions */}
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
