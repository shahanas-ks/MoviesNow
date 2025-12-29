import axios from "axios";
import config from "../config/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

const loginClient = axios.create({
  baseURL: config.apiHost,
  timeout: config.timeout,
  //  withCredentials: true,
  // credentials: "include",
  headers: {
    // Accept: 'application/json; charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': 'true'
    // "Content-Type": "application/json",

    //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});
loginClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 && error.response.data.code === 10005) {
      // localStorage.removeItem("jwt");
      // localStorage.removeItem("user");
      // location.reload();
    }
    return error;
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      // const res = await loginClient.post("v1/auth/login", data);
      const res = await loginClient.post(
        "v1/auth/login",
        new URLSearchParams(data),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("res", res);

      if (res?.data) {
        localStorage.setItem("jwt", res.data.access_token);
      }

      return res; 
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Login failed");
    }
  }
);

export async function logoutUser(id) {
  let result = await loginClient
    .post(
      "/nricompe/api/v1/users/logout/",
      { user_id: id },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      }
    )
    .then((res) => {
      // localStorage.removeItem("jwt");
      // localStorage.removeItem("user");
      return res?.data || res?.response?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
