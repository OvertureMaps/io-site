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

function DownloadButton() {
  const { map } = useMap();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (map) {
      map.getBounds();
    }
  }, [map]);

  const handleDownloadClick = async () => {
    setLoading(true);
    //Get current map dimensions and convert to bbox
    const bounds = map.getBounds();
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

    const center = map.getCenter();
    const zoom = map.getZoom();
    downloadLink.download = `overture-${zoom}-${center.lat}-${center.lng}.geojson`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setLoading(false);
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
    </div>
  );
}

export default DownloadButton;
