import React from "react";
import BackgroundImage from "../../images/Bg.svg";

import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  Box,
  Divider,
} from "@mui/material";

import { Email as EmailIcon } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Valid Email Address"),
});

function ForgotPassword() {
  const initialValues = {
    email: "",
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    initialValues,
  });

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    reset(initialValues);
    navigate("/otpverification");
  };

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
        <Typography variant="h4" align="left" gutterBottom>
          Forgot Password
        </Typography>
        <Typography
          variant="subtitle1"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Enter your Email for OTP verification to reset your password
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
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
                name="email"
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
                  sx: {
                    [`& fieldset`]: { borderRadius: 5 },
                  },
                }}
              />
            </Grid>

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

export default ForgotPassword;
