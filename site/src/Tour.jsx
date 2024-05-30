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
    content: "This button enables dark/light mode for the site.",
    disableBeacon: true,
    title: "Darkmode Toggle",
    placement: "bottom-end",
    offset: 0,
  },
  {
    target: ".tour-download",
    content: "This button will download all data within view.",
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
    target: ".maplibregl-ctrl-top-right",
    content: "These tools faciliate navigation of the world map.",
    disableBeacon: true,
    title: "Map Navigation Tools",
    placement: "auto",
    offset: 0,
  },
  {
    target: ".inspector-panel",
    content: "This is the inspector panel.",
    disableBeacon: true,
    title: "Inspector Panel",
    placement: "right",
    offset: 0,
  },
  {
    target: ".maplibregl-ctrl-bottom-right",
    content: "This is the map footer.",
    disableBeacon: true,
    title: "Map Footer",
    placement: "top-end",
    offset: -10,
  },
];

export default Steps;
