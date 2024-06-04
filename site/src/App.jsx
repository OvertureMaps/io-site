import "./App.css";
import Header from "./nav/Header";
import Footer from "./Footer";
import Map from "./Map";
import { MapProvider } from "react-map-gl/maplibre";
import { keepTheme } from "./themeUtils";
import { useState, useEffect } from "react";

function App() {
  const [modeName, setModeName] = useState("theme-dark");
  const [zoom, setZoom] = useState(16);

  useEffect(() => {
    keepTheme(setModeName);
  }, [setModeName]);

  return (
    <MapProvider>
      <Header mode={modeName} setMode={setModeName} zoom={zoom} />
      <Map mode={modeName} setZoom={setZoom} />
      <Footer mode={modeName} />
    </MapProvider>
  );
}

export default App;
