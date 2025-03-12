import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import BackgroundImage from "../../images/Bg.svg";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  InputAdornment,
  Divider,
} from "@mui/material";

import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  dob: yup.string().required("Date of birth is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Valid Email Address"),
  mobile: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender selection is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

function Signup() {
  const navigate = useNavigate();

  const defaultValues = {
    fullname: "",
    dob: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    terms: false,
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    alert("Signup successful!");
    reset(defaultValues);
    navigate("/choose-patient");
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
      <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
        <Typography variant="h4" align="left" gutterBottom>
          Sign up
        </Typography>
        <Typography variant="subtitle1" align="left" color="textSecondary">
          Welcome to CareDac
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {/* Full Name */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left" color="textSecondary">
                Full Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                {...register("fullname")}
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  sx: { "& fieldset": { borderRadius: 5 } },
                }}
              />
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left" color="textSecondary">
                Date Of Birth
              </Typography>
              <TextField
                fullWidth
                type="date"
                {...register("dob")}
                error={!!errors.dob}
                helperText={errors.dob?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                  sx: { "& fieldset": { borderRadius: 5 } },
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left" color="textSecondary">
                Email
              </Typography>
              <TextField
                fullWidth
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
                  sx: { "& fieldset": { borderRadius: 5 } },
                }}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left" color="textSecondary">
                Phone Number
              </Typography>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    country={"us"}
                    value={field.value}
                    onChange={field.onChange}
                    inputStyle={{
                      width: "100%",
                      height: "56px",
                      fontSize: "16px",
                    }}
                    containerStyle={{ width: "100%" }}
                  />
                )}
              />
              {errors.mobile && (
                <Typography variant="caption" color="error">
                  {errors.mobile.message}
                </Typography>
              )}
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left" color="textSecondary">
                Password
              </Typography>
              <TextField
                fullWidth
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
                  sx: { "& fieldset": { borderRadius: 5 } },
                }}
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left" color="textSecondary">
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  sx: { "& fieldset": { borderRadius: 5 } },
                }}
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12}>
              <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
                <FormLabel component="legend">Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender selection is required" }}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="others" control={<Radio />} label="Others" />
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <Typography variant="caption" color="error">
                    {errors.gender.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Terms & Conditions */}
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox {...register("terms")} color="primary" />
              <Typography>
                By continuing you agree to our{" "}
                <Link to="/termsandcondition">
                  <Button variant="text" color="primary">
                    Terms and Conditions
                  </Button>
                </Link>
              </Typography>
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
                Sign Up
              </Button>
            </Grid>

            {/* Sign In Link */}
            <Grid item xs={12}>
              <Typography align="center">
                Already have an account?{" "}
                <Link to="/signin">
                  <Button variant="text" color="primary">
                    Sign In
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

export default Signup;