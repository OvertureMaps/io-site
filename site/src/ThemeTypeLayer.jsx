import { Layer } from "react-map-gl/maplibre";
import PropTypes from "prop-types";
import "./CustomControls.css";

const colorExpression = (color, highlightColor) => {
  return [
    "case",
    ["boolean", ["feature-state", "selected"], false],
    highlightColor || "white",
    color,
  ];
};

const ThemeTypeLayer = ({
  activeThemes,
  theme,
  type,
  color,
  highlightColor,
  labelColor,
  outlineColor,
  point,
  line,
  polygon,
  extrusion,
  visible,
  label,
  active,
  outline,
  minzoom,
  pointSize,
  additionalFilter,
  selectorName
}) => {
  return (
    <>
      {point ? (
        <Layer
          filter={["==", ["geometry-type"], "Point"]}
          id={`${selectorName}_point`}
          type="circle"
          source={theme}
          source-layer={type}
          paint={{
            "circle-color": colorExpression(color, highlightColor),
            "circle-radius": [
              "interpolate",
              ["exponential", 2],
              ["zoom"],
              0,
              1,
              17,
              pointSize || 4,
            ],
            //"circle-opacity": ["interpolate", ["linear"], ["zoom"], 2, 0.1, 12, 0.5, 16, 0.5],
            "circle-blur": active ? 1 : 0,
          }}
          layout={{ visibility: visible ? "visible" : "none" }}
          {...(minzoom ? { minzoom } : {})}
        />
      ) : null}

      {label && point ? (
        <>
          <Layer
            filter={["==", ["geometry-type"], "Point"]}
            id={`${selectorName}_point_label`}
            minzoom={minzoom || 17}
            type="symbol"
            source={theme}
            source-layer={type}
            paint={{
              "text-color": "hsla(234, 99%, 66%, 1)",
              "text-halo-color": "#fff",
              "text-halo-width": 1,
              "text-halo-blur": 1,
            }}
            layout={{
              "text-font": ["Noto Sans Regular"],
              "text-field": ["get", "@name"],
              "text-size": 10,
              visibility: visible ? "visible" : "none",
              "text-variable-anchor": ["top", "bottom", "left", "right"],
              "text-radial-offset": 0,
              "text-justify": "auto",
              "text-line-height": 1,
              "text-padding": 12,
              "text-max-width": 4,
            }}
          />
        </>
      ) : null}

      {line ? (
        <Layer
          filter={[
            "all", ["==", ["geometry-type"], "LineString"],
            ...(additionalFilter ? [additionalFilter] : []),
          ]}
          id={`${selectorName}_line`}
          type="line"
          source={theme}
          source-layer={type}
          paint={{
            "line-color": colorExpression(color, highlightColor),
            "line-width": active ? 3 :["interpolate", ["linear"], ["zoom"], 12, 1, 13, 2],
            "line-blur": active ? 3 : 0,
          }}
          layout={{ visibility: visible ? "visible" : "none" }}
          {...(minzoom ? { minzoom } : {})}
        />
      ) : null}
      {outline ? (
        <Layer
          filter={[
            "all", ["==", ["geometry-type"], "LineString"],
            ...(additionalFilter ? [additionalFilter] : []),
          ]}
          id={`${selectorName}_outline`}
          type="line"
          source={theme}
          source-layer={type}
          paint={{
            "line-color": colorExpression(color, highlightColor),
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              1,
              13,
              activeThemes.length > 1 ? 1 : 2,
            ],
          }}
          layout={{ visibility: visible ? "visible" : "none" }}
          {...(minzoom ? { minzoom } : {})}
        />
      ) : null}
      {label && line ? (
        <Layer
          filter={["==", ["geometry-type"], "LineString"]}
          id={`${selectorName}_line_label`}
          type="symbol"
          source={theme}
          source-layer={type}
          paint={{
            "text-color": "hsla(218, 99%, 36%, 0.8)",
            "text-halo-color": "#fff",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          }}
          layout={{
            "text-font": ["Noto Sans Regular"],
            "text-field": ["get", "@name"],
            "text-size": 12,
            "symbol-placement": "line-center",
            visibility: visible ? "visible" : "none",
          }}
          {...(minzoom ? { minzoom } : {})}
        />
      ) : null}

      {polygon ? (
        <Layer
          filter={[
            "all",
            ["==", ["geometry-type"], "Polygon"],
            ...(additionalFilter ? [additionalFilter] : []),
          ] }
          id={`${selectorName}_fill`}
          type="fill"
          source={theme}
          source-layer={type}
          paint={{
            "fill-color": colorExpression(color, highlightColor),
            "fill-outline-color": outlineColor,
            //"fill-opacity": active
              //? activeThemes.length > 1
              //  ? 0.55
              //  : 0.7
              //: 0.4,
          }}
          layout={{ visibility: visible ? "visible" : "none" }}
          {...(minzoom ? { minzoom } : {})}
        />
      ) : null}
      {extrusion ? (
        <Layer
          filter={[
            "all",
            ["==", ["geometry-type"], "Polygon"],
            ["!=", ["get", "has_parts"], true],
          ]} // prevent z-fighting
          id={`${selectorName}_fill-extrusion`}
          type="fill-extrusion"
          source={theme}
          source-layer={type}
          paint={{
            "fill-extrusion-color": colorExpression(color, highlightColor),
            "fill-extrusion-opacity": active
              ? activeThemes.length > 1
                ? 0.35
                : 0.15
              : 0.2,
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-height": ["get", "height"],
          }}
          layout={{ visibility: visible ? "visible" : "none" }}
          {...(minzoom ? { minzoom } : {})}
        />
      ) : null}
      {label && (polygon || extrusion || outline) ? (
        <Layer
          filter={["all", ["==", ["geometry-type"], "Polygon"]]}
          id={`${selectorName}_fill_labels`}
          type="symbol"
          source={theme}
          source-layer={type}
          paint={{
            "text-color": labelColor,
            "text-halo-color": "#fff",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          }}
          layout={{
            "text-font": ["Noto Sans Regular"],
            "text-field": ["get", "@name"],
            "text-size": 12,
            "text-line-height": 1,
            "text-padding": 12,
            "text-max-width": 4,
            visibility: visible ? "visible" : "none",
            "symbol-placement": "point",
          }}
          {...(minzoom ? { minzoom } : {})}
        />
      ) : null}
    </>
  );
};

ThemeTypeLayer.propTypes = {
  activeThemes: PropTypes.array.isRequired,
  theme: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.any.isRequired,
  highlightColor: PropTypes.any.isRequired,
  labelColor: PropTypes.string,
  point: PropTypes.bool,
  line: PropTypes.bool,
  polygon: PropTypes.bool,
  extrusion: PropTypes.bool,
  outline: PropTypes.bool,
  active: PropTypes.bool,
  label: PropTypes.bool,
  minzoom: PropTypes.number,
  pointSize: PropTypes.number,
  additionalFilter: PropTypes.array,
  selectorName: PropTypes.string,
  outlineColor: PropTypes.string,
};

export default ThemeTypeLayer;
