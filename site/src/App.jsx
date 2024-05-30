import "./App.css";
import Header from "./nav/Header";
import Footer from "./Footer";
import Map from "./Map";
import { MapProvider } from "react-map-gl/maplibre";
import { keepTheme } from "./themeUtils";
import { useState, useEffect } from "react";
import Joyride, { ACTIONS, EVENTS, LIFECYCLE } from "react-joyride";
import Steps from "./Tour";
import StartupBox from "./StartupBox";

const sampleFeature = {
  geometry: {
    type: "Point",
    coordinates: [3.7302714586257935, 51.05027395815554],
  },
  type: "Feature",
  properties: {
    id: "08f194db132d2b6d0388899915aac1fc",
    "@name": "Grill Mix Centrum",
    "@category": "bar_and_grill_restaurant",
    names: '{"primary":"Grill Mix Centrum","common":null,"rules":null}',
    confidence: 0.9584614231086451,
    categories:
      '{"main":"bar_and_grill_restaurant","alternate":["pizza_restaurant","doner_kebab"]}',
    websites: '["http://www.pizzacity.be"]',
    socials: '["https://www.facebook.com/612060042296776"]',
    phones: '["+3292257440"]',
    addresses:
      '[{"freeform":"Vlaanderenstraat 85","locality":"Gent","postcode":"9000","region":null,"country":"BE"}]',
    version: 0,
    update_time: "2024-04-11T00:00:00.000Z",
    sources:
      '[{"property":"","dataset":"meta","record_id":"612060042296776","confidence":null}]',
  },
  id: 38848842,
  layer: {
    id: "places",
    type: "circle",
    source: "overture-places",
    "source-layer": "places",
    filter: [">=", ["get", "confidence"], 0],
    layout: {},
    paint: {
      "circle-color": {
        r: 0.792156862745098,
        g: 0.6980392156862745,
        b: 0.8392156862745098,
        a: 1,
      },
      "circle-radius": 1.8749883174673414,
      "circle-stroke-width": 2,
      "circle-stroke-color": {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      },
    },
  },
  source: "overture-places",
  sourceLayer: "places",
  state: {},
};

function App() {
  const [modeName, setModeName] = useState("theme-dark");
  const [run, setRun] = useState(false);
  const [tour, setTour] = useState(!(localStorage.getItem("tour") === "true"));
  const [open, setOpen] = useState(tour);
  const [mapEntity, setMapEntity] = useState({});
  const [stepIndex, setStepIndex] = useState(0);

  const startTour = () => {
    setOpen(false);
    setRun(true);
  };

  const stepBGColor = modeName === "theme-dark" ? "dimgray" : "whitesmoke";
  const stepTextColor = modeName === "theme-dark" ? "whitesmoke" : "black";

  const updateTour = (event) => {
    localStorage.setItem("tour", event.target.checked);
    setTour(!tour);
  };

  const handleJoyrideCallback = (event) => {
    console.log(event);
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(event.type)) {
      const nextStepIndex =
        event.index + (event.action === ACTIONS.PREV ? -1 : 1);
      if (
        (event.index === 4) &
        (event.lifecycle === LIFECYCLE.COMPLETE) &
        (event.action === ACTIONS.NEXT)
      ) {
        setMapEntity(sampleFeature.properties);
        setTimeout(() => {
          setStepIndex(nextStepIndex);
        }, 100);
      } else if (
        (event.index === 5) &
        (event.lifecycle === LIFECYCLE.COMPLETE)
      ) {
        setMapEntity({});
        setStepIndex(nextStepIndex);
      } else {
        setStepIndex(nextStepIndex);
      }
    }
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
      <Joyride
        callback={handleJoyrideCallback}
        run={run}
        steps={Steps}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        disableBeacon={true}
        stepIndex={stepIndex}
        styles={{
          options: {
            backgroundColor: stepBGColor,
            arrowColor: stepBGColor,
            textColor: stepTextColor,
          },
        }}
        spotlightPadding={0}
      />
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
