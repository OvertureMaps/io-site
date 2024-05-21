import PropTypes from "prop-types";
import { useState } from "react";
import LayerIcon from "./icons/icon-layers.svg?react";
import "./ThemeSelector.css"; 

function ThemeSelector({ themes }) {

  const [places, setPlaces] = useState(true);
  const [buildings, setBuildings] = useState(true);
  const [transportation, setTransportation] = useState(true);

  return (
    <div className="dropdown dropdown--hoverable theme-selector">
      <div className="layer-control">
        <LayerIcon></LayerIcon>
      </div>
      <ul className="dropdown__menu">
        <li> 
          <div className="dropdown__link" ><input type="checkbox" checked={places} onClick={() => setPlaces(!places)}/> Places </div>
        </li>
        <li>
          <div className="dropdown__link" ><input type="checkbox" checked={buildings} onClick={() => setBuildings(!buildings)}/> Buildings </div>
        </li>
        <li>
          <div className="dropdown__link" ><input type="checkbox" checked={transportation} onClick={() => setTransportation(!transportation)}/> Transportation </div>
        </li>
      </ul>
    </div>
  );
}

ThemeSelector.propTypes = {
  themes: PropTypes.object,
};
export default ThemeSelector;
