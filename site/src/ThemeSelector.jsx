import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LayerIcon from "./icons/icon-layers.svg?react";
import "./ThemeSelector.css";

function ThemeSelector({ visibleThemes, mode }) {
  const [base, setBase] = useState(true);
  const [buildings, setBuildings] = useState(true);
  const [divisions, setDivisions] = useState(true);
  const [places, setPlaces] = useState(true);
  const [transportation, setTransportation] = useState(true);
  const [addresses, setAddresses] = useState(true);

  useEffect(() => {
    let layers = [];

    if (base) layers.push("base");
    if (buildings) layers.push("buildings");
    if (divisions) layers.push("divisions");
    if (places) layers.push("places");
    if (transportation) layers.push("transportation");
    if (addresses) layers.push("addresses");
    visibleThemes(layers);
  }, [
    base,
    buildings,
    divisions,
    places,
    transportation,
    addresses,
    visibleThemes,
  ]);

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
            <input
              id="base"
              type="checkbox"
              checked={base}
              onChange={() => setBase(!base)}
            />
            Base
          </label>
        </li>
        <li>
          <label htmlFor="buildings" className="dropdown__link">
            <input
              id="buildings"
              type="checkbox"
              checked={buildings}
              onChange={() => setBuildings(!buildings)}
            />
            Buildings
          </label>
        </li>
        <li>
          <label htmlFor="divisions" className="dropdown__link">
            <input
              id="divisions"
              type="checkbox"
              checked={divisions}
              onChange={() => setDivisions(!divisions)}
            />
            Divisions
          </label>
        </li>
        <li>
          <label htmlFor="places" className="dropdown__link">
            <input
              id="places"
              type="checkbox"
              checked={places}
              onChange={() => setPlaces(!places)}
            />
            Places
          </label>
        </li>
        <li>
          <label htmlFor="transportation" className="dropdown__link">
            <input
              id="transportation"
              type="checkbox"
              checked={transportation}
              onChange={() => setTransportation(!transportation)}
            />
            Transportation
          </label>
        </li>
        <li>
          <label htmlFor="addresses" className="dropdown__link">
            <input
              id="addresses"
              type="checkbox"
              checked={addresses}
              onChange={() => setAddresses(!addresses)}
            />
            Addresses
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
