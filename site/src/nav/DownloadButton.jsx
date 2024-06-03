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
import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

function DownloadButton({ mode }) {
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
    setFileName("");
  };

  const onChangeFN = async (event) => {
    setFileName(event.target.value);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
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
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={`filename-field-wrapper ${mode === "theme-dark" ? "ffw-dark" : ""}`}
          sideOffset={12}
        >
          <fieldset className="filename-fieldset">
            <label
              className={`filename-fieldset-label ${mode === "theme-dark" ? "ffl-dark" : ""}`}
            >
              Enter a Filename
            </label>
            <fieldset className="input-fieldset">
              <div
                className={`CF-help-icon ${mode === "theme-dark" ? "cfhi-dark" : ""}`}
              >
                <Tooltip.Provider>
                  <Tooltip.Root defaultOpen={false}>
                    <Tooltip.Trigger asChild>
                      <QuestionMarkCircledIcon className={mode} />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className={`help-icon-content ${mode === "theme-dark" ? "hic-dark" : ""}`}
                        sideOffset={5}
                        side={"left"}
                      >
                        **Enter file name only, do not include file types.
                        <Tooltip.Arrow className="TooltipArrow" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
              <input
                className={`filename-fieldset-input ${mode === "theme-dark" ? "ffi-dark" : ""}`}
                id="filename"
                onChange={onChangeFN}
              />
            </fieldset>
            <div className="button--download">
              <button
                className={`button button--primary ${loading ? "disabled" : ""}`}
                onClick={handleDownloadClickConfirm}
              >
                <div className="wrapper">
                  <div className="download-text">
                    {loading ? "Downloading..." : "Confirm Download"}
                  </div>
                </div>
              </button>
            </div>
          </fieldset>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
export default DownloadButton;
