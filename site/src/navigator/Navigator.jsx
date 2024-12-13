import "./Navigator.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useMap } from "react-map-gl/maplibre";
import { tours } from "./NavigatorConfig";

function Navigator({ open, setOpen, map, setVisibleTypes, setActiveThemes }) {
  const { myMap } = useMap();

  const handleTourSelect = (tourId) => {
    const tour = tours[tourId];
    setVisibleTypes(tour.visibleTypes);
    setActiveThemes([tour.theme]);
    myMap.jumpTo(tour.view);
  };

  return (
    <>
      {open ? (
        <div className="navigator-modal">
          <div className="navigator-box">
            <div className="navigator-landing">
              <h4 className="title">Explore Overture</h4>
              <button
                className="close-panel-button"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="close-panel-icon" />
              </button>
            </div>
            <div className="navigator-blurb">
              We've picked a few spots around the world you might be interested
              in seeing.
            </div>
            <div className="navigator-container">
              {Object.entries(tours).map(([id, tour]) => (
                <div
                  key={id}
                  className={`navigator-option ${id}`}
                  onClick={() => handleTourSelect(id)}
                >
                  <button
                    className="navigator-option"
                    onClick={() => handleTourSelect(id)}
                  >
                    <ArrowForwardIosIcon className="arrow-forward" />
                    {tour.title}
                  </button>
                </div>
              ))}
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
