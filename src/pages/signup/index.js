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
import { Link } from "react-router-dom";

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
  const [mobile, setMobile] = useState("");
  const initialValues = {
    fullname: "",
    dob: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    terms: false,
  };

  const handleMobileChange = (value) => {
    setMobile(value);
    setMobile("mobile", value);
  };

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
    alert("Signup successful!");
    reset(initialValues);
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
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                align="left"
                color="textSecondary"
              >
                Full Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="fullName"
                {...register("fullname")}
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
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
                Date Of Birth
              </Typography>
              <TextField
                fullWidth
                name="dob"
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
                  sx: {
                    [`& fieldset`]: { borderRadius: 5 },
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

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
                Phone Number
              </Typography>
              <PhoneInput
                fullWidth
                name="mobile"
                country={"in"}
                InputProps={{
                  name: "mobile",
                  required: true,
                }}
                inputStyle={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "4px",
                  borderColor: errors.mobile ? "red" : "#ced4da",
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
              <Typography
                variant="subtitle1"
                align="left"
                color="textSecondary"
              >
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                name="confirmPassword"
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
                  sx: {
                    [`& fieldset`]: { borderRadius: 5 },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                margin="normal"
                error={!!errors.gender}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender selection is required" }}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="others"
                        control={<Radio />}
                        label="Others"
                      />
                    </RadioGroup>
                  )}
                />
                <Typography variant="caption" color="error">
                  {errors.gender?.message}
                </Typography>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Checkbox
                name="terms"
                {...register("terms")}
                color="primary"
                error={!!errors.terms}
              ></Checkbox>
              <Typography variant=" ">
                By continuing you agree to our{" "}
                <Link to="/termsandcondition">
                  <Button variant="text" color="primary">
                    Terms and Conditions
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
                Sign Up
              </Button>
            </Grid>

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
