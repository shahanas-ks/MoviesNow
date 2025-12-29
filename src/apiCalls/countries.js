import axios from 'axios';
import config from '../config/index';
import { createAsyncThunk } from "@reduxjs/toolkit";

const languagesClient = axios.create({
  baseURL: config.apiHost,
  timeout: config.timeout,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
  }
});
languagesClient.interceptors.response.use(
  function (response) {
    return response;
  }

);
export const addCountries = createAsyncThunk(
  "languages/addCountries",
  async (data, { rejectWithValue }) => {
    console.log("localStorage.getItem('jwt')",localStorage.getItem('jwt'),data)
    try {
      const res = await languagesClient.post("v1/lookup/countries", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add language");
    }
  }
);
export const getCountries = createAsyncThunk(
  "languages/addCountries",
  async (data, { rejectWithValue }) => {
    try {
      const res = await languagesClient.get("v1/lookup/countries");
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add language");
    }
  }
);
export async function updatelanguages(id, data) {
  let result = await languagesClient
    .patch(`/accounts/update-languages/${id}/`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}

export async function listlanguagess(data) {
  let result = await languagesClient
    .post('/accounts/users/', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
export async function deletelanguages(id) {
  let result = await languagesClient
    .delete(`/accounts/delete-languages/${id}/`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
