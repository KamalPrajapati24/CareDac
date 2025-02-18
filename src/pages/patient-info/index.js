import React from "react";
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
  Divider,
  Container,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate,useLocation } from "react-router-dom";

const validationSchema = yup.object({
  age: yup
    .number()
    .typeError("Invalid age")
    .positive("Invalid age")
    .integer("Invalid age"),

  postcode: yup.string().matches(/^\d{6}$/, "Invalid postcode, must be number"),
});

function PatientInfo() {
  const initialValues = {
    age: "",
    postcode: "",
  };
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

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
    console.log(data);
    reset(initialValues);
    navigate("/service-need", { state: { type } });
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
      <Container
        sx={{
          width: "100%",
          boxSizing: "border-box",
          display: "block",
        }}
      >
        <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
          <Typography variant="h4" align="left" gutterBottom>
            Info
          </Typography>
          <Typography variant="subtitle1" align="left" color="textSecondary">
            Enter patient details
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
                  Age
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="age"
                  placeholder="Enter Age"
                  {...register("age")}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                  InputProps={{
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
                  Postcode
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="postcode"
                  placeholder="Enter Postcode"
                  {...register("postcode")}
                  error={!!errors.postcode}
                  helperText={errors.postcode?.message}
                  InputProps={{
                    sx: {
                      [`& fieldset`]: { borderRadius: 5 },
                    },
                  }}
                />
              </Grid>

              <Grid item sx={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Need healp to
                  </FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Find a provider"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Be ready for plane"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Apply for NDIS"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ borderRadius: 15 }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default PatientInfo;
