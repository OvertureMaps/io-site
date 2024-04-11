import { Map as MapLibreMap, NavigationControl, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as pmtiles from 'pmtiles';
import maplibregl from 'maplibre-gl';
import { useState, useEffect } from 'react';
import { Layer } from 'react-map-gl';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const PLACES_PMTILES_URL = 'pmtiles://https://r2-public.protomaps.com/overture-tiles/2023-10-19-alpha.0/places.pmtiles';
const PLACES_MAP_STYLE = {
  'id': 'overture-pois',
  'type': 'circle',
  'source': 'overture-pois',
  'source-layer': 'pois',
  'filter': [">=", ["get", "confidence"], 0.0],
  'paint': {
    'circle-color':
      ['case',
        ['==', ['get', 'category_main'], 'beauty_salon'], '#fb9a99',
        ['==', ['get', 'category_main'], 'hotel'], '#33a02c',
        ['==', ['get', 'category_main'], 'landmark_and_historical_building'], '#a6cee3',
        ['==', ['get', 'category_main'], 'professional_services'], '#fdbf6f',
        ['==', ['get', 'category_main'], 'shopping'], '#e31a1c',
        ['==', ['get', 'category_main'], 'restaurant'], '#1f78b4',
        ['==', ['get', 'category_main'], 'school'], '#ff7f00',
        ['==', ['get', 'category_main'], 'accommodation'], '#b2df8a',
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
export default function Map() {

  const [pmTilesReady, setPmTilesReady] = useState(false)

  useEffect(() => {
    const protocol = new pmtiles.Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    setPmTilesReady(true)
  }, []);

  return (
    <div className="map">
    <MapLibreMap
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={pmTilesReady ? MAP_STYLE: undefined }
      >
        <Source id="overture-places" type="vector" url={PLACES_PMTILES_URL}>
          <Layer {...PLACES_MAP_STYLE} />
        </Source>
        <NavigationControl position='top-right'></NavigationControl>
        </MapLibreMap>
    </div>
  );
}
