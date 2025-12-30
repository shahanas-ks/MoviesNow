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
    genre_ids = [],
    language_ids = [],
    country_ids = [],
  } = payload;
  console.log("genre_ids",genre_ids)

  // ✅ FORCE primitive query params
  const params = {
    title: title ?? "",
    overview: overview ?? "",
    release_date: release_date ?? "",
    status: status ?? "",
    is_active: Boolean(is_active),
  };

  // ✅ FormData for files & arrays
  const formData = new FormData();

  if (poster) formData.append("poster", poster);
  if (runtime) formData.append("runtime", runtime * 60); // hours → minutes
  if (trailer_url) formData.append("trailer_url", trailer_url);
  if (website) formData.append("website", website);
  
  if (genre_ids) formData.append("genre_ids", genre_ids);
  if (country_ids) formData.append("country_ids", country_ids);
  if (language_ids) formData.append("language_ids", language_ids);



  const res = await moviesClient.post("v1/movies/", formData, {
    params,
    headers: {
      "Content-Type": "application/json"

,
    },
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

