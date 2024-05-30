import "./App.css";
import Header from "./nav/Header";
import Footer from "./Footer";
import Map from "./Map";
import { MapProvider } from "react-map-gl/maplibre";
import { keepTheme } from "./themeUtils";
import { useState, useEffect } from "react";
import Tour from "./Tour";
import StartupBox from "./StartupBox";

function App() {
  const [modeName, setModeName] = useState("theme-dark");
  const [run, setRun] = useState(false);
  const [tour, setTour] = useState(!(localStorage.getItem("tour") === "true"));
  const [open, setOpen] = useState(tour);
  const [mapEntity, setMapEntity] = useState({});

  const startTour = () => {
    setOpen(false);
    setRun(true);
  };

  const updateTour = (event) => {
    localStorage.setItem("tour", event.target.checked);
    setTour(!tour);
  };

  useEffect(() => {
    keepTheme(setModeName);
  }, [setModeName]);

  return (
    <div>
      <StartupBox
        startTour={startTour}
        updateTour={updateTour}
        open={open}
        setOpen={setOpen}
        mode={modeName}
      />
      <Tour run={run} modeName={modeName} setMapEntity={setMapEntity} />
      <MapProvider>
        <Header mode={modeName} setMode={setModeName} />
        <Map
          mode={modeName}
          mapEntity={mapEntity}
          setMapEntity={setMapEntity}
        />
        <Footer mode={modeName} />
      </MapProvider>
    </div>
  );
}

export default App;
