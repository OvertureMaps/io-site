import { useEffect, useState } from "react";
import ChevronUpIcon from "./../icons/chevron-up.svg?react";
import ChevronDownIcon from "./../icons/chevron-down.svg?react";
import "./DownloadOptions.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function DownloadOptions() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="download-options">
      <button classname="download-options-button" onClick={handleClick}>
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
              <FormControl>
                <InputLabel id="file-select-multi-label">
                  Download File Format
                </InputLabel>
                <Select
                  labelId="file-select-multi-label"
                  id="file-select-multi"
                ></Select>
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
