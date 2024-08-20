import "./Navigator.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useMap } from "react-map-gl/maplibre";

function Navigator({ open, setOpen, map, setVisibleTypes, setActiveThemes }) {
  const { myMap } = useMap();
  const handleParis = () => {
    setVisibleTypes([
      "division_area",
      "division_boundary",
      "land",
      "land_cover",
      "land_use",
      "water",
      "infrastructure",
      "segment",
      "connector",
      "building",
      "building_part",
    ]);
    setActiveThemes(["transportation"]);
    myMap.jumpTo({
      center: [2.3417, 48.8552],
      zoom: 11.73,
      pitch: 12,
      bearing: 15.3,
    });
  };

  const handleNYC = () => {
    setVisibleTypes([
      "division_boundary",
      "land",
      "land_cover",
      "land_use",
      "water",
      "infrastructure",
      "building",
      "building_part",
    ]);
    setActiveThemes(["buildings"]);
    myMap.jumpTo({
      center: [-73.99768, 40.75332],
      zoom: 14.22,
      pitch: 60,
      bearing: 60.6,
    });
  };
  const handleWorld = () => {
    setVisibleTypes([
      "land",
      "land_cover",
      "land_use",
      "water",
      "infrastructure",
    ]);
    setActiveThemes(["base"]);
    myMap.jumpTo({
      center: [10.3, 24.5],
      zoom: 1.07,
      bearing: 0,
      pitch: 0,
    });
  };
  const handleLondon = () => {
    setVisibleTypes([
      "division_area",
      "division_boundary",
      "land",
      "land_cover",
      "land_use",
      "water",
      "infrastructure",
      "segment",
      "building",
      "building_part",
      "place",
    ]);
    setActiveThemes(["places"]);
    myMap.jumpTo({
      center: [-0.091217, 51.514511],
      zoom: 16.02,
      bearing: -24,
      pitch: 50,
    });
  };
  const handleBoston = () => {
    setVisibleTypes([
      "division_boundary",
      "land",
      "land_cover",
      "land_use",
      "water",
      "infrastructure",
      "segment",
      "building",
      "building_part",
      "address",
    ]);
    setActiveThemes(["addresses"]);
    myMap.jumpTo({
      center: [-71.065192, 42.353714],
      zoom: 15.94,
      bearing: 0,
      pitch: 52,
    });
  };
  const handleAthens = () => {
    setVisibleTypes([
      "division_boundary",
      "land",
      "land_cover",
      "land_use",
      "water",
      "infrastructure",
      "segment",
    ]);
    setActiveThemes(["transportation"]);
    myMap.jumpTo({
      center: [23.63247, 37.94203],
      zoom: 14.83,
      bearing: -142.3,
      pitch: 60,
    });
  };
  const handleHongKong = () => {
    setVisibleTypes([
      "division_boundary",
      "land",
      "land_cover",
      "land_use",
      "water",
      "infrastructure",
      "segment",
      "connector",
      "building",
      "building_part",
    ]);
    setActiveThemes(["buildings"]);
    myMap.jumpTo({
      center: [114.15284, 22.2934],
      zoom: 14.83,
      bearing: 96.2,
      pitch: 60,
    });
  };
  return (
    <>
      {open ? (
        <div className="navigator-modal">
          <div className="navigator-box">
            <div className="navigator-landing">
              <p className="navigator-welcome">NAVIGATE</p>
              <button
                className="close-panel-button"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="close-panel-icon" />
              </button>
            </div>
            <div className="navigator-header">Explore Overture</div>
            <div className="navigator-blurb">
              We've picked a few spots around the world you might be interested
              in seeing.
            </div>
            <div className="navigator-container">
              <div className="navigator-option paris" onClick={handleParis}>
                <button className="navigator-option" onClick={handleParis}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  Paris Roads
                </button>
              </div>
              <div className="navigator-option nyc" onClick={handleNYC}>
                <button className="navigator-option" onClick={handleNYC}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  NYC Buildings
                </button>
              </div>
              <div className="navigator-option world" onClick={handleWorld}>
                <button className="navigator-option" onClick={handleWorld}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  World Landcover
                </button>
              </div>
              <div className="navigator-option london" onClick={handleLondon}>
                <button className="navigator-option" onClick={handleLondon}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  London Places
                </button>
              </div>
              <div className="navigator-option boston" onClick={handleBoston}>
                <button className="navigator-option" onClick={handleBoston}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  Boston Addresses
                </button>
              </div>
              <div className="navigator-option athens" onClick={handleAthens}>
                <button className="navigator-option" onClick={handleAthens}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  Athens Shipping Lines
                </button>
              </div>
              <div
                className="navigator-option hongkong"
                onClick={handleHongKong}
              >
                <button className="navigator-option" onClick={handleHongKong}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  Hong Kong Port
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className="navigator-icon" onClick={() => setOpen(true)}>
          <FlightTakeoffIcon className="plane-icon" />
        </button>
      )}{" "}
    </>
  );
}

export default Navigator;
