import { setTheme } from "../themeUtils";
import PropTypes from "prop-types";
import "./DarkModeToggle.css";
import darkModeIcon from "/darkmode.svg";
import lightModeIcon from "/lightmode.svg";

export default function DarkModeToggle({ mode, setMode }) {
  const toggleDarkMode = () => {
    if (mode === "theme-dark") {
      setTheme("theme-light", setMode);
    } else {
      setTheme("theme-dark", setMode);
    }
  };

  return (
    <div className="dark-mode-toggle tour-darkmode">
      <button className="clean-btn" onClick={toggleDarkMode}>
        {mode === "theme-light" ? (
          <img src={lightModeIcon} />
        ) : (
          <img src={darkModeIcon} />
        )}
      </button>
    </div>
  );
}

DarkModeToggle.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
