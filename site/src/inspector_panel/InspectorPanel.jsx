import PropTypes from "prop-types";
import TableRow from "./TableRow";
import "./InspectorPanel.css";
import BasePanel from "./BasePanel";
import BuildingsPanel from "./BuildingsPanel";
import DivisionsPanel from "./DivisionsPanel";
import PlacesPanel from "./PlacesPanel";
import TransportationPanel from "./TransportationPanel";
import CloseIcon from "@mui/icons-material/Close";

function InspectorPanel({ mode, entity, setEntity }) {
  if (!entity) {
    return;
  }

  const theme = entity["theme"];

  let inspectorPanel = <div></div>;

  if (theme === "base") {
    inspectorPanel = <BasePanel mode={mode} entity={entity} />;
  } else if (theme === "buildings") {
    inspectorPanel = <BuildingsPanel mode={mode} entity={entity} />;
  } else if (theme === "divisions") {
    inspectorPanel = <DivisionsPanel mode={mode} entity={entity} />;
  } else if (theme === "places") {
    inspectorPanel = <PlacesPanel mode={mode} entity={entity} />;
  } else if (theme === "transportation") {
    inspectorPanel = <TransportationPanel mode={mode} entity={entity} />;
  } else {
    console.log("unhandled theme type");
    inspectorPanel = (
      <table>
        <tbody>
          {Object.keys(entity)
            .filter((key) => !key.startsWith("@"))
            .map((key) => (
              <TableRow table_key={key} entity={entity} />
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
