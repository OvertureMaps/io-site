import PropTypes from "prop-types";
import TableRow from "./TableRow";
import "./InspectorPanel.css";
import CloseIcon from "@mui/icons-material/Close";
import ThemePanel from "./ThemePanel";
import {
  BASE_TIPS,
  BUILDING_TIPS,
  DIVISION_TIPS,
  PLACES_TIPS,
  TRANSPORTATION_TIPS,
} from "./TipLibrary";

function InspectorPanel({ mode, entity, setEntity }) {
  if (!entity) {
    return;
  }

  const theme = entity["theme"];

  let inspectorPanel = <div></div>;

  if (theme === "base") {
    inspectorPanel = (
      <ThemePanel mode={mode} entity={entity} tips={BASE_TIPS} />
    );
  } else if (theme === "buildings") {
    inspectorPanel = (
      <ThemePanel mode={mode} entity={entity} tips={BUILDING_TIPS} />
    );
  } else if (theme === "divisions") {
    inspectorPanel = (
      <ThemePanel mode={mode} entity={entity} tips={DIVISION_TIPS} />
    );
  } else if (theme === "places") {
    inspectorPanel = (
      <ThemePanel mode={mode} entity={entity} tips={PLACES_TIPS} />
    );
  } else if (theme === "transportation") {
    inspectorPanel = (
      <ThemePanel mode={mode} entity={entity} tips={TRANSPORTATION_TIPS} />
    );
  } else {
    console.log("unhandled theme type");
    inspectorPanel = (
      <table>
        <tbody>
          {Object.keys(entity)
            .filter((key) => !key.startsWith("@"))
            .map((key) => (
              <TableRow mode={mode} table_key={key} entity={entity} />
            ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="inspector-panel">
      <div className="panel-header">
        <h4>Inspector Panel</h4>
        <button className="close-panel-button" onClick={() => setEntity({})}>
          <CloseIcon className="close-panel-icon" />
        </button>
      </div>
      {inspectorPanel}
      <p>
        <a
          href="https://docs.overturemaps.org/schema/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Overture Schema Reference
        </a>
      </p>
    </div>
  );
}

InspectorPanel.propTypes = {
  entity: PropTypes.object,
};
export default InspectorPanel;
