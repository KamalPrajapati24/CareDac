import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  CardContent,
  Grid,
  Typography,
  Divider,
  Button,
  SvgIcon,
  Rating,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  Select,
  FormControl,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import shield from "../../images/shield.svg";
import check from "../../images/tick.svg";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TranslateIcon from "@mui/icons-material/Translate";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";

const availableTimes = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

const generateAvailableDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 6; i++) {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + i);
    const dayName = futureDate.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const dayNumber = futureDate.getDate();
    days.push(`${dayName} ${dayNumber}`);
  }
  return days;
};

const availableDays = generateAvailableDays();

const getFormattedDate = (selectedDay) => {
  if (!selectedDay) return "";

  const [, dayNum] = selectedDay.split(" ");
  const dayNumber = parseInt(dayNum, 10);
  const month = new Date().getMonth() + 1;

  return `${dayNumber.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-2025`;
};

function CaregiverProfile() {
  const location = useLocation();
  const caregiver = location.state?.caregiver;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [thirdTime, setThirdTime] = useState(null);

  const familyMembers = ["My Parents", "My Child", "My Client", "Others"];
  if (!caregiver) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Caregiver not found
      </h2>
    );
  }

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDayChange = (event, newDay) => {
    if (newDay) setSelectedDay(newDay);
  };

  const handleTimeSelect = (time) => {
    const index = availableTimes.indexOf(time);
    if (index !== -1 && index < availableTimes.length - 1) {
      setSelectedTime([time, availableTimes[index + 1]]);
      setThirdTime(null);
    }
  };

  const handleThirdTimeSelect = (time) => {
    if (!selectedTime.includes(time)) {
      setThirdTime(time);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const caregiverRate = 8;
  const totalBookingHr = 0;
  const totalAmount = caregiverRate * totalBookingHr;

  return (
    <Box>
      <Box
        sx={{
          flex: "1 1 0%",
        }}
      >
        <Container
          sx={{
            maxWidth: "1200px",
            minWidth: "600px",
            paddingLeft: "24px",
            paddingRight: "24px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            boxSizing: "border-box",
            display: "block",
            marginTop: "30px",
            [theme.breakpoints.down("sm")]: {
              minWidth: "100%",
              paddingLeft: "16px",
              paddingRight: "16px",
            },
          }}
        >
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
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
            <Container
              sx={{
                paddingBottom: "24px",
                padding: "16px",
              }}
            >
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
                  <Grid
                    sx={{
                      boxSizing: "border-box",
                      display: "flex",
                      flexFlow: "wrap",
                      width: "100%",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                      flexDirection: isSmallScreen ? "column" : "row",
                    }}
                  >
                    <Grid
                      sx={{
                        flexBasis: isSmallScreen ? "100%" : "16.6667%",
                        WebkitBoxFlex: "0",
                        flexGrow: "0",
                        maxWidth: isSmallScreen ? "100%" : "16.6667%",
                        marginBottom: isSmallScreen ? "16px" : "0",
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            WebkitBoxPack: "center",
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          <img
                            src={caregiver.img}
                            alt={caregiver.name}
                            style={{
                              width: "144px",
                              hight: "144px",
                              borderRadius: "30px",
                              border: "3px solid rgb(252, 145, 85)",
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      sx={{
                        flexBasis: isSmallScreen ? "100%" : "66.6667%",
                        WebkitBoxFlex: "0",
                        flexGrow: "0",
                        maxWidth: isSmallScreen ? "100%" : "66.6667%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              margin: "0px",
                              fontWeight: "400",
                              lineHeight: "1.43",
                              fontSize: "14px",
                            }}
                          >
                            {caregiver.availability}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            sx={{
                              margin: "0px",
                              fontWeight: "700",
                              lineHeight: "1.5",
                              fontSize: "20px",
                              wordBreak: "break-word",
                            }}
                          >
                            {caregiver.name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              WebkitBoxAlign: "center",
                              alignItems: "center",
                              flexDirection: "row",
                              gap: "10px",
                            }}
                          >
                            <Typography
                              sx={{
                                margin: "0px",
                                fontWeight: "700",
                                lineHeight: "1.5",
                                fontSize: "1rem",
                              }}
                            >
                              {caregiver.age}
                            </Typography>
                          </Box>
                          <Divider
                            sx={{
                              margin: "0px",
                              flexShrink: "0",
                              borderWidth: "0px thin 0px 0px",
                              borderStyle: "solid",
                              borderColor: "rgba(0, 0, 0, 0.12)",
                              height: "auto",
                              alignSelf: "stretch",
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              WebkitBoxAlign: "center",
                              alignItems: "center",
                              flexDirection: "row",
                              gap: "10px",
                            }}
                          >
                            <Typography
                              sx={{
                                margin: "0px",
                                fontWeight: "700",
                                lineHeight: "1.5",
                                fontSize: "1rem",
                              }}
                            >
                              {caregiver.gender}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            WebkitBoxAlign: "end",
                            alignItems: "end",
                          }}
                        >
                          <img src={shield} alt={""} />
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
                    </Grid>
                    <Grid
                      sx={{
                        marginTop: isSmallScreen ? "16px" : "15px",
                        flexBasis: isSmallScreen ? "100%" : "16.6667%",
                        WebkitBoxFlex: "0",
                        flexGrow: "0",
                        maxWidth: isSmallScreen ? "100%" : "16.6667%",
                        boxSizing: "border-box",
                        margin: "0px",
                        flexDirection: "row",
                        display: "flex",
                        WebkitBoxPack: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={handleClickOpen}
                        sx={{
                          padding: "12px 15px",
                          borderRadius: "100px",
                          backgroundColor: "rgb(2, 79, 170)",
                          color: "rgb(225, 225, 225)",
                          display: "inline-flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          WebkitBoxPack: "center",
                          justifyContent: "center",
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
                          minWidth: "64px",
                          width: "157px",
                          transition:
                            "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        Book
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Paper>

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
                  marginTop: "20px",
                }}
              >
                <CardContent
                  sx={{
                    padding: "16px",
                    paddingBottom: "24px",
                  }}
                >
                  <Grid
                    sx={{
                      boxSizing: "border-box",
                      flexFlow: "column wrap",
                      width: "100%",
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <Grid
                      sx={{
                        flexBasis: "50%",
                        WebkitBoxFlex: "0",
                        flexGrow: "0",
                        maxWidth: "50%",
                        boxSizing: "border-box",
                        margin: "0px",
                        flexDirection: "row",
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.25rem",
                          lineHeight: "1.6",
                          fontWeight: "700",
                          margin: "0px",
                        }}
                      >
                        About
                      </Typography>
                      <Typography
                        sx={{
                          margin: "0px",
                          fontSize: "1.25rem",
                          lineHeight: "1.6",
                          fontWeight: "500",
                          wordBreak: "break-word",
                        }}
                      >
                        {caregiver.name}
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{
                        flexBasis: "50%",
                        WebkitBoxFlex: "0",
                        flexGrow: "0",
                        maxWidth: "50%",
                        boxSizing: "border-box",
                        display: "flex",
                        flexFlow: "wrap",
                        width: "100%",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          margin: "0px",
                          fontSize: "1.25rem",
                          lineHeight: "1.6",
                          fontWeight: "500",
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        <SvgIcon
                          sx={{
                            display: "inline-block",
                            flexShrink: "0",
                            fontSize: "1.5rem",
                            color: "rgb(152, 162, 179)",
                            transition:
                              "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          <AvTimerIcon></AvTimerIcon>
                        </SvgIcon>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "rgb(152, 162, 179)",
                          }}
                        >
                          Huorly Rate
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "rgb(16, 24, 40)",
                          }}
                        >
                          {caregiver.price}
                        </Typography>
                      </Typography>
                      <Divider
                        sx={{
                          margin: "0px",
                          flexShrink: "0",
                          borderWidth: "0px thin 0px 0px",
                          borderStyle: "solid",
                          borderColor: "rgba(0, 0, 0, 0.12)",
                          height: "auto",
                          alignSelf: "stretch",
                        }}
                      />
                      <Typography
                        sx={{
                          margin: "0px",
                          fontSize: "1rem",
                          lineHeight: "1.5",
                          fontWeight: "400",
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        <SvgIcon
                          sx={{
                            display: "inline-block",
                            flexShrink: "0",
                            fontSize: "1.5rem",
                            color: "rgb(152, 162, 179)",
                            transition:
                              "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          <MilitaryTechIcon></MilitaryTechIcon>
                        </SvgIcon>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "rgb(152, 162, 179)",
                          }}
                        >
                          Years exp.
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "rgb(16, 24, 40)",
                          }}
                        >
                          {caregiver.experience}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <SvgIcon
                        sx={{
                          display: "inline-block",
                          flexShrink: "0",
                          fontSize: "1.5rem",
                          color: "rgb(152, 162, 179)",
                          transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <TranslateIcon></TranslateIcon>
                      </SvgIcon>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "rgb(152, 162, 179)",
                        }}
                      >
                        Preffered Language
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "rgb(16, 24, 40)",
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        {caregiver.language}
                      </Typography>
                    </Box>
                  </Grid>
                </CardContent>
              </Paper>
              <Paper
                sx={{
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgba(0, 0, 0, 0.87)",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  padding: "10px",
                  marginTop: "20px",
                }}
              >
                <CardContent
                  sx={{
                    paddingButtom: "24px",
                    padding: "16px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      lineHeight: "1.6",
                      fontWeight: "700",
                      margin: "0px",
                    }}
                  >
                    Connect
                  </Typography>
                  <Box
                    sx={{
                      flexDirection: "row",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        WebkitBoxAlign: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <SvgIcon
                        sx={{
                          display: "inline-block",
                          flexShrink: "0",
                          fontSize: "1.5rem",
                          color: "rgb(152, 162, 179)",
                          transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <CalendarMonthIcon></CalendarMonthIcon>
                      </SvgIcon>
                      <Typography
                        sx={{
                          margin: "0px",
                          fontSize: "1rem",
                          lineHeight: "1.5",
                          fontWeight: "600",
                          color: "rgb(152, 162, 179)",
                        }}
                      >
                        Availability Dates
                      </Typography>
                      <Typography
                        sx={{
                          margin: "0px",
                          fontSize: "1rem",
                          fontWeight: "700",
                          color: "rgb(16, 24, 40)",
                          lineHeight: "1.5",
                        }}
                      >
                        {today}
                      </Typography>
                    </Box>
                    <Divider
                      sx={{
                        margin: "0px",
                        flexShrink: "0",
                        borderWidth: "0px thin 0px 0px",
                        borderStyle: "solid",
                        borderColor: "rgba(0, 0, 0, 0.12)",
                        height: "auto",
                        alignSelf: "stretch",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        WebkitBoxAlign: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <SvgIcon
                        sx={{
                          display: "inline-block",
                          flexShrink: "0",
                          fontSize: "1.5rem",
                          color: "rgb(152, 162, 179)",
                          transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <WatchLaterOutlinedIcon></WatchLaterOutlinedIcon>
                      </SvgIcon>
                      <Typography
                        sx={{
                          margin: "0px",
                          fontSize: "1rem",
                          lineHeight: "1.5",
                          fontWeight: "600",
                          color: "rgb(152, 162, 179)",
                        }}
                      >
                        Time
                      </Typography>
                      <Typography
                        sx={{
                          margin: "0px",
                          fontSize: "1rem",
                          fontWeight: "700",
                          color: "rgb(16, 24, 40)",
                          lineHeight: "1.5",
                        }}
                      >
                        No slot available today
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Paper>
              <Paper
                sx={{
                  backgroundColor: "rgb(255, 255, 255)",
                  color: "rgba(0, 0, 0, 0.87)",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  padding: "10px",
                  marginTop: "20px",
                }}
              >
                <CardContent
                  sx={{
                    paddingButtom: "24px",
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
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        lineHeight: "1.6",
                        fontWeight: "700",
                        margin: "0px",
                      }}
                    >
                      Reviews
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "24px",
                        lineHeight: "1.5",
                        fontWeight: "700",
                        margin: "0px",
                      }}
                    >
                      {caregiver.rating}
                    </Typography>
                    <Rating value={caregiver.rating} precision={0.5} readOnly />
                    <Typography
                      sx={{
                        margin: "0px",
                        fontSize: "1rem",
                        fontWeight: "700",
                        color: "rgb(16, 24, 40)",
                        lineHeight: "1.5",
                      }}
                    >
                      ({caregiver.reviews})
                    </Typography>
                  </Box>
                </CardContent>
              </Paper>
              <Grid
                sx={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexFlow: "wrap",
                  width: "calc(100% + 24px)",
                  marginLeft: "-24px",
                  marginBottom: "20px",
                }}
              >
                <Grid
                  sx={{
                    paddingLeft: "24px",
                    paddingTop: "24px",
                    flexBasis: "50%",
                    WebkitBoxFlex: "0",
                    flexGrow: "0",
                    maxWidth: "50%",
                  }}
                >
                  <Paper
                    sx={{
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgba(0, 0, 0, 0.87)",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      transition:
                        "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      borderRadius: "4px",
                      overflow: "hidden",
                      padding: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <CardContent
                      sx={{
                        paddingBottom: "24px",
                        padding: "16px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.25rem",
                          lineHeight: "1.6",
                          fontWeight: "700",
                          margin: "0px",
                        }}
                      >
                        Can work with special need
                      </Typography>
                      <Grid
                        sx={{
                          marginTop: "10px",
                          boxSizing: "border-box",
                          display: "flex",
                          flexFlow: "wrap",
                          width: "100%",
                        }}
                      >
                        <Grid
                          sx={{
                            flexBasis: "100%",
                            WebkitBoxFlex: "0",
                            flexGrow: "0",
                            maxWidth: "100%",
                            boxSizing: "border-box",
                            margin: "0px 0px 6px",
                            flexDirection: "row",
                            display: "flex",
                            WebkitBoxAlign: "center",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <img src={check} alt={""} />
                          <Typography
                            sx={{
                              margin: "0px",
                              fontSize: "1rem",
                              fontWeight: "700",
                              color: "rgb(16, 24, 40)",
                              lineHeight: "1.5",
                              wordBreak: "break-word",
                            }}
                          >
                            {caregiver.specialneeds}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Paper>
                </Grid>
                <Grid
                  sx={{
                    paddingLeft: "24px",
                    paddingTop: "24px",
                    flexBasis: "50%",
                    WebkitBoxFlex: "0",
                    flexGrow: "0",
                    maxWidth: "50%",
                  }}
                >
                  <Paper
                    sx={{
                      backgroundColor: "rgb(255, 255, 255)",
                      color: "rgba(0, 0, 0, 0.87)",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      transition:
                        "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                      borderRadius: "4px",
                      overflow: "hidden",
                      padding: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <CardContent
                      sx={{
                        paddingBottom: "24px",
                        padding: "16px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.25rem",
                          lineHeight: "1.6",
                          fontWeight: "700",
                          margin: "0px",
                        }}
                      >
                        Can work with special conditions
                      </Typography>
                      <Typography
                        sx={{
                          marginBottom: "6px",
                          wordBreak: "break-word",
                          color: "rgb(102, 112, 133)",
                          fontWeight: "bold",
                        }}
                      >
                        <List marker="circle">
                          <ListItem>{caregiver.conditions}</ListItem>
                        </List>
                      </Typography>
                    </CardContent>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Container>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
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
            display: "block",
          }}
        >
          <Typography
            sx={{
              margin: "0px",
              lineHeight: "1.6",
              color: "rgb(2, 79, 170)",
              fontSize: "18px",
              fontWeight: "700",
              padding: "10px",
            }}
          >
            Book Now?
          </Typography>
          <Typography
            sx={{
              margin: "0px",
              lineHeight: "1.5",
              color: "rgb(115, 120, 126)",
              padding: "10px",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            Select Patient for the care
          </Typography>
          <Paper
            sx={{
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgba(0, 0, 0, 0.87)",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              marginTop: "10px",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "4px",
              overflow: "hidden",
              paddingInline: "10px",
            }}
          >
            <CardContent
              sx={{
                paddingBottom: "24px",
                padding: "16px",
              }}
            >
              <Box
                sx={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  padding: "0px 10px",
                }}
              >
                <img
                  src={caregiver.img}
                  alt={""}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "20px",
                    border: "3px solid rgb(252, 145, 85)",
                    overflowClipMargin: "content-box",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "7px",
                  }}
                >
                  <Typography
                    sx={{
                      margin: "0px",
                      fontSize: "1rem",
                      lineHeight: "1.5",
                      fontWeight: "700",
                      wordBreak: "break-word",
                    }}
                  >
                    {caregiver.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Rating value={caregiver.rating} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({caregiver.reviews}) {caregiver.rating}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={shield} alt={""} />
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
              </Box>
            </CardContent>
          </Paper>
          <Typography
            sx={{
              margin: "20px 0px 0px",
              fontWeight: "400",
              fontSize: "1rem",
              lineHeight: "1.5",
            }}
          >
            Select family member
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              {familyMembers.map((member, index) => (
                <MenuItem key={index} value={member}>
                  {member}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              marginTop: "16px",
              display: "block",
            }}
          >
            <Typography
              sx={{
                margin: "0px",
                fontWeight: "500",
                fontSize: "1.25rem",
                lineHeight: "1.6",
              }}
            >
              Selected Member Details:
            </Typography>
            <Typography
              sx={{
                margin: "0px",
                fontWeight: "400",
                fontSize: "1rem",
                lineHeight: "1.5",
              }}
            ></Typography>
          </Box>
          <form>
            <Paper
              sx={{
                backgroundColor: "rgb(255, 255, 255)",
                color: "rgba(0, 0, 0, 0.87)",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                marginTop: "10px",
                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: "4px",
                overflow: "visible",
              }}
            >
              <CardContent
                sx={{
                  paddingBottom: "24px",
                  padding: "16px",
                  display: "block",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "rgba(0, 0, 0, 0.6)",
                      fontWeight: "400",
                      fontSize: "1rem",
                      lineHeight: "1.4375em",
                      padding: "0px",
                      position: "relative",
                    }}
                  >
                    Appointment
                  </Typography>
                  <Typography sx={{ mt: 2 }}>Select Day</Typography>
                  <ToggleButtonGroup
                    value={selectedDay}
                    exclusive
                    onChange={handleDayChange}
                    sx={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {availableDays.map((day) => (
                      <ToggleButton key={day} value={day}>
                        {day}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>
                <Typography sx={{ mt: 2 }}>Select Time Slot</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={
                        selectedTime.includes(time) || thirdTime === time
                          ? "contained"
                          : "outlined"
                      }
                      color="primary"
                      onClick={() => {
                        if (selectedTime.length === 0) {
                          handleTimeSelect(time);
                        } else if (selectedTime.length === 2) {
                          handleThirdTimeSelect(time);
                        }
                      }}
                      disabled={selectedTime.includes(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </Box>

                {selectedTime.length > 0 && (
                  <Typography
                    sx={{ mt: 2, fontWeight: "bold", color: "green" }}
                  >
                    Selected Time Slot: {selectedTime[0]} to{" "}
                    {thirdTime || selectedTime[1]}
                  </Typography>
                )}
              </CardContent>
            </Paper>
            <Grid
              sx={{
                boxSizing: "border-box",
                display: "flex",
                flexFlow: "wrap",
                width: "calc(100% + 16px)",
                marginLeft: "-16px",
                marginTop: "15px",
              }}
            >
              <Grid
                sx={{
                  paddingLeft: "16px",
                  paddingTop: "16px",
                  flexBasis: "100%",
                  WebkitBoxFlex: "0",
                  flexGrow: "0",
                  maxWidth: "100%",
                }}
              >
                <Button
                  onClick={handleClickOpen1}
                  sx={{
                    width: "100%",
                    padding: "12px 15px",
                    fontWeight: "bold",
                    borderRadius: "100px",
                    backgroundColor: "rgb(2, 79, 170)",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  continue
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open1}
        onClose={handleClose1}
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
            display: "block",
          }}
        >
          <Typography
            sx={{
              margin: "0px",
              lineHeight: "1.6",
              color: "rgb(52, 64, 84)",
              padding: "16px 24px 16px 0px",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Caregiver
          </Typography>
          <Paper
            sx={{
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgba(0, 0, 0, 0.87)",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              marginTop: "10px",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "4px",
              overflow: "hidden",
              paddingInline: "10px",
            }}
          >
            <CardContent
              sx={{
                paddingBottom: "24px",
                padding: "16px",
              }}
            >
              <Box
                sx={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  padding: "0px 10px",
                }}
              >
                <img
                  src={caregiver.img}
                  alt={""}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "20px",
                    border: "3px solid rgb(252, 145, 85)",
                    overflowClipMargin: "content-box",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "7px",
                  }}
                >
                  <Typography
                    sx={{
                      margin: "0px",
                      fontSize: "1rem",
                      lineHeight: "1.5",
                      fontWeight: "700",
                      wordBreak: "break-word",
                    }}
                  >
                    {caregiver.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Rating value={caregiver.rating} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({caregiver.reviews}) {caregiver.rating}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={shield} alt={""} />
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
              </Box>
            </CardContent>
          </Paper>
          <Paper
            sx={{
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgba(0, 0, 0, 0.87)",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              marginTop: "10px",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "4px",
              overflow: "hidden",
              paddingInline: "10px",
            }}
          >
            <CardContent
              sx={{
                padding: "16px",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexFlow: "wrap",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <Grid
                  sx={{
                    flexBasis: "50%",
                    WebkitBoxFlex: "0",
                    flexGrow: "0",
                    maxWidth: "50%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px 0px 4px",
                        fontWeight: "700",
                        lineHeight: "1.5",
                        fontSize: "20px",
                      }}
                    >
                      Booking Date
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "8px",
                        flexDirection: "column",
                      }}
                    >
                      <Typography>{getFormattedDate(selectedDay)}</Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  sx={{
                    flexBasis: "50%",
                    WebkitBoxFlex: "0",
                    flexGrow: "0",
                    maxWidth: "50%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "0px 0px 4px",
                        fontWeight: "700",
                        lineHeight: "1.5",
                        fontSize: "20px",
                      }}
                    >
                      Booking Time
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "8px",
                        flexDirection: "column",
                      }}
                    >
                      <Typography>
                        {selectedTime[0]} to {thirdTime || selectedTime[1]}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>

          <Paper
            sx={{
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgba(0, 0, 0, 0.87)",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              marginTop: "10px",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "4px",
              overflow: "hidden",
              paddingInline: "10px",
            }}
          >
            <CardContent
              sx={{
                padding: "16px",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexFlow: "wrap",
                  boxSizing: "border-box",
                  width: "100%",
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
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      marginBottom: "16px",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "4px",
                      }}
                    >
                      Booked For
                    </Box>
                    <Typography
                      sx={{
                        margin: "0px",
                        lineHeight: "1.5",
                        color: "rgb(16, 24, 40)",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      Kamal Prajapati
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      WebkitBoxAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      sx={{
                        flexBasis: "50%",
                        WebkitBoxFlex: "0",
                        flexGrow: "0",
                        maxWidth: "50%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginBottom: "4px",
                          }}
                        >
                          Age
                        </Box>
                        <Typography
                          sx={{
                            margin: "0px",
                            lineHeight: "1.5",
                            color: "rgb(16, 24, 40)",
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                        >
                          22 years
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      sx={{
                        flexBasis: "50%",
                        WebkitBoxFlex: "0",
                        flexGrow: "0",
                        maxWidth: "50%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginBottom: "4px",
                          }}
                        >
                          Gender
                        </Box>
                        <Typography
                          sx={{
                            margin: "0px",
                            lineHeight: "1.5",
                            color: "rgb(16, 24, 40)",
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                        >
                          Male
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>

          <Paper
            sx={{
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgba(0, 0, 0, 0.87)",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              marginTop: "10px",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "4px",
              overflow: "hidden",
              paddingInline: "10px",
            }}
          >
            <CardContent
              sx={{
                padding: "16px",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexFlow: "wrap",
                  boxSizing: "border-box",
                  width: "100%",
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
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Total cost
                  </Typography>
                  <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                    <Grid item>
                      <Typography variant="body2">Number of patient</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">1</Typography>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                    <Grid item>
                      <Typography variant="body2">Caregiver rate</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">${caregiverRate}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                    <Grid item>
                      <Typography variant="body2">Total booking hr</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {isNaN(totalBookingHr) ? "NaN" : totalBookingHr}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Total Amount
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" sx={{ fontWeight: "bold" ,color:"rgb(2, 79, 170)" }}>
                        ${totalAmount || 4} 
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>

          <Grid spacing xs={2}
          sx={{
            boxSizing: "border-box",
            display: "flex",
            flexFlow: "wrap",
            width: "calc(100% + 16px)",
            marginLeft: "-16px",
            marginTop: "15px",
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
              <Button
              onClick={handleClose1}
              sx={{
                padding : "12px 15px",
                fontWeight: "bold",
                border : "1px solid rgb(2, 79, 170)",
                borderRadius: "100px",
                color: "rgb(2, 79, 170)",
                backgroundColor: "rgb(255, 255, 255)",
                width: "100%",
              }}
              >
                Cancle
              </Button>
            </Grid>
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
              <Button
              sx={{
                padding : "12px 15px",
                fontWeight: "bold",
                borderRadius: "100px",
                color: "rgb(255, 255, 255)",
                backgroundColor: "rgb( 2, 79, 170)",
                width: "100%",
              }}
              >
                Book
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CaregiverProfile;
