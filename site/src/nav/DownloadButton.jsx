import PropTypes from "prop-types";
import { useMap } from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import { DownloadCatalog } from "../DownloadCatalog.js";
import {
  ParquetDataset,
  set_panic_hook,
  writeGeoJSON,
} from "@geoarrow/geoarrow-wasm/esm/index.js";
import downloadIcon from "/download.svg";
import RefreshIcon from "../icons/icon-refresh.svg?react";
import "./DownloadButton.css";
import Textfield from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from '@mui/icons-material/Help';

function DownloadButton() {
  const { myMap } = useMap();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (myMap) {
      myMap.getBounds();
    }
  }, [myMap]);

  const handleDownloadClick = () => {
    setOpen(!open);
  };

  const handleDownloadClickConfirm = async () => {
    setLoading(true);
    setOpen(false);
    //Get current map dimensions and convert to bbox
    const bounds = myMap.getBounds();
    let bbox = [
      bounds.getWest(), //minx
      bounds.getSouth(), //miny
      bounds.getEast(), //maxx
      bounds.getNorth(), //maxy
    ];

    console.log(bounds);

    //Send those to the download engine
    const minxPath = ["bbox", "minx"];
    const minyPath = ["bbox", "miny"];
    const maxxPath = ["bbox", "maxx"];
    const maxyPath = ["bbox", "maxy"];

    const readOptions = {
      bbox: bbox,
      bboxPaths: {
        minxPath,
        minyPath,
        maxxPath,
        maxyPath,
      },
    };

    let parquetDataset = await new ParquetDataset(DownloadCatalog);
    const wasmTable = await parquetDataset.read(readOptions);

    set_panic_hook();
    //Create a blob
    // const binaryDataForDownload = writeGeoParquet(wasmTable);
    const binaryDataForDownload = writeGeoJSON(wasmTable);

    let blerb = new Blob([binaryDataForDownload], {
      type: "application/octet-stream",
    });

    //Download the blob
    // window.open(URL.createObjectURL(blerb));

    const url = URL.createObjectURL(blerb);
    var downloadLink = document.createElement("a");
    downloadLink.href = url;

    const center = myMap.getCenter();
    const zoom = myMap.getZoom();

    if (fileName === "") {
      downloadLink.download = "overture.geojson";
    } else {
      downloadLink.download = `${fileName}.geojson`;
    }

    // downloadLink.download = `overture-${zoom}-${center.lat}-${center.lng}.geojson`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setLoading(false);
  };

  const onChangeFN = async (event) => {
    setFileName(event.target.value);
  };

  return (
    <div className="button--download">
      <button
        className={`button button--primary ${loading ? "disabled" : ""}`}
        onClick={handleDownloadClick}
      >
        <div className="wrapper">
          <div className="download-icon">
            {!loading ? (
              <img className={"dl-img"} src={downloadIcon} />
            ) : (
              <RefreshIcon />
            )}
          </div>
          <div className="download-text">
            {loading ? "Downloading..." : "Download Visible"}
          </div>
        </div>
      </button>
      {open & !loading ? (
        <div>
          <div className="arrow-up"></div>
          <div className="filename-field-wrapper">
            <div className="input-wrapper">
              <Textfield
                className="filename-textfield"
                label="Enter File Name (Optional)"
                variant="outlined"
                size="small"
                onChange={onChangeFN}
                sx={{ width: "218px" }}
                inputProps={{ style: { fontSize: "smaller" } }}
                InputLabelProps={{ style: { fontSize: "smaller" } }}
              />
              <Tooltip title="**Enter file name only, do not include file types." arrow={true} placement="left">
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="confirm-wrapper">
              <button
                className={`button button--primary button-confirm ${loading ? "disabled" : ""}`}
                onClick={handleDownloadClickConfirm}
              >
                <div className="wrapper">
                  <div className="download-text">
                    {loading ? "Downloading..." : "Confirm Download"}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DownloadButton;
