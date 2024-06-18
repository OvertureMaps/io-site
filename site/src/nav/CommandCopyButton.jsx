import { useMap } from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import CopyIcon from "../icons/icon-copy.svg?react";
import Floater from "react-floater";
import "./CommandCopyButton.css";

const themeTypeMap = {
  buildings: ["building", "building_part"],
  divisions: ["division", "division_area"],
  places: ["place"],
  transportation: ["segment", "connector"],
  base: ["infrastructure", "land", "land_cover", "land_use", "water"],
};

function CommandCopyButton({ mode, visibleThemes }) {
  const { myMap } = useMap();

  const [showFloater, setShowFloater] = useState(false);
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    if (myMap) {
      myMap.getBounds();
    }
  });
  const handleClick = () => {
    const bounds = myMap.getBounds();
    let bbox = [
      bounds.getWest(), //minx
      bounds.getSouth(), //miny
      bounds.getEast(), //maxx
      bounds.getNorth(), //maxy
    ];

    let visibleTypes = [];
    for (let i = 0; i < visibleThemes.length; i++) {
      visibleTypes = visibleTypes.concat(themeTypeMap[visibleThemes[i]]);
    }

    let commandList = [];
    for (let i = 0; i < visibleTypes.length; i++) {
      commandList.push(
        "overturemaps download --bbox " +
          bbox +
          " -f geojson --type " +
          visibleTypes[i] +
          " "
      );
    }

    setCommands(commandList);
    setShowFloater(!showFloater);
  };

  return (
    <div className="copy-command-wrapper">
      <Floater
        styles={{}}
        content={
          <div>
            Use these commands with the{" "}
            <a
              href={"https://github.com/OvertureMaps/overturemaps-py"}
              target="_blank"
              rel="noreferrer noopener"
            >
              python downloader
            </a>{" "}
            to download the current layers:
            <div className="commands">{commands}</div>
          </div>
        }
        open={showFloater}
        target={".copy-command-button"}
      />
      <button className="copy-command-button" onClick={handleClick}>
        <CopyIcon />
      </button>
    </div>
  );
}

export default CommandCopyButton;
