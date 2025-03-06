import React, { useState, useEffect } from "react";
import axios from "axios";
import BackgroundImage from "../../images/Bg.svg";
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function PatientDetails() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();
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
    alert("Data save successful!");
  };

  const onSave = () => {
    navigate("/homepage");
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
      <Container
        sx={{
          width: "100%",
          boxSizing: "border-box",
          display: "block",
        }}
      >
        <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
          <Typography variant="h4" align="left" gutterBottom>
            Enter Patient Details
          </Typography>
          <Typography variant="subtitle1" align="left" color="textSecondary">
            Need to add perfect details
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <form onSubmit={onSubmit}>
            <Grid container spacing={1}>
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
                <Button onClick={onSave}
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
      </Container>
    </Box>
  );
}

export default PatientDetails;
