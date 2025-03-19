import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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

const UserProfile = ({ open, onClose }) => {
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

  // Separate dialog states
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [needsDialogOpen, setNeedsDialogOpen] = useState(false);
  const [servicesDialogOpen, setServicesDialogOpen] = useState(false);

  // Separate states for Special Needs and Services I Need
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [familyDialogOpen, setFamilyDialogOpen] = useState(false);

  const [condition, setCondition] = useState("");
  const [conditionDialogOpen, setConditionDialogOpen] = useState(false);
  const [conditionsList, setConditionsList] = useState([]);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const baseUrl = "https://countriesnow.space/api/v0.1/countries";

  // Open dialog
  const handleOpen = () => {
    setConditionDialogOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setConditionDialogOpen(false);
  };

  // Save condition
  const handleSave = () => {
    if (condition.trim()) {
      setConditionsList((prev) => [...prev, condition]);
      setCondition(""); // Clear input
    }
    setConditionDialogOpen(false);
  };

  // Delete condition
  const handleDeleteCondition = (index) => {
    setConditionsList((prevList) => prevList.filter((_, i) => i !== index));
  };

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

  const specialNeedsOptions = [
    "Abc Care 6",
    "Abc Care 3",
    "Test Care 3",
    "Test Care 2",
    "Test Care 1",
    "Personals Care 10",
    "Personals Care 9",
  ];

  const specialServiceNeedsOptions = [
    "Personal Care",
    "Domestic Assistance",
    "Out and About Transport",
    "Meal Preparation",
    "Medication Assistance",
    "Nursing Care",
    "Respite Care",
    "Companionship",
    "Household Maintenance",
    "Disability Support",
    "Mental Health Support",
    "Palliative Care",
    "Physiotherapy",
    "Speech Therapy",
    "Occupational Therapy",
  ];

  // Toggle functions for Special Needs
  const handleToggleNeed = (need) => {
    setSelectedNeeds((prevNeeds) =>
      prevNeeds.includes(need)
        ? prevNeeds.filter((item) => item !== need)
        : [...prevNeeds, need]
    );
  };

  // Toggle functions for Services I Need
  const handleToggleService = (service) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter((item) => item !== service)
        : [...prevServices, service]
    );
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
      {/* Profile Card */}
      <Card
        sx={{ p: 3, display: "flex", alignItems: "center", borderRadius: 2 }}
      >
        <Avatar src="/profile.jpg" sx={{ width: 80, height: 80, mr: 2 }} />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            User <small style={{ fontWeight: "normal" }}>● Female</small>
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <PhoneIcon sx={{ fontSize: 16, mr: 1 }} /> +91 987654322
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <EmailIcon sx={{ fontSize: 16, mr: 1 }} /> abc@gmail.com
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <LocationOnIcon sx={{ fontSize: 16, mr: 1 }} /> 2323 Dancing Dove
            Lane, NY 11101
          </Typography>
        </CardContent>
        <Button variant="outlined" onClick={() => setProfileDialogOpen(true)}>
          Edit Profile
        </Button>
      </Card>

      {/* My Condition */}
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          {/* My Condition Header */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            My Condition
            <span
              onClick={handleOpen}
              style={{
                cursor: "pointer",
                color: "#1976d2",
                fontSize: "14px",
              }}
            >
              Edit
            </span>
          </Typography>

          {/* Conditions List */}
          <List>
            {conditionsList.length > 0 ? (
              conditionsList.map((item, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteCondition(index)}
                    >
                      <DeleteIcon sx={{ color: "primary" }} />
                    </IconButton>
                  }
                >
                  <ListItemText primary={`✔ ${item}`} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No conditions added
              </Typography>
            )}
          </List>
        </Paper>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Special Needs Section */}
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              Special Needs
              <span
                onClick={() => setNeedsDialogOpen(true)}
                style={{
                  cursor: "pointer",
                  color: "#1976d2",
                  fontSize: "14px",
                }}
              >
                Edit
              </span>
            </Typography>
            <List>
              {selectedNeeds.length > 0 ? (
                selectedNeeds.map((need, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`● ${need}`} />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No special needs selected
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Services I Need Section */}
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              Services I Need
              <span
                onClick={() => setServicesDialogOpen(true)}
                style={{
                  cursor: "pointer",
                  color: "#1976d2",
                  fontSize: "14px",
                }}
              >
                Edit
              </span>
            </Typography>
            <List>
              {selectedServices.length > 0 ? (
                selectedServices.map((service, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`● ${service}`} />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No services selected
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              Family Members
              <Button onClick={() => setFamilyDialogOpen(true)}>
                Add new member
              </Button>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List>
              <ListItem>
                <Avatar sx={{ mr: 2 }}>OR</Avatar>
                <ListItemText
                  primary="Olivia Rhye"
                  secondary="21 years ● Male"
                />
              </ListItem>
              <ListItem>
                <Avatar sx={{ mr: 2 }}>OR</Avatar>
                <ListItemText
                  primary="Olivia Rhye"
                  secondary="21 years ● Female"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <Dialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
          <Typography variant="h4" align="left" gutterBottom>
            Edit Profile
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
      </Dialog>

      {/* Dialog for Adding Condition */}
      <Dialog
        open={conditionDialogOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>My Condition</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Add condition
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
          <List sx={{ mt: 2 }}>
            {conditionsList.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={item} />
                </ListItem>
                {index !== conditionsList.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: "20px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              borderRadius: "20px",
              backgroundColor: "#0057b8",
              color: "white",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Special Needs Dialog */}
      <Dialog
        open={needsDialogOpen}
        onClose={() => setNeedsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Select Special Needs</DialogTitle>
        <DialogContent>
          <FormGroup>
            {specialNeedsOptions.map((need, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedNeeds.includes(need)}
                    onChange={() => handleToggleNeed(need)}
                  />
                }
                label={need}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNeedsDialogOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={() => setNeedsDialogOpen(false)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Services Dialog */}
      <Dialog
        open={servicesDialogOpen}
        onClose={() => setServicesDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Select Services You Need</DialogTitle>
        <DialogContent>
          <FormGroup>
            {specialServiceNeedsOptions.map((service, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedServices.includes(service)}
                    onChange={() => handleToggleService(service)}
                  />
                }
                label={service}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServicesDialogOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={() => setServicesDialogOpen(false)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={familyDialogOpen}
        onClose={() => setFamilyDialogOpen(false)}
        sx={{
          opacity: "1",
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
          hight: "100%",
          outline: "0px",
          display: "flex",
          WebkitBoxPack: "center",
          justifyContent: "center",
          WebkitBoxAlign: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
          <Typography variant="h4" align="left" gutterBottom>
            Enter Member Details
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
      </Dialog>
    </Box>
  );
};

export default UserProfile;
