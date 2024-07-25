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
    content: "These options changes the visible layers of data on the map.",
    disableBeacon: true,
    title: "Theme Selector",
    placement: "auto",
    offset: 0,
  },
  {
    target: ".tour-layers-checkboxes",
    content:
      "Altering the visibility at the theme level is available, as well as at a more granular type level",
    disableBeacon: true,
    title: "Change Layer Visibility",
    placement: "auto",
    offset: 0,
  },
  {
    target: ".tour-layers-pins",
    content:
      "This button highlights the related theme. Multiple can be selected at the same time, and the button is also available via the inspector panel.",
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
      "This is where you can file bug reports! Follow this link, and fill out the appropriate github workflow.",
    disableBeacon: true,
    title: "Github Issue Link",
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

function Tour({ run, modeName, setMapEntity, themeRef }) {
  const [stepIndex, setStepIndex] = useState(0);

  const stepBGColor =
    modeName === "theme-dark" ? "dimgray" : "var(--ifm-color-secondary-light)";
  const stepTextColor =
    modeName === "theme-dark" ? "var(--ifm-color-secondary-light)" : "black";

  const handleJoyrideCallback = (event) => {
    console.log(event);
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(event.type)) {
      const nextStepIndex =
        event.index + (event.action === ACTIONS.PREV ? -1 : 1);
      if (
        (event.index === 3) &
        (event.lifecycle === LIFECYCLE.COMPLETE) &
        (event.action === ACTIONS.NEXT)
      ) {
        themeRef.current.click();
        setTimeout(() => {
          setStepIndex(nextStepIndex);
        }, 100);
      } else if (
        (event.index === 5) &
        (event.lifecycle === LIFECYCLE.COMPLETE)
      ) {
        themeRef.current.click();
        setTimeout(() => {
          setStepIndex(nextStepIndex);
        }, 100);
      } else if (
        (event.index === 7) &
        (event.lifecycle === LIFECYCLE.COMPLETE) &
        (event.action === ACTIONS.NEXT)
      ) {
        setMapEntity(sampleFeature.properties);
        setTimeout(() => {
          setStepIndex(nextStepIndex);
        }, 100);
      } else if (
        (event.index === 8) &
        (event.lifecycle === LIFECYCLE.COMPLETE)
      ) {
        setMapEntity({});
        setStepIndex(nextStepIndex);
      } else {
        setStepIndex(nextStepIndex);
      }
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
