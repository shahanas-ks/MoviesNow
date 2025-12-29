import axios from "axios";
import config from "../config/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

const personsClient = axios.create({
  baseURL: config.apiHost,
  timeout: config.timeout,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
});
personsClient.interceptors.response.use(function (response) {
  return response;
});
export const addpersons = createAsyncThunk(
  "persons/addpersons",
  async (data, { rejectWithValue }) => {
    try {
      const res = await personsClient.post("v1/persons/", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add persons");
    }
  }
);
export const addPerson = async (payload) => {
  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    if (payload[key] !== null && payload[key] !== "") {
      formData.append(key, payload[key]);
    }
  });

  const res = await personsClient.post("v1/persons/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
export const getpersons = createAsyncThunk(
  "persons/addpersons",
  async (data, { rejectWithValue }) => {
    try {
      const res = await personsClient.get("v1/persons/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add persons");
    }
  }
);
export const updatepersons = createAsyncThunk(
  "persons/putpersons",
  async (data, { rejectWithValue }) => {
    try {
      const res = await personsClient.put(`v1/persons//${data?.id}/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add persons");
    }
  }
);

export const deletepersons = createAsyncThunk(
  "persons/deletepersons",
  async (id, { rejectWithValue }) => {
    try {
      const res = await personsClient.delete(`v1/persons//${id}/`);
      return { id, data: res.data }; // return id for reducer update
    } catch (err) {
      return rejectWithValue(
        err?.response?.data || "Failed to delete genre"
      );
    }
  }
);

