import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Box, Button, Typography, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../images/Bg.svg";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Handle OTP change
  const handleOtpChange = (otp) => {
    setOtp(otp);
    if (error) setError(""); // Clear error on change
  };

  // Validate OTP
  const isValidOtp = (otp) => /^[0-9]{4}$/.test(otp);

  // Submit OTP for verification
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidOtp(otp)) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }
    console.log("Entered OTP:", otp);
    alert("OTP Verified Successfully!");
    navigate("/resetpassword");
  };

  const renderInput = (props) => (
    <input
      {...props}
      style={{
        width: "50px",
        height: "50px",
        margin: "0 5px",
        fontSize: "20px",
        textAlign: "center",
        borderRadius: "8px",
        border: error ? "1px solid red" : "1px solid #ccc",
      }}
    />
  );

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ padding: 30, maxWidth: 500, margin: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          OTP Verification
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Enter the 6-digit OTP sent to your email.
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                align="center"
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Enter OTP
              </Typography>
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={4}
                renderInput={renderInput}
                containerStyle={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              />
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mt: 1 }}
                >
                  {error}
                </Typography>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ borderRadius: 15 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default OTPVerification;
