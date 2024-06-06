import "./App.css";
import Header from "./nav/Header";
import Map from "./Map";
import { MapProvider } from "react-map-gl/maplibre";
import { keepTheme } from "./themeUtils";
import { useState, useEffect } from "react";

function App() {
  const [modeName, setModeName] = useState("theme-dark");

  useEffect(() => {
    keepTheme(setModeName);
  }, [setModeName]);

  return (
    <MapProvider>
      <Header mode={modeName} setMode={setModeName} />
      <Map mode={modeName} />
    </MapProvider>
  );
}

export default App;
