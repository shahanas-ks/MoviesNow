import axios from "axios";
import config from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";


const moviesClient = axios.create({
  baseURL: config.apiHost,
  timeout: config.timeout,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export const addMovie = async (payload) => {
  const {
    title,
    overview,
    release_date,
    status,
    is_active,
    runtime,
    trailer_url,
    website,
    poster,
    genre_ids,
    language_ids,
    country_ids,
  } = payload;

  // Query params
  const params = {
    title,
    overview,
    release_date,
    status,
    is_active,
  };

  // FormData
  const formData = new FormData();

  if (poster) formData.append("poster", poster);
  if (runtime) formData.append("runtime", runtime * 60); // hours → minutes
  if (trailer_url) formData.append("trailer_url", trailer_url);
  if (website) formData.append("website", website);

  genre_ids.forEach((id, i) => formData.append(`genre_ids[${i}]`, id));
  language_ids.forEach((id, i) => formData.append(`language_ids[${i}]`, id));
  country_ids.forEach((id, i) => formData.append(`country_ids[${i}]`, id));

  const res = await moviesClient.post("v1/movies/", formData, {
    params,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const getmovies = createAsyncThunk(
  "movies/addMovies",
  async (data, { rejectWithValue }) => {
    try {
      const res = await moviesClient.get("v1/movies");
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add movies");
    }
  }
);
export const updatemovies = createAsyncThunk(
  "movies/putmovies",
  async (data, { rejectWithValue }) => {
    try {
      const res = await moviesClient.put(`v1/movies/${data?.id}/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to add movies");
    }
  }
);

export const deletemovies = createAsyncThunk(
  "movies/deletemovies",
  async (id, { rejectWithValue }) => {
    try {
      const res = await moviesClient.delete(`v1/movies/${id}/`);
      return { id, data: res.data }; // return id for reducer update
    } catch (err) {
      return rejectWithValue(
        err?.response?.data || "Failed to delete genre"
      );
    }
  }
);

