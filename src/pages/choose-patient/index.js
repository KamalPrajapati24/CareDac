import React from "react";
import BackgroundImage from "../../images/Bg.svg";
import { Box, Typography, Container, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ChoosePatient() {
  const arr = ["MySelf", "MyChild", "MyPartner", "MyClient", "Other"];
  const navigate = useNavigate();

  const handleNavigation = (array) => {
    navigate(`/patient-info/?type=${array}`);
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
        <Box
          sx={{
            padding: 3,
            maxWidth: 500,
            margin: "auto",
          }}
        >
          <Typography variant="h4" fontWeight="bold" align="left">
            Who need care?
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            color="textSecondary"
            gutterBottom
          >
            Enter patient details
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Box sx={{ width: "100%", maxWidth: 500 }}>
            {arr.map((array, index) => (
              <Box
                key={index}
                sx={{
                  padding: 2,
                  textAlign: "center",
                  border: "2px solid #ccc",
                  fontSize: "25px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  "&:hover": {
                    backgroundColor: "#ffcba4",
                  },
                }}
                onClick={() => handleNavigation(array)}
              >
                {array}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ChoosePatient;
