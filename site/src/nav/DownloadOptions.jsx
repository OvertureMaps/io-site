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

const fileTypes = ["geoJson", "Parquet"];

function DownloadOptions({
  fileType,
  setFileType,
  selectedLayers,
  setSelectedLayers,
  mode,
}) {
  const [showFloater, setShowFloater] = useState(false);

  const handleToggleFloater = () => {
    setShowFloater(!showFloater);
  };

  const handleChangeFT = (event) => {
    const {
      target: { value },
    } = event;
    setFileType(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeSL = () => {
    setSelectedLayers(!selectedLayers);
  };

  return (
    <div>
      <Floater
        styles={{
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
                  <Checkbox checked={selectedLayers} onClick={handleChangeSL} />
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
                    label="overture.geojson"
                    variant="outlined"
                    size="small"
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
                control={
                  <FormControl size="small" sx={{ width: 180 }}>
                    <InputLabel>File Format(s)</InputLabel>
                    <Select
                      labelId="file-select-multi-label"
                      id="file-select-multi"
                      multiple
                      value={fileType}
                      onChange={handleChangeFT}
                      input={<OutlinedInput label="File Type" />}
                    >
                      {fileTypes.map((type) => (
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
