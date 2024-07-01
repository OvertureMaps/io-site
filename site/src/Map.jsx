import {
  Map as MapLibreMap,
  NavigationControl,
  Source,
  AttributionControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import * as pmtiles from "pmtiles";
import maplibregl from "maplibre-gl";

import { useState, useEffect, useCallback, useRef } from "react";
import { Layer, GeolocateControl } from "react-map-gl/maplibre";
import InspectorPanel from "./InspectorPanel";
import PropTypes from "prop-types";
import "./InspectorPanel.css";
import "./CustomControls.css";
import ThemeSelector from "./ThemeSelector";
import BugIcon from "./icons/icon-bug.svg?react";

const PMTILES_URL =
  "pmtiles://https://d32gfzcnkb85e2.cloudfront.net/2024-06-13-beta/";

const INITIAL_VIEW_STATE = {
  latitude: 51.05,
  longitude: 3.7303,
  zoom: 16,
  bearing: 0,
  pitch: 0,
};

// this reference must remain constant to avoid re-renders
const MAP_STYLE = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {},
  layers: [],
};

const ThemeSource = ({ name, url }) => {
  return <Source id={name} type="vector" url={`${url}${name}.pmtiles`} />;
};

ThemeSource.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const colorExpression = (color) => {
  return [
    "case",
    ["boolean", ["feature-state", "selected"], false],
    "white",
    color,
  ];
};

const ThemeTypeLayer = ({
  theme,
  type,
  color,
  point,
  line,
  polygon,
  extrusion,
  visible,
}) => {
  return (
    <>
      {point ? (
        <Layer
          filter={["==", ["geometry-type"], "Point"]}
          id={`${theme}_${type}_point`}
          type="circle"
          source={theme}
          source-layer={type}
          paint={{
            "circle-color": colorExpression(color),
            "circle-radius": [
              "interpolate",
              ["exponential", 2],
              ["zoom"],
              0,
              1,
              17,
              8,
            ],
          }}
          layout={{ visibility: visible ? "visible" : "none" }}
        />
      ) : null}

      {point ? (
        <Layer
          filter={["==", ["geometry-type"], "Point"]}
          id={`${theme}_${type}_point_label`}
          minzoom={17}
          type="symbol"
          source={theme}
          source-layer={type}
          paint={{
            "text-color": "black",
            "text-halo-color": colorExpression(color),
            "text-halo-width": 1,
          }}
          layout={{
            "text-font": ["Noto Sans Bold"],
            "text-field": ["get", "@name"],
            "text-size": 11,
            visibility: visible ? "visible" : "none",
            "text-variable-anchor": ["top", "bottom", "left", "right"],
            "text-radial-offset": 0.8,
            "text-justify": "auto",
          }}
        />
      ) : null}

      {line ? (
        <Layer
          filter={["==", ["geometry-type"], "LineString"]}
          id={`${theme}_${type}_line`}
          type="line"
          source={theme}
          source-layer={type}
          paint={{ "line-color": colorExpression(color) }}
          layout={{ visibility: visible ? "visible" : "none" }}
        />
      ) : null}
      {line ? (
        <Layer
          filter={["==", ["geometry-type"], "LineString"]}
          id={`${theme}_${type}_line_label`}
          type="symbol"
          source={theme}
          source-layer={type}
          paint={{
            "text-color": "black",
            "text-halo-color": colorExpression(color),
            "text-halo-width": 1,
          }}
          layout={{
            "text-font": ["Noto Sans Bold"],
            "text-field": ["get", "@name"],
            "text-size": 11,
            "symbol-placement": "line-center",
            visibility: visible ? "visible" : "none",
          }}
        />
      ) : null}
      {polygon ? (
        <Layer
          filter={["==", ["geometry-type"], "Polygon"]}
          id={`${theme}_${type}_fill`}
          type="fill"
          source={theme}
          source-layer={type}
          paint={{ "fill-color": colorExpression(color), "fill-opacity": 0.2 }}
          layout={{ visibility: visible ? "visible" : "none" }}
        />
      ) : null}
      {extrusion ? (
        <Layer
          filter={[
            "all",
            ["==", ["geometry-type"], "Polygon"],
            ["!=", ["get", "has_parts"], true],
          ]} // prevent z-fighting
          id={`${theme}_${type}_fill-extrusion`}
          type="fill-extrusion"
          source={theme}
          source-layer={type}
          paint={{
            "fill-extrusion-color": colorExpression(color),
            "fill-extrusion-opacity": 0.35,
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-height": ["get", "height"],
          }}
          layout={{ visibility: visible ? "visible" : "none" }}
        />
      ) : null}
      {polygon || extrusion ? (
        <Layer
          filter={["all", ["==", ["geometry-type"], "Polygon"]]}
          id={`${theme}_${type}_fill_labels`}
          type="symbol"
          source={theme}
          source-layer={type}
          paint={{
            "text-color": "black",
            "text-halo-color": colorExpression(color),
            "text-halo-width": 1,
          }}
          layout={{
            "text-font": ["Noto Sans Bold"],
            "text-field": ["get", "@name"],
            "text-size": 11,
            visibility: visible ? "visible" : "none",
            "symbol-placement": "point",
          }}
        />
      ) : null}
    </>
  );
};

