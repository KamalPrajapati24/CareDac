import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  useTheme,
  Rating,
  Grid,
  CardContent,
  SvgIcon,
  Divider,
} from "@mui/material";
import shield from "../../images/shield.svg";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TranslateIcon from "@mui/icons-material/Translate";

function PreviousAppointmentDetails() {
  const location = useLocation();
  const caregiver = location.state?.caregiver;
  const theme = useTheme();

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
                maxWidth: "1200px",
                minWidth: "600px",
                padding: "24px",
                width: "100%",
                marginTop: "30px",
              }}
            >
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  borderRadius: "4px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                {/* Caregiver Image */}
                <Box
                  sx={{
                    width: "144px",
                    height: "144px",
                    borderRadius: "30px",
                    overflow: "hidden",
                    border: "3px solid rgb(252, 145, 85)",
                    marginRight: "20px",
                  }}
                >
                  <img
                    src={caregiver.img}
                    alt={caregiver.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Caregiver Details */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {caregiver.shift}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {caregiver.name}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Rating value={caregiver.rating} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      ({caregiver.rating})
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "8px",
                    }}
                  >
                    <img src={shield} alt="Shield Icon" />
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: "8px",
                        color: "rgb(102, 112, 133)",
                        fontWeight: 700,
                      }}
                    >
                      Background check done
                    </Typography>
                  </Box>
                </Box>

                {/* Rebook Button & Payment Section */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgb(2, 79, 170)",
                      color: "#fff",
                      borderRadius: "100px",
                      padding: "10px 30px",
                    }}
                  >
                    Rebook
                  </Button>
                  <Paper
                    sx={{
                      padding: "10px 20px",
                      border: "2px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <Typography sx={{ fontWeight: 700 }}>Payment</Typography>
                    <Typography>$4,584.43</Typography>
                  </Paper>
                </Box>
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
                  <Grid container spacing={2} alignItems="center">
                    {/* Booking Date */}
                    <Grid item>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 2,
                          boxShadow: 1,
                          width: "164px",
                          textAlign: "center",
                        }}
                      >
                        <CardContent>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            Booking date
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "500",
                              fontSize: "16px",
                              lineHeight: "20px",
                            }}
                          >
                            {caregiver.bookingdate}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Grid>

                    {/* Booking Time */}
                    <Grid item>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 2,
                          boxShadow: 1,
                          width: "170   px",
                          textAlign: "center",
                        }}
                      >
                        <CardContent>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            Booking Time
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "500",
                              fontSize: "16px",
                              lineHeight: "20px",
                            }}
                          >
                            {caregiver.bookingtime}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Grid>

                    {/* Booked for */}
                    <Grid item>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 2,
                          boxShadow: 1,
                          width: "156px",
                          textAlign: "center",
                        }}
                      >
                        <CardContent>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            Booked for
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "500",
                              fontSize: "16px",
                              lineHeight: "20px",
                            }}
                          >
                            {caregiver.bookedfor}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Grid>

                    {/* Age */}
                    <Grid item>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 2,
                          boxShadow: 1,
                          width: "50px",
                          textAlign: "center",
                        }}
                      >
                        <CardContent>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "20px",
                              lineHeight: "30px",
                              textAlign: "center",
                            }}
                          >
                            Age
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "500",
                              fontSize: "16px",
                              lineHeight: "20px",
                            }}
                          >
                            {caregiver.age}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Grid>

                    {/* Gender */}
                    <Grid item>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 2,
                          boxShadow: 1,
                          width: "111px",
                          textAlign: "center",
                        }}
                      >
                        <CardContent>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            Gender
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "500",
                              fontSize: "16px",
                              lineHeight: "20px",
                            }}
                          >
                            {caregiver.gender}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Grid>

                    {/* Amount */}
                    <Grid item>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 2,
                          boxShadow: 1,
                          textAlign: "center",
                        }}
                      >
                        <CardContent>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            Amount
                          </Typography>
                          <Typography
                            color="error"
                            sx={{
                              fontWeight: "500",
                              fontSize: "16px",
                              lineHeight: "20px",
                            }}
                          >
                            {caregiver.amount}
                          </Typography>
                        </CardContent>
                      </Box>
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
                      item
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
                            transition:
                              "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
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
                    <Grid>
                      <Typography
                        sx={{
                          margin: "0px",
                          fontSize: "1.25rem",
                          lineHeight: "1.6",
                          fontWeight: "700",
                        }}
                      >
                        Description
                      </Typography>
                      <Typography
                        sx={{
                          margin: "0px",
                          fontSize: "16px",
                          lineHeight: "24px",
                          fontWeight: "400",
                          wordBreak: "break-word",
                          color: "rgba(52, 64, 84, 1)",
                        }}
                      >
                        {caregiver.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Paper>
            </Container>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default PreviousAppointmentDetails;
