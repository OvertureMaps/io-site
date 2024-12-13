import Joyride, { ACTIONS, EVENTS, LIFECYCLE } from "react-joyride";
import { useState } from "react";
import LayerIcon from "./icons/icon-layers.svg?react";

const Steps = [
  {
    target: ".tour-homepage",
    content: "This is a link to Overture Maps homepage.",
    disableBeacon: true,
    title: "Homepage Link",
    placement: "auto",
    offset: 0,
  },
  {
    target: ".tour-darkmode",
    content: "This button enables dark mode for the site.",
    disableBeacon: true,
    title: "Darkmode Toggle",
    placement: "bottom-end",
    offset: 0,
  },
  {
    target: ".tour-download",
    content:
      "This button will download all data within view. Downloads are disabled at low zoom levels to stop downloads of large sizes.",
    disableBeacon: true,
    title: "Download Button",
    placement: "bottom-end",
    offset: 0,
  },
  {
    target: ".tour-layers",
    content:
      "These options change style and visibility of the different layers.",
    disableBeacon: true,
    title: "Theme Selector",
    placement: "auto",
    offset: 0,
  },
  {
    target: ".tour-layers-checkboxes",
    content:
      "Visibility Toggles are available at both the 'theme' and 'type' levels.",
    disableBeacon: true,
    title: "Change Layer Visibility",
    placement: "auto",
    offset: 0,
  },
  {
    target: ".tour-layers-pins",
    content:
      "This button sets a theme as active. Active themes are highlighted and receive click-to-select priority.",
    disableBeacon: true,
    title: "Highlight Themes",
    placement: "auto",
    offset: 0,
  },
  {
    target: ".maplibregl-ctrl-top-right",
    content: "These tools faciliate navigation of the world map.",
    disableBeacon: true,
    title: "Map Navigation Tools",
    placement: "auto",
    offset: 0,
  },
  {
    target: ".bug-nub-link",
    content:
      "This is where you can file bug reports! Follow this link, and fill out the appropriate GitHub workflow.",
    disableBeacon: true,
    title: "GitHub Issue Link",
    placement: "left",
    offset: 0,
  },
  {
    target: ".inspector-panel",
    content:
      "This is the inspector panel. Clicking on features in the world will display them here. These features are only clickable after a zoom threshold has been reached.",
    disableBeacon: true,
    title: "Inspector Panel",
    placement: "right",
    offset: 0,
  },
  {
    target: ".maplibregl-ctrl-bottom-right",
    content:
      "This is the map footer. Credits and copyrights can be found here.",
    disableBeacon: true,
    title: "Map Footer",
    placement: "top-end",
    offset: 0,
  },
];

const sampleFeature = {
  geometry: {
    type: "Point",
    coordinates: [3.7302714586257935, 51.05027395815554],
  },
  type: "Feature",
  properties: {
    theme: "places",
    type: "place",
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

function Tour({ run, modeName, setFeatures, setNavigatorOpen, themeRef }) {
  const [stepIndex, setStepIndex] = useState(0);

  const stepBGColor =
    modeName === "theme-dark" ? "dimgray" : "var(--ifm-color-secondary-light)";
  const stepTextColor =
    modeName === "theme-dark" ? "var(--ifm-color-secondary-light)" : "black";

  const targets = Steps.map((step) => step["target"]);

  /*
  This function deals with the progress of the tour, and handling any events that take place during.
  Each "step" has typically 3 events associated with it. Therefore, we must check that events only
  take place once, which is why we check the event lifecycle. In addition, we must check the action of
  the event (next, prev, skip, etc). This is a tedious and granular process, but it allows the tour
  to be very controlled and open/close different parts and pieces of the explorer site to show them 
  all off. 
  */
  const handleJoyrideCallback = (event) => {
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(event.type)) {
      const nextStepIndex =
        event.index + (event.action === ACTIONS.PREV ? -1 : 1);
      if (
        (event.index === targets.indexOf(".tour-layers")) &
        (event.lifecycle === LIFECYCLE.COMPLETE) &
        (event.action === ACTIONS.NEXT)
      ) {
        themeRef.current.click();
        setTimeout(() => {
          setStepIndex(nextStepIndex);
        }, 100);
      } else if (
        (event.index === targets.indexOf(".tour-layers-checkboxes")) &
        (event.lifecycle === LIFECYCLE.COMPLETE) &
        (event.action === ACTIONS.PREV)
      ) {
        themeRef.current.click();
        setStepIndex(nextStepIndex);
      } else if (
        (event.index === targets.indexOf(".tour-layers-pins")) &
        (event.lifecycle === LIFECYCLE.COMPLETE)
      ) {
        if (event.action === ACTIONS.PREV) {
          setStepIndex(nextStepIndex);
        } else {
          themeRef.current.click();
          setStepIndex(nextStepIndex);
        }
      } else if (
        (event.index === targets.indexOf(".maplibregl-ctrl-top-right")) &
        (event.lifecycle === LIFECYCLE.COMPLETE) &
        (event.action === ACTIONS.PREV)
      ) {
        themeRef.current.click();
        setTimeout(() => {
          setStepIndex(nextStepIndex);
        }, 100);
      } else if (
        (event.index === targets.indexOf(".bug-nub-link")) &
        (event.lifecycle === LIFECYCLE.COMPLETE) &
        (event.action === ACTIONS.NEXT)
      ) {
        // setFeatures([{ properties: sampleFeature.properties }]);
        setTimeout(() => {
          setStepIndex(nextStepIndex);
        }, 100);
      } else if (
        (event.index === targets.indexOf(".inspector-panel")) &
        (event.lifecycle === LIFECYCLE.COMPLETE)
      ) {
        // setFeatures({});
        setStepIndex(nextStepIndex);
      } else if (
        (event.index === targets.indexOf(".maplibregl-ctrl-bottom-right")) &
        (event.lifecycle === LIFECYCLE.COMPLETE)
      ) {
        if (event.action === ACTIONS.NEXT) {
          setNavigatorOpen(true);
          setStepIndex(nextStepIndex);
        } else if (event.action === ACTIONS.PREV) {
          // setFeatures(sampleFeature.properties);
          setTimeout(() => {
            setStepIndex(nextStepIndex);
          }, 100);
        }
      } else {
        setStepIndex(nextStepIndex);
      }
    } else if (event.action === ACTIONS.SKIP) {
      if (event.index === targets.indexOf(".inspector-panel")) setFeatures([]);
      else if (
        (event.index === targets.indexOf(".tour-layers-checkboxes")) |
        (event.index === targets.indexOf(".tour-layers-pins"))
      )
        themeRef.current.click();
      setNavigatorOpen(true);
    }
  };

  return (
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
        buttonNext:
          modeName === "theme-dark"
            ? {
                backgroundColor: "var(--ifm-color-primary-lightest)",
                color: stepBGColor,
                fontWeight: "600",
              }
            : {
                backgroundColor: "var(--ifm-color-primary)",
                fontWeight: "600",
              },
        buttonBack:
          modeName === "theme-dark"
            ? {
                color: "var(--ifm-color-primary-lightest)",
                fontWeight: "600",
                opacity: "90%",
                borderRadius: "4px",
              }
            : { color: "var(--ifm-color-primary)", fontWeight: "600" },
        buttonSkip: { fontWeight: "600" },
      }}
      spotlightPadding={0}
    />
  );
}

export default Tour;
