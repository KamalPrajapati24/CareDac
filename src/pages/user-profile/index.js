import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
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
  Badge,
  Container,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  dob: yup.string().required("Date of birth is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Valid Email Address"),
  mobile: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),

  emergencymobile: yup
    .string()
    .required("Emergency Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  gender: yup.string().required("Gender selection is required"),
  address1: yup.string().required("Address Line 1 is required"),
  address2: yup.string().required("Address Line 2 is required"),
});

const UserProfile = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

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

  const [selectedImage, setSelectedImage] = useState(null);
  const [profileData, setProfileData] = useState({
    fullname: "User",
    dob: "",
    email: "",
    mobile: "",
    gender: "",
    address1: "",
    address2: "",
    image: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const baseUrl = "https://countriesnow.space/api/v0.1/countries";

  const onSubmit = (data) => {
    setProfileData({ ...data, image: selectedImage });
    setProfileDialogOpen(false);
  };

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <Box>
      <Container
        sx={{
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <Paper
          sx={{
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgba(0, 0, 0, 0.87)",
            minWidth: "275px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            marginTop: "40px",
            marginBottom: "10px",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "4px",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          {/* Profile Card */}
          <CardContent
            sx={{
              padding: "16px",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              {/* Avatar Section */}
              <Grid item>
                <Box
                  sx={{
                    backgroundColor: "rgb(209, 230, 255)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 3px 10px",
                    borderRadius: "12px",
                    height: "150px",
                    width: "150px",
                  }}
                >
                  <Avatar
                    src={profileData.image || "/profile.jpg"}
                    sx={{
                      position: "relative",
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                      WebkitBoxPack: "center",
                      justifyContent: "center",
                      flexShrink: "0",
                      fontSize: "1.25rem",
                      lineHeight: "1",
                      color: "rgb(255, 255, 255)",
                      backgroundColor: "rgb(189, 189, 189)",
                      width: "100%",
                      height: "100%",
                      borderRadius: "12px",
                      overflow: "hidden",
                      objectFit: "fill",
                    }}
                  />
                </Box>
              </Grid>

              {/* Profile Info Section */}
              <Grid item xs>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "4px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px 10px 0px 0px",
                        lineHeight: "1.5",
                        fontSize: "20px",
                        fontWeight: "700",
                        wordBreak: "break-word",
                      }}
                    >
                      {profileData.fullname}{" "}
                    </Typography>
                    <Typography
                      sx={{
                        margin: "0px 10px 0px 0px",
                        lineHeight: "1.5",
                        fontSize: "1rem",
                        fontWeight: "700",
                        color: "rgb(102, 112, 133)",
                      }}
                    >
                      ● {profileData.gender || "Gender"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        color: "rgb(16, 24, 40)",
                        fontWeight: "700",
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: 20, mr: 1 }} />{" "}
                      {profileData.mobile || "Mobile"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        color: "rgb(16, 24, 40)",
                        fontWeight: "700",
                      }}
                    >
                      <EmailIcon sx={{ fontSize: 20, mr: 1 }} />{" "}
                      {profileData.email || "Email"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        color: "rgb(16, 24, 40)",
                        fontWeight: "700",
                      }}
                    >
                      <HomeIcon sx={{ fontSize: 20, mr: 1 }} />{" "}
                      {profileData.address1 || "Address 1"},{" "}
                      {profileData.address2 || "Address 2"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Edit Button Section */}
              <Grid item>
                <Button
                  onClick={() => setProfileDialogOpen(true)}
                  sx={{
                    padding: "12px 15px",
                    fontWeight: "bold",
                    border: "1px solid rgb(2, 79, 170)",
                    borderRadius: "100px",
                    backgroundColor: "rgb(255, 255, 255)",
                    color: "rgb(2, 79, 170)",
                  }}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Paper>

        <Grid
          sx={{
            boxSizing: "border-box",
            display: "flex",
            flexFlow: "wrap",
            marginTop: "-16px",
            width: "calc(100% + 16px)",
            marginLeft: "-16px",
          }}
        >
          {/* My Condition */}
          <Grid
            sx={{
              paddingLeft: "16px",
              paddingTop: "16px",
              flexBasis: "33.3333%",
              WebkitBoxFlex: "0",
              flexGrow: "0",
              maxWidth: "33.3333%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgba(0, 0, 0, 0.87)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  paddingInline: "10px",
                  borderRadius: "8px",
                  flex: "1 1 0%",
                }}
              >
                <CardContent
                  sx={{
                    padding: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxPack: "justify",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        color: "rgb(52, 64, 84)",
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    >
                      My Condition
                    </Typography>
                    <Typography
                      onClick={handleOpen}
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        color: "rgb(2, 79, 170)",
                        fontSize: "20px",
                        fontWeight: "700",
                        paddingInline: "8px",
                        borderRadius: "10px",
                        transition: "background 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(2, 79, 170, 0.25)",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Edit
                    </Typography>
                  </Box>
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
                </CardContent>
              </Paper>
            </div>
          </Grid>
          {/* Special Needs Section */}
          <Grid
            sx={{
              paddingLeft: "16px",
              paddingTop: "16px",
              flexBasis: "33.3333%",
              WebkitBoxFlex: "0",
              flexGrow: "0",
              maxWidth: "33.3333%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgba(0, 0, 0, 0.87)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  paddingInline: "10px",
                  borderRadius: "8px",
                  flex: "1 1 0%",
                }}
              >
                <CardContent
                  sx={{
                    padding: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxPack: "justify",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        color: "rgb(52, 64, 84)",
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    >
                      Special Needs
                    </Typography>
                    <Typography
                      onClick={() => setNeedsDialogOpen(true)}
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        color: "rgb(2, 79, 170)",
                        fontSize: "20px",
                        fontWeight: "700",
                        paddingInline: "8px",
                        borderRadius: "10px",
                        transition: "background 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(2, 79, 170, 0.25)",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Edit
                    </Typography>
                  </Box>
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
                </CardContent>
              </Paper>
            </div>
          </Grid>
          {/* Services I Need Section */}
          <Grid
            sx={{
              paddingLeft: "16px",
              paddingTop: "16px",
              flexBasis: "33.3333%",
              WebkitBoxFlex: "0",
              flexGrow: "0",
              maxWidth: "33.3333%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgba(0, 0, 0, 0.87)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  paddingInline: "10px",
                  borderRadius: "8px",
                  flex: "1 1 0%",
                }}
              >
                <CardContent
                  sx={{
                    padding: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxPack: "justify",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        color: "rgb(52, 64, 84)",
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    >
                      Services I Need
                    </Typography>
                    <Typography
                      onClick={() => setServicesDialogOpen(true)}
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        color: "rgb(2, 79, 170)",
                        fontSize: "20px",
                        fontWeight: "700",
                        paddingInline: "8px",
                        borderRadius: "10px",
                        transition: "background 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(2, 79, 170, 0.25)",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Edit
                    </Typography>
                  </Box>
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
                </CardContent>
              </Paper>
            </div>
          </Grid>
        </Grid>

        {/*Family member adding */}
        <Grid
          sx={{
            boxSizing: "border-box",
            display: "flex",
            flexFlow: "wrap",
            marginTop: "-16px",
            width: "calc(100% + 16px)",
            marginLeft: "-16px",
          }}
        >
          <Grid
            sx={{
              paddingLeft: "16px",
              paddingTop: "16px",
              flexBasis: "50%",
              WebkitBoxFlex: "0",
              flexGrow: "0",
              maxWidth: "50%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgba(0, 0, 0, 0.87)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  paddingInline: "10px",
                  borderRadius: "8px",
                  flex: "1 1 0%",
                }}
              >
                <CardContent
                  sx={{
                    padding: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxPack: "justify",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        color: "rgb(52, 64, 84)",
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    >
                      Family Members
                    </Typography>
                    <Typography
                      onClick={() => setFamilyDialogOpen(true)}
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        color: "rgb(2, 79, 170)",
                        fontSize: "20px",
                        fontWeight: "700",
                        paddingInline: "8px",
                        borderRadius: "10px",
                        transition: "background 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(2, 79, 170, 0.25)",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Add new member
                    </Typography>
                  </Box>
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
                </CardContent>
              </Paper>
            </div>
          </Grid>
        </Grid>

        {/* Dialogs */}
        <Dialog
          open={profileDialogOpen}
          onClose={() => setProfileDialogOpen(false)}
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
          <DialogContent
            sx={{
              flex: "1 1 auto",
              overflowY: "auto",
              padding: "20px 24px",
              paddingInline: "0px",
            }}
          >
            <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
              <Typography variant="h4" align="left" gutterBottom>
                Edit Profile
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Box
                sx={{
                  paddingInline: "24px",
                  marginTop: "20px",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "100%",
                  }}
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                      sx={{
                        marginBottom: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        WebkitBoxAlign: "center",
                        WebkitBoxPack: "center",
                      }}
                    >
                      <Badge
                        sx={{
                          position: "relative",
                          display: "inline-flex",
                          verticalAlign: "middle",
                          flexShrink: 0,
                        }}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <>
                            <input
                              type="file"
                              accept="image/*"
                              id="image-upload"
                              style={{ display: "none" }}
                              onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload">
                              <IconButton
                                sx={{
                                  backgroundColor: "white",
                                  borderRadius: "50%",
                                  boxShadow: 1,
                                  "&:hover": { backgroundColor: "#f0f0f0" },
                                }}
                                size="small"
                                component="span"
                              >
                                <AttachFileIcon
                                  fontSize="small"
                                  color="primary"
                                />
                              </IconButton>
                            </label>
                          </>
                        }
                      >
                        <Avatar
                          src={selectedImage || profileData.image}
                          sx={{ width: 150, height: 150, borderRadius: "8px" }}
                        />
                      </Badge>
                    </Box>
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

                      {/* Email */}
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          align="left"
                          color="textSecondary"
                        >
                          Email
                        </Typography>
                        <TextField
                          fullWidth
                          type="email"
                          {...register("email")}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                            sx: { "& fieldset": { borderRadius: 5 } },
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

                      {/* Emergency Phone Number */}
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          align="left"
                          color="textSecondary"
                        >
                          Emergency Phone Number
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          {...register("emergencymobile")}
                          error={!!errors.emergencymobile}
                          helperText={errors.emergencymobile?.message}
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
                          {...register("address1")}
                          error={!!errors.address1}
                          helperText={errors.address1?.message}
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
                          {...register("address2")}
                          error={!!errors.address2}
                          helperText={errors.address2?.message}
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
            </Box>
          </DialogContent>
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
            <Button
              onClick={() => setServicesDialogOpen(false)}
              color="primary"
            >
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
            <form>
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
                  <FormControl component="fieldset" margin="normal">
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
                    <Typography variant="caption" color="error"></Typography>
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
      </Container>
    </Box>
  );
};

export default UserProfile;
