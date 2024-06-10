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
                  />
                }
                label="Download Only Selected Layers"
                style={{ marginLeft: 0 }}
                disabled={true}
              ></FormControlLabel>
            </div>
            <div className="filename">
              <FormControlLabel
                control={
                  <TextField
                    label={optionStates.fileName}
                    value={optionStates.fileName}
                    variant="outlined"
                    size="small"
                    onChange={(event) => {
                      optionSetters.setFileName(event.target.value);
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
                    <InputLabel>File Format(s)</InputLabel>
                    <Select
                      labelId="file-select-multi-label"
                      id="file-select-multi"
                      multiple
                      value={optionStates.fileTypes}
                      onChange={handleChangeFT}
                      input={<OutlinedInput label="File Type" />}
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
          className="download-options-button"
          onClick={handleToggleFloater}
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}

export default DownloadOptions;
