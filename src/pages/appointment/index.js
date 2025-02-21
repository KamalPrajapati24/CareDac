import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper, CardContent, Typography, Button } from "@mui/material";

const AppointmentPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const { date, times } = state || { date: "No date selected", times: [] };

  return (
    <Paper
      sx={{
        backgroundColor: "rgb(255, 255, 255)",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        marginTop: "10px",
        padding: "16px",
        borderRadius: "4px",
      }}
    >
      <CardContent>
        <Typography variant="h5">Appointment Confirmation</Typography>
        {date && times ? (
          <>
            <Typography sx={{ mt: 2 }}>
              <strong>Date:</strong> {date}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Time:</strong>{" "}
              {times.length > 0 ? times.join(" to ") : "No time selected"}
            </Typography>
          </>
        ) : (
          <Typography sx={{ mt: 2, color: "red" }}>
            No appointment selected.
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/homepage")}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </CardContent>
    </Paper>
  );
};

export default AppointmentPage;
