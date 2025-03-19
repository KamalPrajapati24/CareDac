import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../images/cardac-logo 1.png";
import {
  Paper,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
 

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect Responsive Mode
  const checkResponsiveMode = () => {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent;
    const isEmulated =
      userAgent.includes("Mobile") ||
      userAgent.includes("Android") ||
      userAgent.includes("iPhone");

    if (width < 900 && isEmulated) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkResponsiveMode();
    window.addEventListener("resize", checkResponsiveMode);
    return () => window.removeEventListener("resize", checkResponsiveMode);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  

  const menuItems = [
    { text: "Home", path: "/homepage" },
    { text: "Appointments", path: "/appointment" },
    { text: "Payments", path: "/payment-history" },
  ];

  return (
    <Paper
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
        width: "100%",
        position: "static",
        backgroundColor: "rgb(255, 255, 255)",
      }}
    >
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <img
              src={Image}
              alt="Logo"
              style={{
                height: 40,
                marginRight: 10,
                maxWidth: "100%",
                border: "1px solid rgb(152, 162, 179)",
                borderRadius: "10px",
              }}
            />
            {!isMobile && (
              <>
                <Typography variant="h6" color="inherit">
                  Your Location
                </Typography>
                <IconButton color="inherit">
                  <LocationOnIcon />
                </IconButton>
              </>
            )}
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              {menuItems.map((item) => (
                <Link to={item.path} key={item.text}>
                  <Button
                    sx={{ color: "black", fontSize: "18px", fontWeight: "700" }}
                  >
                    {item.text}
                  </Button>
                </Link>
              ))}
              <Box sx={{ textAlign: "left", padding: 2 }}>
                <Button
                  component={Link}
                  to="/user-profile"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none", borderRadius: 20}}
                >
                  User
                </Button>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ textAlign: "left", padding: 2 }}>
            <Button
              component={Link}
              to="/user-profile"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 20}}
            >
              User
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Paper>
  );
}

export default Navbar;
