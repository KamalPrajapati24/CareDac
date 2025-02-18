import React from "react";
import BackgroundImage from "../../images/Bg.svg";
import {
  Box,
  Container,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function ServiceNeed() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const type = state?.type;

  const onSubmit = () => {
    if (type === "MySelf") {
      navigate("/patient-details");
    } else {
      navigate("/member-details");
    }
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
            Service I need
          </Typography>
          <Typography variant="subtitle1" align="left" color="textSecondary">
            Enter patient details
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <form onSubmit={onSubmit}>
            <Box
              sx={{
                marginBottom: "24px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Personals care"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Domestic Assistance"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Social Support & Community Participation"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Specialist Care"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Out and About Transport"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Relief Respite Care"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Coaching & counselling"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Disability Product"
                />
              </FormGroup>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: 15 }}
            >
              Next
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default ServiceNeed;
