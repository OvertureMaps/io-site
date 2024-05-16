import { Map as MapLibreMap, NavigationControl, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as pmtiles from 'pmtiles';
import maplibregl from 'maplibre-gl';
import { useState, useEffect, useCallback } from 'react';
import { Layer, GeolocateControl } from 'react-map-gl/maplibre';
 import InspectorPanel from './InspectorPanel';
import PropTypes from 'prop-types';
import './InspectorPanel.css';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const DARK_MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

const PLACES_PMTILES_URL = 'pmtiles://https://data.source.coop/protomaps/overture/2024-04-16-beta.0/places.pmtiles';
const PLACES_MAP_STYLE = {
  'id': 'places',
  'type': 'circle',
  'source': 'places',
  'source-layer': 'places',
  'filter': [">=", ["get", "confidence"], 0.0],
  'paint': {
    'circle-color':
      ['case',
        ['==', ['get', '@category'], 'beauty_salon'], '#fb9a99',
        ['==', ['get', '@category'], 'hotel'], '#33a02c',
        ['==', ['get', '@category'], 'landmark_and_historical_building'], '#a6cee3',
        ['==', ['get', '@category'], 'professional_services'], '#fdbf6f',
        ['==', ['get', '@category'], 'shopping'], '#e31a1c',
        ['==', ['get', '@category'], 'restaurant'], '#1f78b4',
        ['==', ['get', '@category'], 'school'], '#ff7f00',
        ['==', ['get', '@category'], 'accommodation'], '#b2df8a',
        '#cab2d6'
      ],
    'circle-radius': [
      'interpolate',
      ['exponential', 2],
      ['zoom'],
      0, 1,
      19, 8
    ],
    'circle-stroke-width': [
      'interpolate',
      ['exponential', 2],
      ['zoom'],
      12, 0,
      14, 2
    ],
    'circle-stroke-color': 'black'
  }
};


const INITIAL_VIEW_STATE = {
  latitude: 51.0500,
  longitude: 3.7303,
  zoom: 16,
  bearing: 0,
  pitch: 0
};
export default function Map({mode}) {

  const [pmTilesReady, setPmTilesReady] = useState(false)
  const [cursor, setCursor] = useState('auto');
  const [mapEntity, setMapEntity] = useState({});

  useEffect(() => {
    const protocol = new pmtiles.Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    setPmTilesReady(true)
  }, []);

  const [interactiveLayerIds, setInteractiveLayerIds] = useState(['places']);
  // const onInteractiveLayersChange = useCallback(layerFilter => {
  //   setInteractiveLayerIds(MAP_STYLE.layers.map(layer => layer.id).filter(layerFilter));
  // }, []);

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor('auto'), []);

  const onClick = useCallback(event => {
    const feature = event.features && event.features[0];


    if (feature) {
      setMapEntity(event.features[0].properties);
    }
  }, []);

  function getMapStyle() {
    let mapStyle;

    if (pmTilesReady){
     mapStyle =  mode === 'theme-light' ? MAP_STYLE : DARK_MAP_STYLE;
    } else {
      mapStyle = undefined;
    }
    return mapStyle;
  }

  return (
    <>
      <div className={`map ${mode}`}>
        <MapLibreMap
          id="myMap"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          cursor={cursor}
          hash={true}
          interactiveLayerIds={interactiveLayerIds}
          initialViewState={INITIAL_VIEW_STATE}
          mapStyle={getMapStyle()}
          style={{position: 'fixed', width: '100%', height: '100%'}}
        >
          <Source id="overture-places" type="vector" url={PLACES_PMTILES_URL}>
            <Layer {...PLACES_MAP_STYLE} />
          </Source>
          <NavigationControl position='top-right'></NavigationControl>
          <GeolocateControl />
        </MapLibreMap>
        <InspectorPanel entity={mapEntity}/>
      </div>
    </>
  );
}

Map.propTypes = {
  mode: PropTypes.string.isRequired
}
