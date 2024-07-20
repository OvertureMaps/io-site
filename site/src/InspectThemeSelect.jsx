import React from "react";
import { format } from "./util/TextUtil";
import { themes } from "./Layers";
import {
  Paper,
  Box,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import "./InspectThemeSelect.css";
import PropTypes from "prop-types";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import PlaceIcon from "@mui/icons-material/Place";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LandscapeIcon from "@mui/icons-material/Landscape";
import BorderVerticalIcon from "@mui/icons-material/BorderVertical";

const icons = [
  {
    theme: "divisions",
    icon: <BorderVerticalIcon />,
  },
  {
    theme: "base",
    icon: <LandscapeIcon />,
  },
  {
    theme: "transportation",
    icon: <AddRoadIcon />,
  },
  {
    theme: "buildings",
    icon: <ApartmentIcon />,
  },
  {
    theme: "places",
    icon: <PlaceIcon />,
  },
  {
    theme: "addresses",
    icon: <AlternateEmailIcon />,
  },
];

const InspectThemeSelect = ({ activeTheme, setActiveTheme }) => {
  return (
    <>
      <Paper
        className="mobile-theme-select"
        sx={{
          position: "fixed",
          width: window.innerWidth,
          overflow: "scroll",
          bottom: 0,
          left: 0,
          right: 0,
          display: { xl: "none", lg: "none", md: "none" },
        }}
        elevation={3}
      >
        <BottomNavigation
          className="mobile-theme-select-nav"
          showLabels
          value={activeTheme}
          onChange={(event, newValue) => {
            setActiveTheme(newValue);
          }}
        >
          {icons.map((t) => (
            <BottomNavigationAction
              value={t.theme}
              label={format(t.theme)}
              icon={t.icon}
            />
          ))}
        </BottomNavigation>
      </Paper>
      <Paper
        className="desktop-theme-select"
        sx={{
          display: {
            xl: "fixed",
            lg: "fixed",
            md: "fixed",
            sm: "none",
            xs: "none",
          },
        }}
      >
        <FormControl>
          <RadioGroup
            row
            value={activeTheme}
            onChange={(evt) => setActiveTheme(evt.target.value)}
          >
            {themes.map((t) => (
              <FormControlLabel
                key={t}
                value={t}
                control={<Radio />}
                label={format(t)}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
    </>
  );
};

InspectThemeSelect.propTypes = {
  activeTheme: PropTypes.string.isRequired,
  setActiveTheme: PropTypes.func.isRequired,
};

export default InspectThemeSelect;
