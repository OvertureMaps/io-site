import {
  Map as MapLibreMap,
  NavigationControl,
  Source,
  AttributionControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import * as pmtiles from "pmtiles";
import maplibregl from "maplibre-gl";

import { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { Layer, GeolocateControl } from "react-map-gl/maplibre";
import InspectorPanel from "./inspector_panel/InspectorPanel";
import PropTypes from "prop-types";
import "./CustomControls.css";
import ThemeSelector from "./ThemeSelector";
import BugIcon from "./icons/icon-bug.svg?react";
import { layers } from "./Layers";
import ThemeTypeLayer from "./ThemeTypeLayer";

const PMTILES_URL =
  "pmtiles://https://d3c1b7bog2u1nn.cloudfront.net/2024-07-22/";

const INITIAL_VIEW_STATE = {
  latitude: 38.90678,
  longitude: -77.036495,
  zoom: 15,
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

export default function Map({
  mode,
  mapEntity,
  setMapEntity,
  setZoom,
  themeRef,
}) {
  const mapRef = useRef();
  const [cursor, setCursor] = useState("auto");

  const [activeThemes, setActiveThemes] = useState(["places"]);
  const [visibleTypes, setVisibleTypes] = useState([]);
  const [interactiveLayerIds, setInteractiveLayerIds] = useState([]);

  // For access of latest value within map events
  const activeThemesRef = useRef(activeThemes);
  useEffect(() => {
    activeThemesRef.current = activeThemes;
  }, [activeThemes]);

  const syncInteractiveLayerIds = useCallback(() => {
    const layers = mapRef.current.getStyle().layers;
    const layersToShow = layers
      .filter((layer) => {
        return visibleTypes.indexOf(layer["source-layer"]) >= 0;
      })
      .map((layer) => layer.id);
    setInteractiveLayerIds(layersToShow);
  }, [visibleTypes]);

  const onMouseEnter = useCallback(
    (e) => {
      if (
        e.features.some(
          (f) => visibleTypes.indexOf(f.layer["source-layer"]) >= 0
        )
      ) {
        setCursor("pointer");
      }
    },
    [visibleTypes]
  );
  const onMouseLeave = useCallback(() => setCursor("auto"), []);

  const selectedSource = useRef();
  const selectedSourceLayer = useRef();

  useEffect(() => {
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  useEffect(() => {
    window.map = mapRef.current;
  });

  const onClick = useCallback(
    (event) => {
      let features = event.features;
      const activeFeatures = [];
      const backgroundFeatures = [];
      features = features
        .filter((f) => visibleTypes.indexOf(f.layer["source-layer"]) >= 0)
        .forEach((f) => {
          if (activeThemesRef.current.indexOf(f.layer["source"]) >= 0) {
            activeFeatures.push(f);
          } else {
            backgroundFeatures.push(f);
          }
        });
      const feature =
        activeFeatures.length > 0 ? activeFeatures[0] : backgroundFeatures[0];
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
          { selected: true }
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
    [visibleTypes]
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
          <ThemeSource name="addresses" url={PMTILES_URL} />

          {[false, true].map((label) => {
            return layers.map((props, i) => (
              <ThemeTypeLayer
                key={`${props.theme}_${props.type}_${i}`}
                {...{
                  ...props,
                  color: activeThemes.includes(props.theme)
                    ? props.activeColor || props.color
                    : props.color,
                }}
                visible={
                  visibleTypes.includes(props.type) &&
                  (props.activeOnly === undefined ||
                    activeThemes.includes(props.theme))
                }
                label={label && activeThemes.includes(props.theme)}
                active={activeThemes.includes(props.theme)}
                activeThemes={activeThemes}
                highlightColor={
                  activeThemes.includes(props.theme)
                    ? props.activeColor
                      ? props.color
                      : undefined
                    : props.activeColor
                }
              />
            ));
          })}
          <Layer
            id="divisions_division"
            type="symbol"
            source="divisions"
            source-layer="division"
            maxzoom={14}
            paint={{
              "text-color": mode === "theme-light" ? "black" : "white",
              "text-halo-color": mode === "theme-light" ? "white" : "black",
              "text-halo-width": 2,
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
            <InspectorPanel
              mode={mode}
              entity={mapEntity}
              setEntity={setMapEntity}
              activeThemes={activeThemes}
              setActiveThemes={setActiveThemes}
            />
          )}
        </div>
        <ThemeSelector
          entity={mapEntity}
          mode={mode}
          setVisibleTypes={setVisibleTypes}
          activeThemes={activeThemes}
          setActiveThemes={setActiveThemes}
          themeRef={themeRef}
        ></ThemeSelector>
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
