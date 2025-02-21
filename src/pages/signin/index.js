import React from "react";
import BackgroundImage from "../../images/Bg.svg";
import {
  TextField,
  Button,
  Grid,
  Divider,
  Typography,
  InputAdornment,
  Box,
} from "@mui/material";

import { Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Valid Email Address"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Signin() {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    initialValues,
  });

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    alert("Signin successful!");
    reset(initialValues);
    navigate("/homepage");
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
          Sign In
        </Typography>
        <Typography
          variant="subtitle1"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Welcome to CareDac
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
              <Typography
                variant="subtitle1"
                align="left"
                color="textSecondary"
              >
                Password
              </Typography>
              <TextField
                fullWidth
                name="password"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    [`& fieldset`]: { borderRadius: 5 },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography align="center">
                {" "}
                <Link to="/forgotpassword">
                  <Button variant="text" color="primary">
                    Forgot Password?
                  </Button>
                </Link>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ borderRadius: 15 }}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Don't have an account?{" "}
                <Link to="/signup">
                  <Button variant="text" color="primary">
                    Signup
                  </Button>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default Signin;
