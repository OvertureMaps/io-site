import { useState } from "react";
import "./DownloadOptions.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField, Typography } from "@mui/material";
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
            width: 350,
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
            <div className="fileselect">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="file-select-multi-label">
                  File Format
                </InputLabel>
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
                </Select>
              </FormControl>
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
