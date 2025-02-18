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
  Paper,
} from "@mui/material";

import { Lock as LockIcon } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
});

function ResetPassword() {
  const initialValues = {
    password: "",
    confirmPassword: "",
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
    console.log("Password reset", data);
    reset(initialValues);
    alert("Password reset successful!");
    navigate("/signin");
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
          Reset your Password over here
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
                Reset Password
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

export default ResetPassword;
