import "./App.css";
import Header from "./nav/Header";
import Footer from "./Footer";
import Map from "./Map";
import { MapProvider } from "react-map-gl/maplibre";
import { keepTheme } from "./themeUtils";
import { useState, useEffect } from "react";
import Joyride from "react-joyride";
import Steps from "./Tour";
import StartupBox from "./StartupBox";

function App() {
  const [modeName, setModeName] = useState("theme-dark");
  const [run, setRun] = useState(false);
  const [tour, setTour] = useState(!Boolean(localStorage.getItem("tour")));
  const [open, setOpen] = useState(tour);

  const startTour = () => {
    setOpen(false);
    setRun(true);
  };

  const updateTour = (event) => {
    localStorage.setItem("tour", event.target.value);
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
      />
      <Joyride
        run={run}
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
