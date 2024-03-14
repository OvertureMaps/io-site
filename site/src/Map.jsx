import { Map as MapLibreMap, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const INITIAL_VIEW_STATE = {
  latitude: 51.0500,
  longitude: 3.7303,
  zoom: 16,
  bearing: 0,
  pitch: 0
};
export default function Map() {
  return (
    <div className="map">
    <MapLibreMap
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={MAP_STYLE}
      >
        <NavigationControl position='top-right'></NavigationControl>
        </MapLibreMap>
    </div>
  );
}
