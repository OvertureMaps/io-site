import "./App.css";
import Header from "./nav/Header";
import Footer from "./Footer";
import Map from "./Map";
import { MapProvider } from "react-map-gl/maplibre";
import { keepTheme } from "./themeUtils";
import { useState, useEffect } from "react";
import Joyride from "react-joyride";
import Steps from "./Tour";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

function App() {
  const [modeName, setModeName] = useState("theme-dark");
  const [run, setRun] = useState(false);
  const [tour, setTour] = useState(true);
  const [open, setOpen] = useState(tour);

  const startTour = () => {
    setOpen(false);
    setRun(true);
  };

  const endTour = () => {
    setOpen(false);
    setTour(false);
  };

  useEffect(() => {
    keepTheme(setModeName);
  }, [setModeName]);

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Button onClick={startTour}>Start Tour</Button>
          <Button onClick={() => setOpen(false)}>Skip Tour</Button>
          <Button onClick={endTour}>Stop Tour</Button>
        </Box>
      </Modal>
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
