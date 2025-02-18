import React, { useState, useEffect } from "react";
import axios from "axios";
import BackgroundImage from "../../images/Bg.svg";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  InputAdornment,
  Select,
  MenuItem
} from "@mui/material";

import {
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const validationSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  dob: yup.string().required("Date of birth is required"),
  mobile: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  gender: yup.string().required("Gender selection is required"),
});

function MemberDetails() {
  const initialValues = {
    fullname: "",
    dob: "",
    mobile: "",
    gender: "",
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const baseUrl = "https://countriesnow.space/api/v0.1/countries";

  // Fetch countries
  useEffect(() => {
    axios
      .get(`${baseUrl}`)
      .then((response) => {
        if (response.data && response.data.data) {
          setCountries(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // Function to fetch states
  const fetchStates = (country) => {
    axios
      .post(`${baseUrl}/states`, { country })
      .then((response) => {
        if (response.data && response.data.data) {
          setStates(response.data.data.states);
          setCities([]);
        } else {
          setStates([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        setStates([]);
      });
  };

  // Function to fetch cities
  const fetchCities = (country, state) => {
    axios
      .post(`${baseUrl}/state/cities`, { country, state })
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setCities(response.data.data);
        } else {
          setCities([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setCities([]);
      });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setCities([]);
    fetchStates(country);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    fetchCities(selectedCountry, state);
  };

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    alert("Member Details Added Successfully!");
    reset(initialValues);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
        <Typography variant="h4" align="left" gutterBottom>
          Enter Member Details
        </Typography>
        <Typography variant="subtitle1" align="left" color="textSecondary">
          Need to add perfect details
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Full Name */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                align="left"
                color="textSecondary"
              >
                Full Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                {...register("fullname")}
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    [`& fieldset`]: { borderRadius: 5 },
                  },
                }}
              />
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                align="left"
                color="textSecondary"
              >
                Date Of Birth
              </Typography>
              <TextField
                fullWidth
                type="date"
                {...register("dob")}
                error={!!errors.dob}
                helperText={errors.dob?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    [`& fieldset`]: { borderRadius: 5 },
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                align="left"
                color="textSecondary"
              >
                Phone Number
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                {...register("mobile")}
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    [`& fieldset`]: { borderRadius: 5 },
                  },
                }}
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                margin="normal"
                error={!!errors.gender}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender selection is required" }}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="others"
                        control={<Radio />}
                        label="Others"
                      />
                    </RadioGroup>
                  )}
                />
                <Typography variant="caption" color="error">
                  {errors.gender?.message}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <Divider sx={{ marginBottom: 2 }} />
            </Grid>
            <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  align="left"
                  color="textSecondary"
                >
                  Address Line 1
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="address"
                  placeholder="Enter Address"
                  InputProps={{
                    sx: {
                      [`& fieldset`]: { borderRadius: 5 },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  align="left"
                  color="textSecondary"
                >
                  Address Line 2
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="address"
                  placeholder="Enter Address"
                  InputProps={{
                    sx: {
                      [`& fieldset`]: { borderRadius: 5 },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Typography>Country</Typography>
                  <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    sx={{
                      [`& fieldset`]: { borderRadius: 5 },
                    }}
                  >
                    {countries.map((country, index) => (
                      <MenuItem key={index} value={country.country}>
                        {country.country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Typography>State</Typography>
                  <Select
                    value={selectedState}
                    onChange={handleStateChange}
                    sx={{
                      [`& fieldset`]: { borderRadius: 5 },
                    }}
                  >
                    {states.map((state, index) => (
                      <MenuItem key={index} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Typography>City</Typography>
                  <Select
                    sx={{
                      [`& fieldset`]: { borderRadius: 5 },
                    }}
                  >
                    {cities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography>Pin Code</Typography>
                <TextField
                  fullWidth
                  sx={{
                    [`& fieldset`]: { borderRadius: 5 },
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ borderRadius: 15 }}
              >
                Save
              </Button>
            </Grid>
            
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default MemberDetails;
