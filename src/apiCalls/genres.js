import axios from "axios";
import config from "../config/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

const genresclient = axios.create({
  baseURL: config.apiHost,
  timeout: config.timeout,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
});
genresclient.interceptors.response.use(function (response) {
  return response;
});
export const addGenres = createAsyncThunk(
  "genres/addgenres",
  async (data, { rejectWithValue }) => {
    try {
      const res = await genresclient.post("v1/lookup/genres", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add language");
    }
  }
);
export const getGenres = createAsyncThunk(
  "genres/addgenres",
  async (data, { rejectWithValue }) => {
    try {
      const res = await genresclient.get("v1/lookup/genres");
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add language");
    }
  }
);
export const updategenres = createAsyncThunk(
  "genres/putgenres",
  async (data, { rejectWithValue }) => {
    try {
      const res = await genresclient.put(`v1/lookup/genres/${data?.id}/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add language");
    }
  }
);

export const deletegenres = createAsyncThunk(
  "genres/deletegenres",
  async (id, { rejectWithValue }) => {
    try {
      const res = await genresclient.delete(`v1/lookup/genress/${id}/`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add language");
    }
  }
);
