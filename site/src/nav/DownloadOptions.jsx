import { useEffect, useState } from "react";
import ChevronUpIcon from "./../icons/chevron-up.svg?react";
import ChevronDownIcon from "./../icons/chevron-down.svg?react";
import "./DownloadOptions.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const fileTypes = ["geoJson", "Parquet"];

function DownloadOptions() {
  const [open, setOpen] = useState(false);
  const [fileType, setFileType] = useState([]);

  const handleClickC = () => {
    setOpen(!open);
  };

  const handleChangeFT = (event) => {
    const {
      target: { value },
    } = event;
    setFileType(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="download-options">
      <button classname="download-options-button" onClick={handleClickC}>
        <div className="wrapper">
          <div classname="icon">
            {open ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </div>
        </div>
      </button>
      <div className="options-wrapper">
        {open ? (
          <div className="options">
            <span className="fileselect">
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
            </span>
            <span className="layerselect">Layer Selector</span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default DownloadOptions;
