import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { loginUser } from "../../../apiCalls/login";
import { useNavigate } from "react-router-dom";
import MDSnackbar from "components/MDSnackbar";

function Basic() {
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth || {});

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    // grant_type: "password",
    // // scope: "",
    // client_id: "string",
    // client_secret: "********",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Email regex validation
  const isValidEmail = (username) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const closeSnackbar = () => {
    setMessage("");
    setOpenSnack(false);
  };

  // 🔹 Validate form
  const validate = () => {
    let tempErrors = {};

    if (!formData.username) {
      tempErrors.username = "Email is required";
    } else if (!isValidEmail(formData.username)) {
      tempErrors.username = "Enter a valid username address";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 2) {
      tempErrors.password = "Password must be at least 2 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 🔹 Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(loginUser(formData)).then((res) => {
      if (res?.payload?.data?.access_token) {
        setMessage("Logged in successfully");
        setOpenSnack(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage("Please check the credentials and try again.");
        setOpenSnack(true);
      }
    });
  };

  return (
    <BasicLayout image={bgImage}>
      <MDSnackbar
        color={message?.includes("successfully") ? "success" : "error"}
        icon={message?.includes("successfully") ? "check" : "warning"}
        title={message?.includes("successfully") ? "Success" : "Error"}
        content={message}
        // dateTime="11 mins ago"
        open={openSnack}
        onClose={closeSnackbar}
        close={closeSnackbar}
        bgWhite
      />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="added"
          borderRadius="lg"
          coloredShadow="added"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <MDBox mb={2}>
              <MDInput
                type="username"
                label="Email"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.username)}
              />
              {errors.username && (
                <MDTypography variant="caption" color="error">
                  {errors.username}
                </MDTypography>
              )}
            </MDBox>

            {/* PASSWORD */}
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.password)}
              />
              {errors.password && (
                <MDTypography variant="caption" color="error">
                  {errors.password}
                </MDTypography>
              )}
            </MDBox>

            {/* SUBMIT */}
            <MDBox mt={4} mb={1}>
              <MDButton
                type="submit"
                variant="gradient"
                color="added"
                fullWidth
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
