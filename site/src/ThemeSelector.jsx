import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LayerIcon from "./icons/icon-layers.svg?react";
import "./ThemeSelector.css";

function ThemeSelector({ interactiveLayers }) {
  const [places, setPlaces] = useState(true);
  const [buildings, setBuildings] = useState(true);
  const [transportation, setTransportation] = useState(true);

  useEffect(() => {
    let layers = [];

    if (places) layers.push("places");
    if (buildings) layers.push("buildings");
    if (transportation) layers.push("transportation");
    interactiveLayers(layers);
  }, [buildings, places, transportation, interactiveLayers]);

  return (
    <div className="dropdown dropdown--hoverable theme-selector tour-layers">
      <div className="layer-control">
        <LayerIcon />
      </div>
      <ul className="dropdown__menu">
        <li>
          <label htmlFor="places" className="dropdown__link">
            <input
              id="places"
              type="checkbox"
              checked={places}
              onClick={() => setPlaces(!places)}
            />
            Places
          </label>
        </li>
        <li>
          <label htmlFor="buildings" className="dropdown__link">
            <input
              id="buildings"
              type="checkbox"
              checked={buildings}
              onClick={() => setBuildings(!buildings)}
            />
            Buildings
          </label>
        </li>
        <li>
          <label htmlFor="transportation" className="dropdown__link">
            <input
              id="transportation"
              type="checkbox"
              checked={transportation}
              onClick={() => setTransportation(!transportation)}
            />
            Transportation
          </label>
        </li>
      </ul>
    </div>
  );
}

ThemeSelector.propTypes = {
  interactiveLayers: PropTypes.function,
};
export default ThemeSelector;
