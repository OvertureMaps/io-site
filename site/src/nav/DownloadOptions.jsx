import { useState } from "react";
import "./DownloadOptions.css";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import SettingsIcon from "./../icons/icon-settings.svg?react";
import Floater from "react-floater";

const FILE_FORMATS = ["geoJson", "Parquet"];

function DownloadOptions({ optionStates, optionSetters, mode }) {
  const [showFloater, setShowFloater] = useState(false);

  const handleToggleFloater = () => {
    setShowFloater(!showFloater);
  };

  const handleChangeFT = (event) => {
    const {
      target: { value },
    } = event;
    optionSetters.setFileTypes(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeSL = () => {
    optionSetters.setSelectedLayers(!optionStates.selectedLayers);
  };

  return (
    <div>
      <Floater
        styles={{
          arrow: {
            color:
              mode === "theme-dark"
                ? "var(--ifm-navbar-background-color)"
                : "var(--ifm-color-secondary-light)",
          },
          container: {
            borderRadius: "10px",
            padding: "10px",
            color: mode === "theme-dark" ? "white" : "black",
            fontSize: ".7rem",
            background:
              mode === "theme-dark"
                ? "var(--ifm-navbar-background-color)"
                : "var(--ifm-color-secondary-light)",
            width: 380,
            marginLeft: "-50px",
          },
        }}
        content={
          <div className="options">
            <div className="title-wrapper">
              <Typography align="center" variant="h6">
                Download Options
              </Typography>
            </div>
            <div className="layerselect">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={optionStates.selectedLayers}
                    onClick={handleChangeSL}
                    sx={{
                      color: "white",
                    }}
                  />
                }
                labelPlacement="start"
                label={
                  <Typography
                    sx={{
                      color: mode === "theme-dark" ? "whitesmoke" : "black",
                      fontSize: ".9rem",
                    }}
                  >
                    Download Only Selected Layers
                  </Typography>
                }
                sx={{ gap: "10px", marginBottom: "5px" }}
                disabled={true}
              ></FormControlLabel>
            </div>
            <div className="filename">
              <FormControlLabel
                control={
                  <TextField
                    label={"overture.geojson"}
                    value={optionStates.fileName}
                    variant="outlined"
                    size="small"
                    onChange={(event) => {
                      optionSetters.setFileName(event.target.value);
                    }}
                    sx={{
                      input: {
                        color: mode === "theme-dark" ? "white" : "black",
                      },
                      label: {
                        color: mode === "theme-dark" ? "white" : "black",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: ".9rem" }}>
                    Download File Name
                  </Typography>
                }
                labelPlacement="start"
                sx={{ gap: "10px" }}
              />
            </div>
            <div className="fileselect">
              <FormControlLabel
                disabled={true}
                control={
                  <FormControl size="small" sx={{ width: 180 }}>
                    <InputLabel
                      sx={{
                        color: mode === "theme-dark" ? "white" : "black",
                      }}
                    >
                      File Format(s)
                    </InputLabel>
                    <Select
                      labelId="file-select-multi-label"
                      id="file-select-multi"
                      multiple
                      value={optionStates.fileTypes}
                      onChange={handleChangeFT}
                      input={<OutlinedInput label="File Type" />}
                      sx={{
                        color: mode === "theme-dark" ? "white" : "black",
                      }}
                    >
                      {FILE_FORMATS.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>{" "}
                  </FormControl>
                }
                label={
                  <Typography sx={{ fontSize: ".9rem" }}>
                    Download File Format
                  </Typography>
                }
                labelPlacement="start"
                sx={{ gap: "10px", marginTop: "10px" }}
              />
            </div>
          </div>
        }
        open={showFloater}
        target={".download-options"}
      />
      <div className="download-options">
        <button
          className={`download-options-button ${mode === "theme-dark" ? "options-dark" : ""}`}
          onClick={handleToggleFloater}
        >
          <SettingsIcon
            className={mode === "theme-dark" ? "dark-options-icon" : ""}
          />
        </button>
      </div>
    </div>
  );
}

export default DownloadOptions;
