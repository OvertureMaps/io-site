import { Popup } from "react-map-gl/maplibre";
import PropTypes from "prop-types";
import ThemeIcon from "./inspector_panel/ThemeIcon";
import "./FeaturePopup.css";

export default function FeaturePopup({
  coordinates,
  features,
  onClose,
  activeFeature,
  setActiveFeature,
}) {
  if (!coordinates || features.length < 2) return null;
  return (
    <Popup
      longitude={coordinates.longitude}
      latitude={coordinates.latitude}
      onClose={onClose}
      closeButton={true}
      closeOnClick={false}
    >
      <div className="popup-content">
        {features.map((feature, index) => {
          const entity = {
            theme: feature.source,
            type: feature.sourceLayer,
            ...feature.properties,
          };
          return (
            <div
              key={index}
              className="feature-item"
              onClick={() => {
                if (feature === activeFeature) {
                  setActiveFeature(null);
                } else {
                  setActiveFeature(feature);
                }
              }}
              style={{
                cursor: "pointer",
                backgroundColor:
                  feature === activeFeature ? "#eee" : "transparent",
              }}
            >
              <ThemeIcon theme={entity.theme} />
              <span>
                {entity["@name"] ||
                  (entity["names"] && JSON.parse(entity["names"]).primary) ||
                  `${entity["type"]}${
                    entity["subtype"] && entity["subtype"] !== entity["type"]
                      ? ` (${entity["subtype"]})`
                      : ""
                  }`}
              </span>
            </div>
          );
        })}
      </div>
    </Popup>
  );
}

FeaturePopup.propTypes = {
  coordinates: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }),
  features: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
