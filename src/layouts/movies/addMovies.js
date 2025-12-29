import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
// import { addMovie, updatemovies } from "../../apiCalls/movies";
import MDSnackbar from "components/MDSnackbar";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import { addMovie } from "apiCalls/movies";
import { getpersons } from "../../apiCalls/persons";
import { getGenres } from "../../apiCalls/genres";
import { getCountries } from "../../apiCalls/countries";
import {  getLanguages } from "../../apiCalls/languages";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function AddMoviesform({ onClose, selectedItem }) {
  const [form, setForm] = useState({
    title: "",
    overview: "",
    release_date: "",
    runtime: "",
    status: "released",
    is_active: true,
    trailer_url: "",
    website: "",
    poster: null,
    genre_ids: [0],
    language_ids: [0],
    country_ids: [0],
  });

  const [errors, setErrors] = useState({});
  const [langgList, setLanggList] = useState([]);
  const [genresList, setgenresList] = useState([]);
  const [countriesList, setcountriesList] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
      dispatch(getLanguages()).then((res) => {
         console.log("res", res);
         setLanggList(res?.payload);
       });
    dispatch(getGenres()).then((res) => {
      console.log("res", res);
      setgenresList(res?.payload);
    });
    dispatch(getCountries()).then((res) => {
      console.log("res", res);
      setcountriesList(res?.payload);
    });
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.overview) newErrors.overview = "Overview is required";
    if (!form.release_date) newErrors.release_date = "Release date is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      dispatch(addMovie(form)).then((res) => {
        if (res?.payload?.id) {
          console.log("res", res);
          setMessage("movie added successfully");
          setOpenSnack(true);

          setTimeout(() => {
            setname("");
            setDescription("");
            onClose();
          }, 1000);
        } else {
          setMessage("Failed to add movie");
          setOpenSnack(true);
        }
      });
      onClose?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedItem?.id) {
      setname(selectedItem?.name);
      setDescription(selectedItem?.description);
    }
  }, [selectedItem]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "movie name is required";
    }

    if (!description.trim()) {
      newErrors.description = "movie description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeSnackbar = () => {
    setMessage("");
    setOpenSnack(false);
  };

  return (
    <MDBox component="form" onSubmit={handleSubmit} width="100%">
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
      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={12} md={4}>
          <MDInput
            label="Title *"
            fullWidth
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={Boolean(errors.title)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MDInput
            type="date"
            label="Release Date *"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange("release_date", e.target.value)}
            error={Boolean(errors.release_date)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MDInput
            select
            label="Status"
            fullWidth
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <MenuItem value="released">Released</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </MDInput>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} md={8}>
          <MDInput
            label="Overview *"
            fullWidth
            multiline
            rows={3}
            value={form.overview}
            onChange={(e) => handleChange("overview", e.target.value)}
            error={Boolean(errors.overview)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MDInput
            label="Runtime (Hours)"
            type="number"
            fullWidth
            value={form.runtime}
            onChange={(e) => handleChange("runtime", e.target.value)}
          />
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} md={4}>
          <MDInput
            label="Trailer URL"
            fullWidth
            value={form.trailer_url}
            onChange={(e) => handleChange("trailer_url", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MDInput
            label="Website"
            fullWidth
            value={form.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MDTypography variant="caption">Poster</MDTypography> &nbsp;
       
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange("poster", e.target.files[0])}
            />{" "}
      
        </Grid>
       <Grid item xs={12} md={4} mt={2}>
  <FormControl fullWidth size="small">
    <InputLabel id="genres-label" sx={{ fontSize: 12 }}>
      Genres
    </InputLabel>

    <Select
      labelId="genres-label"
      multiple
      value={form.genre_ids}
      label="Genres"
      onChange={(e) => handleChange("genre_ids", e.target.value)}
      renderValue={(selected) => selected.join(", ")}
      sx={{
        minHeight: 40,              // ✅ compact height
        fontSize: 14,
      }}
    >
      {genresList.map((genre) => (
        <MenuItem key={genre.id} value={genre.id}>
          <Checkbox size="small" checked={form.genre_ids.includes(genre.id)} />
          <ListItemText
            primary={genre.name}
            primaryTypographyProps={{ fontSize: 14 }}
          />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>
            <Grid item xs={12} md={4}>
          <MDTypography variant="caption">Languages</MDTypography> &nbsp;

          <Select
            multiple
            fullWidth
            value={form.language_ids}
            onChange={(e) => handleChange("language_ids", e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {langgList.map((langg) => (
              <MenuItem key={langg.id} value={langg.id}>
                <Checkbox checked={form.language_ids.includes(langg.id)} />
                <ListItemText primary={langg.name} />
              </MenuItem>
            ))}
          </Select>
        </Grid>    <Grid item xs={12} md={4}>
          <MDTypography variant="caption">Countries</MDTypography> &nbsp;

          <Select
            multiple
            fullWidth
            value={form.country_ids}
            onChange={(e) => handleChange("country_ids", e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {countriesList.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                <Checkbox checked={form.country_ids.includes(country.id)} />
                <ListItemText primary={country.name} />
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
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
              {loading ? "Saving..." : "Save Movie"}
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default AddMoviesform;
