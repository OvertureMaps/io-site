import './App.css';
import Header from './Header';
import Footer from './Footer';
import Map from './Map';
import {MapProvider} from 'react-map-gl/maplibre';
function App() {
  return (
    <MapProvider>
      <Header />
      <Map/>
      <Footer />
    </MapProvider>
  );
}

export default App;
