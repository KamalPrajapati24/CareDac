import React, { useState } from "react";
import {
  Box,
  Paper,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Example = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    "10:00Am - 12:00Pm",
    "12:00Pm - 02:00Pm",
    "03:00Pm - 05:00Pm",
    "05:00Pm - 07:00Pm",
  ];

  const handleConfirm = () => {
    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }
    navigate("/appointment", {
      state: { date: format(selectedDate, "dd/MM/yyyy"), time: selectedTime },
    });
  };

  return (
    <form>
      <Paper
        sx={{
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          marginTop: "10px",
          borderRadius: "4px",
        }}
      >
        <CardContent sx={{ padding: "16px" }}>
          <Box>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: "1rem" }}>
              Appointment Date
            </Typography>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={
                <TextField
                  sx={{ mt: 2, width: "100%" }}
                  value={format(selectedDate, "dd/MM/yyyy")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              }
            />
          </Box>
          <Box>
            <Typography sx={{ mt: 2, color: "rgba(0, 0, 0, 0.6)" }}>
              Booking Time
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {timeSlots.map((time, index) => (
                <Grid item key={index}>
                  <Button
                    onClick={() => setSelectedTime(time)}
                    sx={{
                      backgroundColor:
                        selectedTime === time ? "blue" : "white",
                      color: selectedTime === time ? "white" : "black",
                      fontSize: "1.2rem",
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            sx={{ mt: 2, width: "100%" }}
          >
            Confirm Appointment
          </Button>
        </CardContent>
      </Paper>
    </form>
  );
};

export default Example;
