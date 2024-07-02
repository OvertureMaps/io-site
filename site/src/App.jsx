import "./App.css";
import Header from "./nav/Header";
import Map from "./Map";
import { MapProvider } from "react-map-gl/maplibre";
import { keepTheme } from "./themeUtils";
import { useState, useEffect } from "react";
import Tour from "./Tour";
import StartupBox from "./StartupBox";
import Sidecar from "./Sidecar";

function App() {
  const [modeName, setModeName] = useState("theme-dark");
  const [run, setRun] = useState(false);
  const [tour, setTour] = useState(!(localStorage.getItem("tour") === "true"));
  const [open, setOpen] = useState(tour);
  const [sidecarOpen, setSidecarOpen] = useState(false);
  const [mapEntity, setMapEntity] = useState({});
  const [zoom, setZoom] = useState(16);

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
      <Tour
        run={run}
        modeName={modeName}
        setMapEntity={setMapEntity}
        setSidecar={setSidecarOpen}
      />
      <MapProvider>
        <Header
          mode={modeName}
          setMode={setModeName}
          zoom={zoom}
          setZoom={setZoom}
        />
        <Map
          mode={modeName}
          mapEntity={mapEntity}
          setMapEntity={setMapEntity}
          zoom={zoom}
          setZoom={setZoom}
          sidecarOpen={sidecarOpen}
          setSidecarOpen={setSidecarOpen}
        />
      </MapProvider>
    </div>
  );
}

export default App;
