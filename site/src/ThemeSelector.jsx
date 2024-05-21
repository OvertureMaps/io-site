import PropTypes from "prop-types";
import { useState } from "react";
import LayerIcon from "./icons/icon-layers.svg?react";
import "./ThemeSelector.css"; 

function ThemeSelector({ themes }) {

  const [places, setPlaces] = useState(true);
  const [buildings, setBuildings] = useState(true);
  const [transporation, setTransporation] = useState(true);

  return (
    <div className="dropdown dropdown--hoverable theme-selector">
      <div className="layer-control">
        <LayerIcon></LayerIcon>
      </div>
      <ul className="dropdown__menu">
        {places ? <li>
          <a className="dropdown__link" href="#url">Places</a>
        </li> : null}
        {buildings ? <li>
          <a className="dropdown__link" href="#url">Buildings</a>
        </li> : null}
        {transporation ? <li>
          <a className="dropdown__link" href="#url">Transportation</a>
        </li> : null}
      </ul>
    </div>
  );
}

ThemeSelector.propTypes = {
  themes: PropTypes.object,
};
export default ThemeSelector;
