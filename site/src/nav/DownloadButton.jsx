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
import Floater from "react-floater";

const ZOOM_BOUND = 16;

function DownloadButton({ zoom }) {
  const { myMap } = useMap();

  const [loading, setLoading] = useState(false);
  const [showFloater, setShowFloater] = useState(false);

  useEffect(() => {
    if (myMap) {
      myMap.getBounds();
    }
  }, [myMap]);

  const handleDownloadClick = async () => {
    setLoading(true);
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
    downloadLink.download = `overture-${zoom}-${center.lat}-${center.lng}.geojson`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setLoading(false);
  };

  const handleEnterButton = () => {
    if (zoom < ZOOM_BOUND) {
      setShowFloater(true);
    }
  };

  const handleLeaveButton = () => {
    if (zoom < ZOOM_BOUND) {
      setShowFloater(false);
    }
  };

  return (
    <div>
      <Floater
        content={<div>THIS IS MY CONTENT</div>}
        open={showFloater}
        target={".button--download"}
      />
      <div
        className="button--download"
        onMouseOver={handleEnterButton}
        onMouseOut={handleLeaveButton}
      >
        <button
          className={`button button--primary ${
            loading || zoom < ZOOM_BOUND ? "disabled" : ""
          }`}
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
      </div>
    </div>
  );
}

export default DownloadButton;
