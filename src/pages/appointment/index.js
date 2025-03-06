import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Container,
  Paper,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import person1 from "../../images/p1.png";
import person2 from "../../images/p2.png";
import person3 from "../../images/p3.png";

const caregiverData = [
  {
    id: 101,
    name: "Juliya",
    img: person1,
    bookingTime: "Jan 01, 2025 1:55 pm",
    isCurrent: false,
  },
  {
    id: 102,
    name: "Jack",
    img: person2,
    bookingTime: "Dec 17, 2024 1:55 am",
    isCurrent: false,
  },
  {
    id: 103,
    name: "DJ",
    img: person3,
    bookingTime: "Nov 07, 2024 11:11 am",
    isCurrent: false,
  },
];

const AppointmentPage = () => {
  const currentBooking = caregiverData.find((item) => item.isCurrent);
  const previousBookings = caregiverData.filter((item) => !item.isCurrent);

  return (
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
        <Box sx={{ maxWidth: 1000, margin: "auto", padding: 2 }}>
          {currentBooking && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Current Booking
              </Typography>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  mb: 2,
                }}
              >
                <Avatar
                  src={currentBooking.img}
                  sx={{ width: 50, height: 50, mr: 2 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {currentBooking.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {currentBooking.bookingTime}
                  </Typography>
                </CardContent>
                <Box display="flex" gap={1}>
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      boxShadow: 1,
                      p: 1,
                    }}
                  >
                    <AccessTimeIcon />
                    <Typography
                      variant="Caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {" "}
                      2hr
                    </Typography>
                  </Paper>
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      boxShadow: 1,
                      p: 1,
                    }}
                  >
                    <CallIcon />
                    <Typography
                      variant="Caption"
                      sx={{ color: "text.secondary" }}
                    >
                      call
                    </Typography>
                  </Paper>
                </Box>
              </Card>
            </Box>
          )}

          <Typography 
          sx={{
            fontWeight:"700",
            fontSize:"20px",
            lineHeight:"30px",
            margin:"0px",
          }}
          >
            Previous Booking
          </Typography>
          {previousBookings.map((booking) => (
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
                  key={booking.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px",
                  }}
                >
                  <Avatar
                    src={booking.img}
                    sx={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "12px",
                      border: "3px solid rgb(252, 145, 85)",
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {booking.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {booking.bookingTime}
                    </Typography>
                  </CardContent>
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      boxShadow: 1,
                      p: 1,
                    }}
                  >
                    <CallIcon />
                    <Typography
                      variant="Caption"
                      sx={{ color: "text.secondary" }}
                    >
                      call
                    </Typography>
                  </Paper>
                </CardContent>
              </Paper>
              
            </Container>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default AppointmentPage;
