import { useState } from "react";
import ChevronUpIcon from "./../icons/chevron-up.svg?react";
import ChevronDownIcon from "./../icons/chevron-down.svg?react";
import "./DownloadOptions.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField, Typography } from "@mui/material";

const fileTypes = ["geoJson", "Parquet"];

function DownloadOptions({
  fileType,
  setFileType,
  selectedLayers,
  setSelectedLayers,
}) {
  const [open, setOpen] = useState(false);

  const handleClickC = () => {
    setOpen(!open);
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
    <div className="download-options">
      <div className="button-wrapper">
        <button className="download-options-button" onClick={handleClickC}>
          <div className="chevron-icon-wrapper">
            <div classname="chevron-icon">
              {open ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </div>
          </div>
        </button>
      </div>
      <div className="options-wrapper">
        {open ? (
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
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default DownloadOptions;
