import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Box, Typography, TextField, InputAdornment } from "@mui/material";

export default function CustomDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 1, 17)); // 17 Feb 2025

  return (
    <Box sx={{ padding: 2, width: 300, borderRadius: 2, border: "1px solid #ddd", boxShadow: 1 }}>
      {/* Label */}
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
        Appointment
      </Typography>

      {/* Custom Styled Date Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        customInput={
          <TextField
            fullWidth
            variant="outlined"
            size="small"
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
  );
}