ThemeTypeLayer.propTypes = {
  theme: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  point: PropTypes.bool,
  line: PropTypes.bool,
  polygon: PropTypes.bool,
  extrusion: PropTypes.bool,
};

export default function Map({ mode, mapEntity, setMapEntity, setZoom }) {
  const mapRef = useRef();
  const [cursor, setCursor] = useState("auto");

  const [visibleThemes, setVisibleThemes] = useState([]);
  const [interactiveLayerIds, setInteractiveLayerIds] = useState([]);

  const selectedSource = useRef();
  const selectedSourceLayer = useRef();

  useEffect(() => {
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  const syncInteractiveLayerIds = useCallback(() => {
    const layers = mapRef.current.getStyle().layers;
    const layersToShow = layers
      .filter((layer) => visibleThemes.indexOf(layer.source) >= 0)
      .map((layer) => layer.id);
    setInteractiveLayerIds(layersToShow);
  }, [visibleThemes]);

  const onMouseEnter = useCallback(
    (e) => {
      if (e.features.some((f) => visibleThemes.indexOf(f.source) >= 0)) {
        setCursor("pointer");
      }
    },
    [visibleThemes],
  );
  const onMouseLeave = useCallback(() => setCursor("auto"), []);

  const onClick = useCallback(
    (event) => {
      let features = event.features;
      features = features.filter((f) => visibleThemes.indexOf(f.source) >= 0);
      const feature = features[0];
      if (feature) {
        if (selectedSource.current) {
          mapRef.current.removeFeatureState({
            source: selectedSource.current,
            sourceLayer: selectedSourceLayer.current,
          });
        }

        selectedSource.current = feature.source;
        selectedSourceLayer.current = feature.sourceLayer;
        mapRef.current.setFeatureState(
          {
            source: feature.source,
            sourceLayer: feature.sourceLayer,
            id: feature.id,
          },
          { selected: true },
        );
        setMapEntity({
          theme: feature.source,
          type: feature.sourceLayer,
          ...feature.properties,
        });
      } else {
        setMapEntity({});
      }
    },
    [visibleThemes],
  );

  const handleZoom = (event) => {
    setZoom(event.target.getZoom());
  };

  return (
    <>
      <div className={`map ${mode}`}>
        <MapLibreMap
          id="myMap"
          ref={mapRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onLoad={syncInteractiveLayerIds}
          onClick={onClick}
          cursor={cursor}
          hash={true}
          onZoom={handleZoom}
          mapStyle={MAP_STYLE}
          interactiveLayerIds={interactiveLayerIds}
          initialViewState={INITIAL_VIEW_STATE}
          style={{
            position: "fixed",
            width: "100%",
            height: "calc(100vh - 60px)",
          }}
          attributionControl={false}
        >
          <ThemeSource name="base" url={PMTILES_URL} />
          <ThemeSource name="buildings" url={PMTILES_URL} />
          <ThemeSource name="places" url={PMTILES_URL} />
          <ThemeSource name="divisions" url={PMTILES_URL} />
          <ThemeSource name="transportation" url={PMTILES_URL} />

          <ThemeTypeLayer
            theme="base"
            type="land"
            point
            line
            polygon
            color="#ccebc5"
            visible={visibleThemes.includes("base")}
          />
          <ThemeTypeLayer
            theme="base"
            type="land_cover"
            polygon
            color="#b3de69"
            visible={visibleThemes.includes("base")}
          />
          <ThemeTypeLayer
            theme="base"
            type="land_use"
            point
            line
            polygon
            color="#b3de69"
            visible={visibleThemes.includes("base")}
          />
          <ThemeTypeLayer
            theme="base"
            type="water"
            point
            line
            polygon
            color="#80b1d3"
            visible={visibleThemes.includes("base")}
          />
          <ThemeTypeLayer
            theme="base"
            type="infrastructure"
            point
            line
            polygon
            color="#b3de69"
            visible={visibleThemes.includes("base")}
          />
          <ThemeTypeLayer
            theme="divisions"
            type="division_area"
            polygon
            color="#bc80bd"
            visible={visibleThemes.includes("divisions")}
          />
          <ThemeTypeLayer
            theme="divisions"
            type="boundary"
            line
            color="#bc80bd"
            visible={visibleThemes.includes("divisions")}
          />
          <ThemeTypeLayer
            theme="transportation"
            type="segment"
            line
            color="#fb8072"
            visible={visibleThemes.includes("transportation")}
          />
          <ThemeTypeLayer
            theme="transportation"
            type="connector"
            point
            color="#fb8072"
            visible={visibleThemes.includes("transportation")}
          />
          <ThemeTypeLayer
            theme="buildings"
            type="building"
            extrusion
            color="#d9d9d9"
            visible={visibleThemes.includes("buildings")}
          />
          <ThemeTypeLayer
            theme="buildings"
            type="building_part"
            extrusion
            color="#d9d9d9"
            visible={visibleThemes.includes("buildings")}
          />
          <ThemeTypeLayer
            theme="places"
            type="place"
            point
            color="#fdb462"
            visible={visibleThemes.includes("places")}
          />
          <Layer
            id="divisions_division"
            type="symbol"
            source="divisions"
            source-layer="division"
            paint={{
              "text-color": mode === "theme-light" ? "black" : "white",
              "text-halo-color": mode === "theme-light" ? "white" : "black",
              "text-halo-width": 1,
            }}
            layout={{
              "text-font": ["Noto Sans Bold"],
              "text-field": ["get", "@name"],
              "text-size": 11,
            }}
          />

          <NavigationControl position="top-right"></NavigationControl>
          <GeolocateControl />
          <AttributionControl customAttribution='<a href="https://openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>, <a href="https://overturemaps.org" target="_blank">Overture Maps Foundation</a>' />
        </MapLibreMap>
        <div className="custom-controls">
          {Object.keys(mapEntity).length > 0 && (
            <InspectorPanel entity={mapEntity} />
          )}

          <ThemeSelector
            mode={mode}
            visibleThemes={setVisibleThemes}
          ></ThemeSelector>
        </div>
        <div className="bug-nub">
          <a
            className="bug-nub-link"
            href="https://github.com/OvertureMaps/io-site/issues/new/choose"
            target="_blank"
          >
            <BugIcon className="bug-nub-icon" />
          </a>
        </div>
      </div>
    </>
  );
}

Map.propTypes = {
  mode: PropTypes.string.isRequired,
};
