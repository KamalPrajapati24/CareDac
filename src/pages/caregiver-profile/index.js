import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  TextField,
  InputAdornment,
} from "@mui/material";
import shield from "../../images/shield.svg";
import check from "../../images/tick.svg";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TranslateIcon from "@mui/icons-material/Translate";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useNavigate } from "react-router-dom";

function CaregiverProfile() {
  const location = useLocation();
  const { id } = useParams();
  const caregiver = location.state?.caregiver;
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    "10:00Am - 12:00Pm",
    "12:00Pm - 02:00Pm",
    "03:00Pm - 05:00Pm",
    "05:00Pm - 07:00Pm",
  ];

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

  const handleConfirm = () => {
    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }
    navigate("/appointment", {
      state: { date: format(selectedDate, "dd/MM/yyyy"), time: selectedTime },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                          <img src={shield} />
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
                          fontWeight: "bold",
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
                          <img src={check} />
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
                    <img src={shield} />
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

                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <TextField
                        sx={{
                          mt: 2,
                          fontWeight: "500",
                          fontSize: "1.2rem",
                          lineHeight: "1.5em",
                          color: "rgba(0, 0, 0, 0.87)",
                          border: "1px solid rgb(71, 84, 103)",
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        value={format(selectedDate, "dd/MM/yyyy")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayOutlinedIcon color="action" />
                            </InputAdornment>
                          ),
                          sx: { borderRadius: 2 },
                        }}
                      />
                    }
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      mt: 2,
                      color: "rgba(0, 0, 0, 0.6)",
                      fontWeight: "400",
                      fontSize: "1rem",
                      lineHeight: "1.4375em",
                      padding: "0px",
                      position: "relative",
                    }}
                  >
                    Booking Time
                  </Typography>

                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    {timeSlots.map((time, index) => (
                      <Grid item key={index}>
                        <Button
                          fullWidth
                          onClick={() => setSelectedTime(time)}
                          sx={{
                            backgroundColor: "rgb(255, 255, 255)",
                            color: "rgba(0, 0, 0, 0.87)",
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            textTransform: "none",
                            borderRadius: "10px",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          }}
                        >
                          {time}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
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
                  onClick={handleConfirm}
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
    </Box>
  );
}

export default CaregiverProfile;
