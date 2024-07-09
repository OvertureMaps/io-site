import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LayerIcon from "./icons/icon-layers.svg?react";
import "./ThemeSelector.css";
import Checkbox from "@mui/material/Checkbox";

function ThemeSelector({ visibleThemes, mode }) {
  const [base, setBase] = useState(true);
  const [buildings, setBuildings] = useState(true);
  const [divisions, setDivisions] = useState(true);
  const [places, setPlaces] = useState(true);
  const [transportation, setTransportation] = useState(true);

  useEffect(() => {
    let layers = [];

    if (base) layers.push("base");
    if (buildings) layers.push("buildings");
    if (divisions) layers.push("divisions");
    if (places) layers.push("places");
    if (transportation) layers.push("transportation");
    visibleThemes(layers);
  }, [base, buildings, divisions, places, transportation, visibleThemes]);

  return (
    <div className="dropdown dropdown--hoverable theme-selector tour-layers">
      <div className="layer-control">
        <LayerIcon
          className={`icon-layers ${
            mode === "theme-dark" ? "icon-layers-dark" : ""
          }`}
        />
      </div>
      <ul className="dropdown__menu">
        <li>
          <label htmlFor="base" className="dropdown__link">
            <Checkbox
              id="base"
              checked={base}
              onChange={() => setBase(!base)}
              size="small"
              sx={{
                padding: 0,
                svg: { fontSize: 17 },
                marginTop: -0.5,
              }}
            />
            Base
          </label>
        </li>
        <li>
          <label htmlFor="buildings" className="dropdown__link">
            <Checkbox
              id="buildings"
              checked={buildings}
              onChange={() => setBuildings(!buildings)}
              size="small"
              sx={{
                padding: 0,
                svg: { fontSize: 17 },
                marginTop: -0.5,
              }}
            />
            Buildings
          </label>
        </li>
        <li>
          <label htmlFor="divisions" className="dropdown__link">
            <Checkbox
              id="divisions"
              checked={divisions}
              onChange={() => setDivisions(!divisions)}
              size="small"
              sx={{
                padding: 0,
                svg: { fontSize: 17 },
                marginTop: -0.5,
              }}
            />
            Divisions
          </label>
        </li>
        <li>
          <label htmlFor="places" className="dropdown__link">
            <Checkbox
              id="places"
              checked={places}
              onChange={() => setPlaces(!places)}
              size="small"
              sx={{
                padding: 0,
                svg: { fontSize: 17 },
                marginTop: -0.5,
              }}
            />
            Places
          </label>
        </li>
        <li>
          <label htmlFor="transportation" className="dropdown__link">
            <Checkbox
              id="transportation"
              checked={transportation}
              onChange={() => setTransportation(!transportation)}
              size="small"
              sx={{
                padding: 0,
                svg: { fontSize: 17 },
                marginTop: -0.5,
              }}
            />
            Transportation
          </label>
        </li>
      </ul>
    </div>
  );
}

ThemeSelector.propTypes = {
  visibleThemes: PropTypes.func,
};
export default ThemeSelector;
