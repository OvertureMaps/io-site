import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LayerIcon from "./icons/icon-layers.svg?react";
import "./ThemeSelector.css"; 

function ThemeSelector({ visibleThemes }) {

  const [places, setPlaces] = useState(true);
  const [buildings, setBuildings] = useState(true);
  const [divisions, setDivisions] = useState(true);
  
  useEffect(() => {

    let layers = [];

    if (places) layers.push('places');
    if (buildings) layers.push('buildings');
    if (divisions) layers.push('divisions');
    visibleThemes(layers);
  }, [buildings, places, divisions, visibleThemes]);

  return (
    <div className="dropdown dropdown--hoverable theme-selector">
      <div className="layer-control">
        <LayerIcon/>
      </div>
      <ul className="dropdown__menu">
        <li> 
          <label htmlFor="places" className="dropdown__link" ><input id="places" type="checkbox" checked={places} onChange={() => setPlaces(!places)}/>Places</label>
        </li>
        <li>
          <label htmlFor="buildings" className="dropdown__link" ><input id="buildings" type="checkbox" checked={buildings} onChange={() => setBuildings(!buildings)}/>Buildings</label>
        </li>
        <li>
          <label htmlFor="divisions" className="dropdown__link" ><input id="divisions" type="checkbox" checked={divisions} onChange={() => setDivisions(!divisions)}/>Divisions</label>
        </li>
      </ul>
    </div>
  );
}

ThemeSelector.propTypes = {
  visibleThemes: PropTypes.func,
};
export default ThemeSelector;
