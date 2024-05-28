import "./App.css";
import Header from "./nav/Header";
import Footer from "./Footer";
import Map from "./Map";
import { MapProvider } from "react-map-gl/maplibre";
import { keepTheme } from "./themeUtils";
import { useState, useEffect } from "react";
import Joyride from "react-joyride";

const steps = [
  {
    target: ".tour-homepage",
    content: "This is a link to Overture Maps homepage.",
  },
  {
    target: ".tour-darkmode",
    content: "This button enables dark/light mode for the site.",
  },
  {
    target: ".tour-download",
    content: "This button will download all data within view.",
  },
  {
    target: ".tour-layers",
    content: "These options changes the visible datalayers on the map.",
  },
  {
    target: ".maplibregl-ctrl-top-right",
    content: "These tools faciliate navigation of the world map.",
  },
];

function App() {
  const [modeName, setModeName] = useState("theme-dark");

  useEffect(() => {
    keepTheme(setModeName);
  }, [setModeName]);

  return (
    <div>
      <Joyride steps={steps} continuous={true} />
      <MapProvider>
        <Header mode={modeName} setMode={setModeName} />
        <Map mode={modeName} />
        <Footer mode={modeName} />
      </MapProvider>
    </div>
  );
}

export default App;
