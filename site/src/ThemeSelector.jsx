import { useState, useEffect } from "react";
import LayerIcon from "./icons/icon-layers.svg?react";
import "./ThemeSelector.css";
import { layers } from "./Layers";
import { format } from "./util/TextUtil";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Popper,
  Paper,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const ThemeSelector = ({
  mode,
  setVisibleTypes,
  activeThemes,
  setActiveThemes,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedThemes, setSelectedThemes] = useState({});
  const [selectedTypes, setSelectedTypesState] = useState({});

  useEffect(() => {
    const newSelectedThemes = {};
    const newSelectedTypes = {};

    layers.forEach((layer) => {
      if (!newSelectedThemes[layer.theme]) {
        newSelectedThemes[layer.theme] = true;
      }
      newSelectedTypes[layer.type] = true;
    });

    setSelectedThemes(newSelectedThemes);
    setSelectedTypesState(newSelectedTypes);
    updateVisibleTypes(newSelectedTypes);
  }, []);

  const handleThemeChange = (theme) => {
    const newSelectedThemes = {
      ...selectedThemes,
      [theme]: !selectedThemes[theme],
    };
    setSelectedThemes(newSelectedThemes);

    const newSelectedTypes = { ...selectedTypes };
    layers
      .filter((layer) => layer.theme === theme)
      .forEach((layer) => {
        newSelectedTypes[layer.type] = !selectedThemes[theme];
      });

    setSelectedTypesState(newSelectedTypes);
    updateVisibleTypes(newSelectedTypes);
  };

  const handleTypeChange = (type) => {
    const newSelectedTypes = { ...selectedTypes, [type]: !selectedTypes[type] };
    setSelectedTypesState(newSelectedTypes);
    updateVisibleTypes(newSelectedTypes);
  };

  const updateVisibleTypes = (newSelectedTypes) => {
    const visible = Object.keys(newSelectedTypes).filter(
      (type) => newSelectedTypes[type]
    );
    setVisibleTypes(visible);
  };

  const filterUniqueByType = (array) => {
    const seenTypes = new Set();
    return array.filter((item) => {
      if (seenTypes.has(item.type)) {
        return false;
      } else {
        seenTypes.add(item.type);
        return true;
      }
    });
  };

  const renderPinThemeIcon = (theme) => {
    const props = {
      sx: {
        "&:hover": {
          cursor: "pointer",
        },
        color: "black",
      },
    };

    return (
      <IconButton
        onClick={() => {
          if (activeThemes.includes(theme)) {
            setActiveThemes(activeThemes.filter((t) => t !== theme));
          } else {
            setActiveThemes(activeThemes.concat(theme));
          }
        }}
        sx={{
          marginTop: "-7px",
        }}
      >
        {activeThemes.includes(theme) ? (
          <PushPinIcon {...props} />
        ) : (
          <PushPinOutlinedIcon {...props} />
        )}
      </IconButton>
    );
  };

  const renderCheckboxes = () => {
    const themes = [...new Set(layers.map((layer) => layer.theme))];

    return (
      <Box p={1}>
        {themes.map((theme) => {
          const types = filterUniqueByType(
            layers.filter((layer) => layer.theme === theme)
          );

          const children = types.map((t) => selectedTypes[t.type]);

          return (
            <Grid container width={200}>
              <Grid item xs={10}>
                <div>
                  <FormControlLabel
                    label={format(theme)}
                    className="theme-selector-checkbox"
                    sx={{
                      height: "16px",
                    }}
                    control={
                      <Checkbox
                        size="small"
                        checked={
                          selectedThemes[theme] && children.includes(true)
                        }
                        indeterminate={
                          children.includes(true) && children.includes(false)
                        }
                        onChange={() => handleThemeChange(theme)}
                      />
                    }
                  />
                </div>
                {types.length > 1 && (
                  <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                    {types.map((layer) => (
                      <FormControlLabel
                        label={format(layer.type)}
                        className="theme-selector-checkbox"
                        control={
                          <Checkbox
                            size="small"
                            checked={selectedTypes[layer.type]}
                            onChange={() => handleTypeChange(layer.type)}
                          />
                        }
                      />
                    ))}
                  </Box>
                )}
              </Grid>
              <Grid item xs={2}>
                {renderPinThemeIcon(theme)}
              </Grid>
            </Grid>
          );
        })}
      </Box>
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? "theme-selector-popover" : undefined;

  return (
    <div className="theme-selector tour-layers">
      <div className="layer-control" onClick={handleClick}>
        <LayerIcon
          className={`icon-layers ${
            mode === "theme-dark" ? "icon-layers-dark" : ""
          }`}
        />
      </div>
      <Popper
        className="theme-selector-popover"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        placement="bottom-start"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper>{renderCheckboxes()}</Paper>
      </Popper>
    </div>
  );
};

export default ThemeSelector;
