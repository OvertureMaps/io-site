import DownloadButton from "./DownloadButton";
import OvertureWordmark from "./OvertureWordmark";
import DarkModeToggle from "./DarkModeToggle";
import PropTypes from "prop-types";

export default function Header({ zoom, mode, setMode, setZoom }) {
  return (
    <nav aria-label="Main" className="navbar navbar--fixed-top">
      <div className="navbar__inner">
        <div className="navbar__items">
          <OvertureWordmark />
        </div>
        <div className="navbar__items navbar__items--right">
          <DarkModeToggle mode={mode} setMode={setMode} />
          <DownloadButton zoom={zoom} mode={mode} setZoom={setZoom} />
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
