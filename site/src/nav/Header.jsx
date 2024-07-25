import DownloadButton from "./DownloadButton";
import OvertureWordmark from "./OvertureWordmark";
import DarkModeToggle from "./DarkModeToggle";
import PropTypes from "prop-types";
import GithubButton from "./GithubButton";

export default function Header({ zoom, mode, setMode, setZoom, visibleThemes}) {
  return (
    <nav aria-label="Main" className="navbar navbar--fixed-top">
      <div className="navbar__inner">
        <div className="navbar__items">
          <OvertureWordmark />
          <a
            aria-current="page"
            className="navbar__item navbar__link"
            href="https://docs.overturemaps.org/"
            target="_blank"
          >
            Docs
          </a>
        </div>
        <div className="navbar__items navbar__items--right">
          <GithubButton />
          <DarkModeToggle mode={mode} setMode={setMode} />
          <DownloadButton zoom={zoom} mode={mode} setZoom={setZoom} visibleThemes={visibleThemes}/>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
