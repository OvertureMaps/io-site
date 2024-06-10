import DownloadButton from "./DownloadButton";
import OvertureWordmark from "./OvertureWordmark";
import DarkModeToggle from "./DarkModeToggle";
import DownloadOptions from "./DownloadOptions";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Header({ zoom, mode, setMode, setZoom }) {
  const [fileTypes, setFileTypes] = useState([]);
  const [selectedLayers, setSelectedLayers] = useState(true);
  const [fileName, setFileName] = useState("overture.geojson");
  const optionStates = {
    fileName: fileName,
    fileTypes: fileTypes,
    selectedLayers: selectedLayers,
  };
  const optionSetters = {
    setFileName: setFileName,
    setFileTypes: setFileTypes,
    setSelectedLayers: setSelectedLayers,
  };

  return (
    <nav aria-label="Main" className="navbar navbar--fixed-top">
      <div className="navbar__inner" style={{ position: "relative" }}>
        <div className="navbar__items">
          <OvertureWordmark />
        </div>
        <div className="navbar__items navbar__items--right">
          <DarkModeToggle mode={mode} setMode={setMode} />
          <DownloadOptions
            optionStates={optionStates}
            optionSetters={optionSetters}
            mode={mode}
          />
          <DownloadButton
            optionStates={optionStates}
            optionSetters={optionSetters}
            zoom={zoom}
            mode={mode}
            setZoom={setZoom}
          />
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
