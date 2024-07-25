import "./Sidecar.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

function Sidecar({ open, setOpen, map, setVisibleTypes }) {
  const handleParis = () => {
    setVisibleTypes([
      "land",
      "land cover",
      "land use",
      "water",
      "segment",
      "connector",
    ]);
    map.ref.current.jumpTo({
      center: [2.3417, 48.8552],
      zoom: 11.73,
      pitch: 12,
      bearing: 15.3,
    });
  };

  const handleNYC = () => {
    setVisibleTypes([
      "land",
      "land cover",
      "land use",
      "water",
      "building",
      "building_part",
    ]);
    map.ref.current.jumpTo({
      center: [-73.99768, 40.75332],
      zoom: 14.22,
      pitch: 60,
      bearing: 60.6,
    });
  };
  const handleVenice = () => {
    setVisibleTypes([
      "land",
      "land cover",
      "land use",
      "water",
      "infrastructure",
    ]);
    map.ref.current.jumpTo({
      center: [12.32545, 45.4299],
      zoom: 13.36,
      pitch: 52,
      bearing: 14.5,
    });
  };
  const handleLondon = () => {
    setVisibleTypes(["land", "land cover", "land use", "water", "place"]);
    map.ref.current.jumpTo({
      center: [-0.091217, 51.514511],
      zoom: 16.02,
      bearing: -24,
      pitch: 50,
    });
  };
  const handleBoston = () => {
    setVisibleTypes([
      "land",
      "land cover",
      "land use",
      "water",
      "segment",
      "addresse",
    ]);
    map.ref.current.jumpTo({
      center: [-71.065192, 42.353714],
      zoom: 15.94,
      bearing: 0,
      pitch: 52,
    });
  };
  return (
    <>
      {open ? (
        <div className="sidecar-modal">
          <div className="sidecar-box">
            <div className="sidecar-landing">
              <p className="sidecar-welcome">WELCOME</p>
              <button
                className="close-panel-button"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="close-panel-icon" />
              </button>
            </div>
            <div className="sidecar-header">Explore Overture</div>
            <div className="sidecar-blurb">
              Initially, we are focusing on layers for transportation, places,
              3D buildings, and administrative.
            </div>
            <div className="sidecar-container">
              <div className="sidecar-option paris">
                {" "}
                <button className="sidecar-option" onClick={handleParis}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  Paris Roads
                </button>
              </div>
              <div className="sidecar-option nyc">
                <button className="sidecar-option" onClick={handleNYC}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  NYC Buildings
                </button>
              </div>
              <div className="sidecar-option venice">
                <button className="sidecar-option" onClick={handleVenice}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  Venice Landcover
                </button>
              </div>
              <div className="sidecar-option london">
                <button className="sidecar-option" onClick={handleLondon}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  London Places
                </button>
              </div>
              <div className="sidecar-option boston">
                <button className="sidecar-option" onClick={handleBoston}>
                  <ArrowForwardIosIcon className="arrow-forward" />
                  Boston Addresses
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className="sidecar-icon" onClick={() => setOpen(true)}>
          <FlightTakeoffIcon className="plane-icon" />
        </button>
      )}{" "}
    </>
  );
}

export default Sidecar;
