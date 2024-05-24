import DownloadButton from "./DownloadButton";
import OvertureWordmark from "./OvertureWordmark";
import DarkModeToggle from "./DarkModeToggle";
import DownloadOptions from "./DownloadOptions";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Header({ mode, setMode }) {
  const [fileType, setFileType] = useState([]);
  const [selectedLayers, setSelectedLayers] = useState(true);

  return (
    <nav aria-label="Main" className="navbar navbar--fixed-top">
      <div className="navbar__inner" style={{ position: "relative" }}>
        <div className="navbar__items">
          <OvertureWordmark />
        </div>
        <div className="navbar__items navbar__items--right">
          <DarkModeToggle mode={mode} setMode={setMode} />
          <DownloadOptions
            fileType={fileType}
            setFileType={setFileType}
            selectedLayers={selectedLayers}
            setSelectedLayers={setSelectedLayers}
          />
          <DownloadButton fileType={fileType} selectedLayers={selectedLayers} />
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
