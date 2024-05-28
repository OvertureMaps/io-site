import "./App.css";
import Header from "./nav/Header";
import Footer from "./Footer";
import Map from "./Map";
import { MapProvider } from "react-map-gl/maplibre";
import { keepTheme } from "./themeUtils";
import { useState, useEffect } from "react";
import Joyride from "react-joyride";
import Steps from "./Tour";

function App() {
  const [modeName, setModeName] = useState("theme-dark");

  useEffect(() => {
    keepTheme(setModeName);
  }, [setModeName]);

  return (
    <div>
      <Joyride
        steps={Steps}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        disableBeacon={true}
      />
      <MapProvider>
        <Header mode={modeName} setMode={setModeName} />
        <Map mode={modeName} />
        <Footer mode={modeName} />
      </MapProvider>
    </div>
  );
}

export default App;
