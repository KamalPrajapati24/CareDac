import React, { useState } from "react";
import Stars from "../../images/stars.png";
import person1 from "../../images/p1.png";
import person2 from "../../images/p2.png";
import person3 from "../../images/p3.png";
import shield from "../../images/shield.svg";
import {
  Paper,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  Rating,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
const caregivers = [
  {
    id: 101,
    name: "Juliya",
    rating: 3,
    reviews: 0,
    experience: 5,
    price: "$5.00-8.00",
    availability: "Part Time Available Care",
    img: person1,
    age: "25 years",
    gender: "Female",
    language: "English,Hindi,Gujarati",
    specialneeds: ["Low Sugar High Blood Pressure"],
    conditions: ["High Blood Pressure"],
  },
  {
    id: 102,
    name: "Jack",
    rating: 3.5,
    reviews: 0,
    experience: 5,
    price: "$5.00-8.00",
    availability: "Part Time Available Care",
    img: person2,
    age: "40 years",
    gender: "Male",
    language: "English,Hindi,Gujarati",
    specialneeds: ["Low Sugar High Blood Pressure"],
    conditions: ["Low sugar"],
  },
  {
    id: 103,
    name: "DJ",
    rating: 5,
    reviews: 0,
    experience: 10,
    price: "$5.00-8.00",
    availability: "Full Time Available Care",
    img: person3,
    age: "35 years",
    gender: "Male",
    language: "English,Hindi,Gujarati",
    specialneeds: ["Low Sugar High Blood Pressure"],
    conditions: ["High Blood Pressure and High sugar"],
  },
];

const CaregiverCard = ({ caregiver }) => {
  return (
    <Box>
      <Link to={`/caregiver-profile/${caregiver.id}`} state={{ caregiver }}>
       
        <Paper
          sx={{
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgba(0, 0, 0, 0.87)",
            minWidth: "275px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <Card
            sx={{
              padding: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flrxDirection: "row",
                webkitBoxPack: "justify",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "15px",
                }}
              >
                <Box>
                  <CardMedia
                    component="img"
                    image={caregiver.img}
                    alt={caregiver.name}
                    sx={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "14px",
                      border: "1.5px solid rgb(252, 145, 85)",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      textDecoration: "none",
                      margin: "0px",
                      lineHeight: "1.5",
                      fontWeight: "700",
                      fontSize: "20px",
                      wordBreak: "break-word",
                    }}
                  >
                    {caregiver.name}
                  </Typography>
                  <Typography
                    sx={{
                      margin: "0px",
                      fontWeight: "400",
                      fontSize: "0.875rem",
                      lineHeight: "1.43",
                    }}
                  >
                    <span></span>
                    <span></span>
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      WebkitBoxAlign: "center",
                    }}
                  >
                    <Rating
                      value={caregiver.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({caregiver.reviews}) {caregiver.rating}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: "0px",
                  textAlign: "end",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "700",
                    lineHeight: "1.6",
                    fontSize: "16px",
                    margin: "0px 0px 10px",
                  }}
                >
                  {caregiver.price} - {caregiver.experience} years exp
                </Typography>
                <Box
                  sx={{
                    webkitBoxPack: "end",
                    justifyContent: "flex-end",
                    display: "flex",
                  }}
                >
                  <Button
                    sx={{
                      width: "100%",
                      padding: "12px 15px",
                      borderRadius: "100px",
                      fontWeight: "bold",
                      backgroundColor: "rgb(2, 79, 170)",
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    Book
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                flexDirection: "row",
                WebkitBoxAlign: "start",
                alignItems: "start",
                display: "flex",
                webkitBoxPack: "justify",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  margin: "0px",
                  lineHeight: "1.6",
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                {caregiver.availability}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  WebkitBoxAlign: "end",
                  alignItems: "end",
                }}
              >
                <img src={shield}  alt={""}/>
                <Typography
                  sx={{
                    margin: "0px",
                    lineHeight: "1.5",
                    color: "rgb(102, 112, 133)",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  Background check done
                </Typography>
              </Box>
            </Box>
          </Card>
        </Paper>
      </Link>
    </Box>
  );
};

function HomePage() {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  
  const [showingResultsFor, setShowingResultsFor] = React.useState("All");
  const [location, setLocation] = React.useState("");
  
  const handleShowingResultsChange = (event) => {
    setShowingResultsFor(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const [experience, setExperience] = useState([0, 30]);

  const handleChange = (event, newValue) => {
    setExperience(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          flex: "1 1 0%",
        }}
      >
        <Container
          sx={{
            maxWidth: isSmallScreen ? "100%" : "1200px",
            minWidth: isSmallScreen ? "100%" : "600px",
            paddingLeft: "24px",
            paddingRight: "24px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            boxSizing: "border-box",
            display: "block",
            marginTop: "30px",
          }}
        >
          <Grid
          
            container
            spacing={2}
            sx={{
              boxSizing: "border-box",
              display: "flex",
              flexFlow: "wrap",
              marginTop: "-16px",
              width: "calc(100% + 16px)",
              marginLeft: "-16px",
              paddingLeft: "16px",
              paddingTop: "16px",
            }}
          >
            <Grid
            item
            xs={12}
            md={5}
              sx={{
                paddingLeft: "16px",
                paddingTop: "16px",
                maxWidth: isSmallScreen ? "100%" : "41.6667%",
                flexBasis: isSmallScreen ? "100%" : "41.6667%",
                boxSizing: "border-box",
                margin: "0px",
              }}
            >
              <Box>
                <Paper
                  sx={{
                    backgroundColor: "rgb(255, 255, 255)",
                    color: "rgba(0, 0, 0, 0.87)",
                    minWidth: "275px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    padding: "10px",
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
                        WebkitBoxAlign: "center",
                        alignItems: "center",
                        WebkitBoxPack: "justify",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          margin: "0px",
                          lineHeight: "1.5",
                          fontWeight: "700",
                          fontSize: "20px",
                        }}
                      >
                        Showing results for
                      </Typography>
                      <Button
                        sx={{
                          display: "inline-flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          WebkitBoxPack: "center",
                          justifyContent: "center",
                          position: "relative",
                          boxSizing: "border-box",
                          backgroundColor: "transparent",
                          textTransform: "none",
                          cursor: "pointer",
                          verticalAlign: "middle",
                          fontWeight: "500",
                          fontSize: "0.875rem",
                          lineHeight: "1.75",
                          minWidth: "64px",
                          color: "rgb(71, 84, 103)",
                          padding: "4px 8px",
                          borderRadius: "40px",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: "rgb(152, 162, 179)",
                        }}
                      >
                        Clear filter
                      </Button>
                    </Box>
                    <FormControl
                      sx={{
                        display: "inline-flex",
                        flexDirection: "column",
                        position: "relative",
                        verticalAlign: "top",
                        width: "100%",
                        borderRadius: "16px",
                        border: "1.5px solid black",
                      }}
                    >
                      <Select
                        value={showingResultsFor}
                        onChange={handleShowingResultsChange}
                        sx={{
                          borderRadius: "16px",
                          border: "none",
                        }}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Option 1">
                          Full Time Available
                        </MenuItem>
                        <MenuItem value="Option 2">
                          Part Time Available
                        </MenuItem>
                        <MenuItem value="Option 3">Casual</MenuItem>
                        <MenuItem value="Option 4">Student</MenuItem>
                      </Select>
                    </FormControl>

                    <Typography
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        fontWeight: "700",
                        fontSize: "20px",
                        paddingTop: "10px",
                      }}
                    >
                      Location
                    </Typography>
                    <Box
                      sx={{
                        marginTop: "15px",
                      }}
                    >
                      <Grid
                        sx={{
                          boxSizing: "border-box",
                          display: "flex",
                          flexFlow: "wrap",
                          width: "100%",
                        }}
                      >
                        <FormControl
                          fullWidth
                          sx={{
                            display: "inline-flex",
                            flexDirection: "column",
                            position: "relative",
                            verticalAlign: "top",
                            width: "100%",
                            borderRadius: "16px",
                            border: "1.5px solid black",
                          }}
                        >
                          <Select
                            value={location}
                            onChange={handleLocationChange}
                            sx={{
                              borderRadius: "16px",
                              border: "none",
                            }}
                          >
                            <MenuItem value="City 1">Valsad</MenuItem>
                            <MenuItem value="City 2">Surat</MenuItem>
                            <MenuItem value="City 3">Navsari</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Box>

                    <Typography
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        fontWeight: "700",
                        fontSize: "20px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      Filter
                    </Typography>

                    <Paper
                      sx={{
                        backgroundColor: "rgb(255, 255, 255)",
                        color: "rgba(0, 0, 0, 0.87)",
                        minWidth: "275px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        borderRadius: "4px",
                        overflow: "hidden",
                        transition:
                          "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <CardContent
                        sx={{
                          padding: "16px",
                        }}
                      >
                        <Box
                          sx={{
                            marginTop: "15px",
                          }}
                        >
                          <Typography
                            sx={{
                              margin: "0px 0px 10px",
                              lineHeight: "1.5",
                              fontWeight: "700",
                              fontSize: "1rem",
                              color: "rgb(102, 112, 133)",
                            }}
                          >
                            Rating
                          </Typography>
                          <Grid
                            sx={{
                              display: "flex",
                              flexFlow: "wrap",
                              width: "100%",
                              boxSizing: "border-box",
                            }}
                          >
                            <Grid
                              sx={{
                                margin: "0px",
                                flexBasis: "100%",
                                maxWidth: "100%",
                                boxSizing: "border-box",
                                WebkitBoxFlex: "0",
                                flexGrow: "0",
                              }}
                            >
                              <Button
                                sx={{
                                  WebkitBoxAlign: "center",
                                  WebkitBoxPack: "center",
                                  position: "relative",
                                  boxSizing: "border-box",
                                  WebkitTapHighlightColor: "transparent",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  verticalAlign: "middle",
                                  appearance: "none",
                                  fontWeight: "500",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.75",
                                  textTransform: "none",
                                  minWidth: "64px",
                                  backgroundColor: "rgb(239, 239, 239)",
                                  color: "rgb(71, 84, 103)",
                                  display: "block",
                                  outline: "0px",
                                  margin: "0px",
                                  transition:
                                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                                  padding: "12px 20px",
                                  borderRadius: "100px",
                                  border: "1px solid rgb(152, 162, 179)",
                                  marginBottom: "8px",
                                  marginRight: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "8px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />

                                  <Typography>& above</Typography>
                                </div>
                              </Button>
                              <Button
                                sx={{
                                  WebkitBoxAlign: "center",
                                  WebkitBoxPack: "center",
                                  position: "relative",
                                  boxSizing: "border-box",
                                  WebkitTapHighlightColor: "transparent",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  verticalAlign: "middle",
                                  appearance: "none",
                                  fontWeight: "500",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.75",
                                  textTransform: "none",
                                  minWidth: "64px",
                                  backgroundColor: "rgb(239, 239, 239)",
                                  color: "rgb(71, 84, 103)",
                                  display: "block",
                                  outline: "0px",
                                  margin: "0px",
                                  transition:
                                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                                  padding: "12px 20px",
                                  borderRadius: "100px",
                                  border: "1px solid rgb(152, 162, 179)",
                                  marginBottom: "8px",
                                  marginRight: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "8px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <Typography>& above</Typography>
                                </div>
                              </Button>
                              <Button
                                sx={{
                                  WebkitBoxAlign: "center",
                                  WebkitBoxPack: "center",
                                  position: "relative",
                                  boxSizing: "border-box",
                                  WebkitTapHighlightColor: "transparent",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  verticalAlign: "middle",
                                  appearance: "none",
                                  fontWeight: "500",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.75",
                                  textTransform: "none",
                                  minWidth: "64px",
                                  backgroundColor: "rgb(239, 239, 239)",
                                  color: "rgb(71, 84, 103)",
                                  display: "block",
                                  outline: "0px",
                                  margin: "0px",
                                  transition:
                                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                                  padding: "12px 20px",
                                  borderRadius: "100px",
                                  border: "1px solid rgb(152, 162, 179)",
                                  marginBottom: "8px",
                                  marginRight: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "8px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <Typography>& above</Typography>
                                </div>
                              </Button>
                              <Button
                                sx={{
                                  WebkitBoxAlign: "center",
                                  WebkitBoxPack: "center",
                                  position: "relative",
                                  boxSizing: "border-box",
                                  WebkitTapHighlightColor: "transparent",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  verticalAlign: "middle",
                                  appearance: "none",
                                  fontWeight: "500",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.75",
                                  textTransform: "none",
                                  minWidth: "64px",
                                  backgroundColor: "rgb(239, 239, 239)",
                                  color: "rgb(71, 84, 103)",
                                  display: "block",
                                  outline: "0px",
                                  margin: "0px",
                                  transition:
                                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                                  padding: "12px 20px",
                                  borderRadius: "100px",
                                  border: "1px solid rgb(152, 162, 179)",
                                  marginBottom: "8px",
                                  marginRight: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "8px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    src={Stars}
                                    alt={""}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                  <Typography>& above</Typography>
                                </div>
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "15px",
                          }}
                        >
                          <Typography
                            sx={{
                              margin: "0px 0px 10px",
                              lineHeight: "1.5",
                              fontWeight: "700",
                              fontSize: "1rem",
                              color: "rgb(102, 112, 133)",
                            }}
                          >
                            Gender
                          </Typography>
                          <Grid
                            sx={{
                              display: "flex",
                              flexFlow: "wrap",
                              width: "100%",
                              boxSizing: "border-box",
                            }}
                          >
                            <Box display="flex" justifyContent="space-between">
                              <Button
                                sx={{
                                  WebkitBoxAlign: "center",
                                  WebkitBoxPack: "center",
                                  position: "relative",
                                  boxSizing: "border-box",
                                  WebkitTapHighlightColor: "transparent",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  verticalAlign: "middle",
                                  appearance: "none",
                                  fontWeight: "500",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.75",
                                  textTransform: "none",
                                  minWidth: "64px",
                                  backgroundColor: "rgb(239, 239, 239)",
                                  color: "rgb(71, 84, 103)",
                                  display: "block",
                                  outline: "0px",
                                  margin: "0px",
                                  transition:
                                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                                  padding: "12px 20px",
                                  borderRadius: "100px",
                                  border: "1px solid rgb(152, 162, 179)",
                                  marginBottom: "8px",
                                  marginRight: "8px",
                                }}
                              >
                                Male
                              </Button>
                              <Button
                                sx={{
                                  WebkitBoxAlign: "center",
                                  WebkitBoxPack: "center",
                                  position: "relative",
                                  boxSizing: "border-box",
                                  WebkitTapHighlightColor: "transparent",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  verticalAlign: "middle",
                                  appearance: "none",
                                  fontWeight: "500",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.75",
                                  textTransform: "none",
                                  minWidth: "64px",
                                  backgroundColor: "rgb(239, 239, 239)",
                                  color: "rgb(71, 84, 103)",
                                  display: "block",
                                  outline: "0px",
                                  margin: "0px",
                                  transition:
                                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                                  padding: "12px 20px",
                                  borderRadius: "100px",
                                  border: "1px solid rgb(152, 162, 179)",
                                  marginBottom: "8px",
                                  marginRight: "8px",
                                }}
                              >
                                Female
                              </Button>
                              <Button
                                sx={{
                                  WebkitBoxAlign: "center",
                                  WebkitBoxPack: "center",
                                  position: "relative",
                                  boxSizing: "border-box",
                                  WebkitTapHighlightColor: "transparent",
                                  cursor: "pointer",
                                  userSelect: "none",
                                  verticalAlign: "middle",
                                  appearance: "none",
                                  fontWeight: "500",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.75",
                                  textTransform: "none",
                                  minWidth: "64px",
                                  backgroundColor: "rgb(239, 239, 239)",
                                  color: "rgb(71, 84, 103)",
                                  display: "block",
                                  outline: "0px",
                                  margin: "0px",
                                  transition:
                                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                                  padding: "12px 20px",
                                  borderRadius: "100px",
                                  border: "1px solid rgb(152, 162, 179)",
                                  marginBottom: "8px",
                                  marginRight: "8px",
                                }}
                              >
                                Non-Binary
                              </Button>
                            </Box>
                          </Grid>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "15px",
                          }}
                        >
                          <Typography
                            sx={{
                              margin: "0px 0px 10px",
                              lineHeight: "1.5",
                              fontWeight: "700",
                              fontSize: "1rem",
                              color: "rgb(102, 112, 133)",
                            }}
                          >
                            Experience
                          </Typography>
                          <Typography
                            sx={{
                              margin: "0px",
                              fontSize: "1rem",
                            }}
                          >
                            <strong>{`${experience[0]} to ${experience[1]} years`}</strong>
                          </Typography>
                          <Box sx={{ position: "relative", mt: 2 }}>
                            {/*<Typography
                              sx={{
                                position: "absolute",
                                top: -30,
                                left: `${(experience[0] / 30) * 100}%`,
                                transform: "translateX(-50%)",
                                background: "#f0f0f0",
                                padding: "5px 10px",
                                borderRadius: "5px",
                              }}
                            >
                              {experience[0]}
                            </Typography>
                            <Typography
                              sx={{
                                position: "absolute",
                                top: -30,
                                left: `${(experience[1] / 30) * 100}%`,
                                transform: "translateX(-50%)",
                                background: "#f0f0f0",
                                padding: "5px 10px",
                                borderRadius: "5px",
                              }}
                            >
                              {experience[1]}
                            </Typography>*/}

                            <Slider
                              value={experience}
                              onChange={handleChange}
                              min={0}
                              max={30}
                              step={1}
                              marks
                              sx={{
                                mt: 3,
                                color: "rgb(252, 145, 85)",
                                borderRadius: "12px",
                                boxSizing: "content-box",
                                display: "inline-block",
                                position: "relative",
                                cursor: "pointer",
                                touchAction: "none",
                                WebkitTapHighlightColor: "transparent",
                                height: "4px",
                                width: "100%",
                                padding: "13px 0px",

                                "& .MuiSlider-rail": {
                                  height: 5,
                                  backgroundColor: "rgb(252, 145, 85)",
                                  display: "block",
                                  position: "absolute",
                                  borderRadius: "12px",
                                  opacity: "0.38",
                                  width: "100%",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                },
                                "& .MuiSlider-track": {
                                  height: 5,
                                  backgroundColor: "rgb(252, 145, 85)",
                                  display: "block",
                                  position: "absolute",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  borderRadius: "12px",
                                  borderWidth: "1px",
                                  borderStyle: "solid",
                                  borderImage: "initial",
                                  transition:
                                    "left 150ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms cubic-bezier(0.4, 0, 0.2, 1), bottom 150ms cubic-bezier(0.4, 0, 0.2, 1), height 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                                },
                                "& .MuiSlider-thumb": {
                                  width: 20,
                                  height: 20,
                                  position: "absolute",
                                  boxSizing: "border-box",
                                  backgroundColor: "rgb(252, 145, 85)",
                                  display: "flex",
                                  WebkitBoxAlign: "center",
                                  alignItems: "center",
                                  WebkitBoxPack: "center",
                                  justifyContent: "center",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  borderRadius: "50%",
                                  outline: "0px",
                                  transition:
                                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1), left 150ms cubic-bezier(0.4, 0, 0.2, 1), bottom 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                                },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              marginTop: "15px",
                            }}
                          >
                            <Typography
                              sx={{
                                margin: "0px 0px 10px",
                                lineHeight: "1.5",
                                fontWeight: "700",
                                fontSize: "1rem",
                                color: "rgb(102, 112, 133)",
                              }}
                            >
                              Select Service
                            </Typography>
                            <Grid
                              sx={{
                                display: "flex",
                                flexFlow: "wrap",
                                width: "100%",
                                boxSizing: "border-box",
                              }}
                            >
                              <Grid
                                sx={{
                                  flexBasis: "100%",
                                  WebkitBoxFlex: "0",
                                  flexGrow: "0",
                                  maxWidth: "100%",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "rgb(208, 213, 221)",
                                      display: "inline-flex",
                                      WebkitBoxAlign: "center",
                                      alignItems: "center",
                                      WebkitBoxPack: "center",
                                      justifyContent: "center",
                                      position: "relative",
                                      boxSizing: "border-box",
                                      backgroundColor: "transparent",
                                      WebkitTapHighlightColor: "transparent",
                                      outline: "0px",
                                      border: "0px",
                                      margin: "0px",
                                      cursor: "pointer",
                                      verticalAlign: "middle",
                                      appearance: "none",
                                      userSelect: "none",
                                      padding: "9px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      margin: "0px",
                                      fontSize: "1rem",
                                      lineHeight: "1.5",
                                      color: "rgb(52, 64, 84)",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Personals Care
                                  </Typography>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "rgb(208, 213, 221)",
                                      display: "inline-flex",
                                      WebkitBoxAlign: "center",
                                      alignItems: "center",
                                      WebkitBoxPack: "center",
                                      justifyContent: "center",
                                      position: "relative",
                                      boxSizing: "border-box",
                                      backgroundColor: "transparent",
                                      WebkitTapHighlightColor: "transparent",
                                      outline: "0px",
                                      border: "0px",
                                      margin: "0px",
                                      cursor: "pointer",
                                      verticalAlign: "middle",
                                      appearance: "none",
                                      userSelect: "none",
                                      padding: "9px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      margin: "0px",
                                      fontSize: "1rem",
                                      lineHeight: "1.5",
                                      color: "rgb(52, 64, 84)",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Domestic Assistance
                                  </Typography>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "rgb(208, 213, 221)",
                                      display: "inline-flex",
                                      WebkitBoxAlign: "center",
                                      alignItems: "center",
                                      WebkitBoxPack: "center",
                                      justifyContent: "center",
                                      position: "relative",
                                      boxSizing: "border-box",
                                      backgroundColor: "transparent",
                                      WebkitTapHighlightColor: "transparent",
                                      outline: "0px",
                                      border: "0px",
                                      margin: "0px",
                                      cursor: "pointer",
                                      verticalAlign: "middle",
                                      appearance: "none",
                                      userSelect: "none",
                                      padding: "9px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      margin: "0px",
                                      fontSize: "1rem",
                                      lineHeight: "1.5",
                                      color: "rgb(52, 64, 84)",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Social Support & Community Participation
                                  </Typography>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "rgb(208, 213, 221)",
                                      display: "inline-flex",
                                      WebkitBoxAlign: "center",
                                      alignItems: "center",
                                      WebkitBoxPack: "center",
                                      justifyContent: "center",
                                      position: "relative",
                                      boxSizing: "border-box",
                                      backgroundColor: "transparent",
                                      WebkitTapHighlightColor: "transparent",
                                      outline: "0px",
                                      border: "0px",
                                      margin: "0px",
                                      cursor: "pointer",
                                      verticalAlign: "middle",
                                      appearance: "none",
                                      userSelect: "none",
                                      padding: "9px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      margin: "0px",
                                      fontSize: "1rem",
                                      lineHeight: "1.5",
                                      color: "rgb(52, 64, 84)",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Specialist Care
                                  </Typography>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "rgb(208, 213, 221)",
                                      display: "inline-flex",
                                      WebkitBoxAlign: "center",
                                      alignItems: "center",
                                      WebkitBoxPack: "center",
                                      justifyContent: "center",
                                      position: "relative",
                                      boxSizing: "border-box",
                                      backgroundColor: "transparent",
                                      WebkitTapHighlightColor: "transparent",
                                      outline: "0px",
                                      border: "0px",
                                      margin: "0px",
                                      cursor: "pointer",
                                      verticalAlign: "middle",
                                      appearance: "none",
                                      userSelect: "none",
                                      padding: "9px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      margin: "0px",
                                      fontSize: "1rem",
                                      lineHeight: "1.5",
                                      color: "rgb(52, 64, 84)",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Out and About Transport
                                  </Typography>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "rgb(208, 213, 221)",
                                      display: "inline-flex",
                                      WebkitBoxAlign: "center",
                                      alignItems: "center",
                                      WebkitBoxPack: "center",
                                      justifyContent: "center",
                                      position: "relative",
                                      boxSizing: "border-box",
                                      backgroundColor: "transparent",
                                      WebkitTapHighlightColor: "transparent",
                                      outline: "0px",
                                      border: "0px",
                                      margin: "0px",
                                      cursor: "pointer",
                                      verticalAlign: "middle",
                                      appearance: "none",
                                      userSelect: "none",
                                      padding: "9px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      margin: "0px",
                                      fontSize: "1rem",
                                      lineHeight: "1.5",
                                      color: "rgb(52, 64, 84)",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Relief Respite Care
                                  </Typography>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "rgb(208, 213, 221)",
                                      display: "inline-flex",
                                      WebkitBoxAlign: "center",
                                      alignItems: "center",
                                      WebkitBoxPack: "center",
                                      justifyContent: "center",
                                      position: "relative",
                                      boxSizing: "border-box",
                                      backgroundColor: "transparent",
                                      WebkitTapHighlightColor: "transparent",
                                      outline: "0px",
                                      border: "0px",
                                      margin: "0px",
                                      cursor: "pointer",
                                      verticalAlign: "middle",
                                      appearance: "none",
                                      userSelect: "none",
                                      padding: "9px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      margin: "0px",
                                      fontSize: "1rem",
                                      lineHeight: "1.5",
                                      color: "rgb(52, 64, 84)",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Coaching & counselling
                                  </Typography>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "rgb(208, 213, 221)",
                                      display: "inline-flex",
                                      WebkitBoxAlign: "center",
                                      alignItems: "center",
                                      WebkitBoxPack: "center",
                                      justifyContent: "center",
                                      position: "relative",
                                      boxSizing: "border-box",
                                      backgroundColor: "transparent",
                                      WebkitTapHighlightColor: "transparent",
                                      outline: "0px",
                                      border: "0px",
                                      margin: "0px",
                                      cursor: "pointer",
                                      verticalAlign: "middle",
                                      appearance: "none",
                                      userSelect: "none",
                                      padding: "9px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      margin: "0px",
                                      fontSize: "1rem",
                                      lineHeight: "1.5",
                                      color: "rgb(52, 64, 84)",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Disability Product
                                  </Typography>
                                </div>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            sx={{
                              marginTop: "15px",
                            }}
                          >
                            <Typography
                              sx={{
                                margin: "0px 0px 10px",
                                fontSize: "1rem",
                                lineHeight: "1.5",
                                color: "rgb(102, 112, 133)",
                                fontWeight: "700",
                              }}
                            >
                              Special Needs
                            </Typography>
                            <Grid
                              sx={{
                                display: "flex",
                                flexFlow: "wrap",
                                width: "100%",
                                boxSizing: "border-box",
                              }}
                            >
                              <Grid
                                sx={{
                                  boxSizing: "border-box",
                                  flexBasis: "100%",
                                  WebkitBoxFlex: "0",
                                  flexGrow: "0",
                                  maxWidth: "100%",
                                  margin: "0px",
                                }}
                              >
                                <FormControl
                                  sx={{
                                    display: "inline-flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    verticalAlign: "top",
                                    width: "100%",
                                    borderRadius: "16px",
                                    border: "1.5px solid black",
                                  }}
                                >
                                  <Select
                                    value={showingResultsFor}
                                    onChange={handleShowingResultsChange}
                                    sx={{
                                      borderRadius: "16px",
                                      border: "none",
                                    }}
                                  >
                                    <MenuItem value="All"></MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            sx={{
                              marginTop: "15px",
                            }}
                          >
                            <Typography
                              sx={{
                                margin: "0px 0px 10px",
                                fontSize: "1rem",
                                lineHeight: "1.5",
                                color: "rgb(102, 112, 133)",
                                fontWeight: "700",
                              }}
                            >
                              My Condition
                            </Typography>
                            <Grid
                              sx={{
                                display: "flex",
                                flexFlow: "wrap",
                                width: "100%",
                                boxSizing: "border-box",
                              }}
                            >
                              <Grid
                                sx={{
                                  boxSizing: "border-box",
                                  flexBasis: "100%",
                                  WebkitBoxFlex: "0",
                                  flexGrow: "0",
                                  maxWidth: "100%",
                                  margin: "0px",
                                }}
                              >
                                <FormControl
                                  sx={{
                                    display: "inline-flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    verticalAlign: "top",
                                    width: "100%",
                                    borderRadius: "16px",
                                    border: "1.5px solid black",
                                  }}
                                >
                                  <Select
                                    value={showingResultsFor}
                                    onChange={handleShowingResultsChange}
                                    sx={{
                                      borderRadius: "16px",
                                      border: "none",
                                    }}
                                  >
                                    <MenuItem value="All"></MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            sx={{
                              marginTop: "15px",
                            }}
                          >
                            <Typography
                              sx={{
                                margin: "0px 0px 10px",
                                fontSize: "1rem",
                                lineHeight: "1.5",
                                color: "rgb(102, 112, 133)",
                                fontWeight: "700",
                              }}
                            >
                              Preffered Languages
                            </Typography>
                            <Grid
                              sx={{
                                display: "flex",
                                flexFlow: "wrap",
                                width: "100%",
                                boxSizing: "border-box",
                              }}
                            >
                              <Grid
                                sx={{
                                  boxSizing: "border-box",
                                  flexBasis: "100%",
                                  WebkitBoxFlex: "0",
                                  flexGrow: "0",
                                  maxWidth: "100%",
                                  margin: "0px",
                                }}
                              >
                                <FormControl
                                  sx={{
                                    display: "inline-flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    verticalAlign: "top",
                                    width: "100%",
                                    borderRadius: "16px",
                                    border: "1.5px solid black",
                                  }}
                                >
                                  <Select
                                    value={showingResultsFor}
                                    onChange={handleShowingResultsChange}
                                    sx={{
                                      borderRadius: "16px",
                                      border: "none",
                                    }}
                                  >
                                    <MenuItem value="1">English</MenuItem>
                                    <MenuItem value="2">Hindi</MenuItem>
                                    <MenuItem value="3">Arabic</MenuItem>
                                    <MenuItem value="4">Bosnaian</MenuItem>
                                    <MenuItem value="5">Chinese</MenuItem>
                                    <MenuItem value="6">Dutch</MenuItem>
                                    <MenuItem value="7">Filipino</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </CardContent>
                    </Paper>
                  </CardContent>
                </Paper>
              </Box>
            </Grid>
            <Grid
              xs={12}
              md={7}
              sx={{
                paddingLeft: "16px",
                paddingTop: "16px",
                WebkitBoxFlex: "0",
                flexGrow: "0",
                flexBasis: isSmallScreen ? "100%" : "58.333333%",
                maxWidth: isSmallScreen ? "100%" : "58.333333%",
              }}
            >
              <Box>
                <Paper
                  sx={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    boxSizing: "border-box",
                    position: "static",
                    color: "rgba(0, 0, 0, 0.87)",
                    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                    backgroundColor: "rgb(255, 255, 255)",
                    marginBottom: "20px",
                  }}
                >
                  <CardContent
                    sx={{
                      padding: "16px",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        fontWeight: "700",
                        fontSize: "20px",
                        marginBlock: "15px",
                      }}
                    >
                      Caregiver
                    </Typography>
                    <Grid container spacing={2}>
                      {caregivers.map((caregiver, index) => (
                        <Grid item xs={12} key={index}>
                          <CaregiverCard caregiver={caregiver} />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
