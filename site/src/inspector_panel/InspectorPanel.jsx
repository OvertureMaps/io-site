import PropTypes from "prop-types";
import TableRow from "./TableRow";
import "./InspectorPanel.css";
import BasePanel from "./BasePanel";
import BuildingsPanel from "./BuildingsPanel";
import DivisionsPanel from "./DivisionsPanel";
import PlacesPanel from "./PlacesPanel";
import TransportationPanel from "./TransportationPanel";

function InspectorPanel({ entity }) {
  if (!entity) {
    return;
  }

  const theme = entity["theme"];

  let inspectorPanel = <div></div>;

  if (theme === "base") {
    inspectorPanel = <BasePanel entity={entity} />;
  } else if (theme === "buildings") {
    inspectorPanel = <BuildingsPanel entity={entity} />;
  } else if (theme === "divisions") {
    inspectorPanel = <DivisionsPanel entity={entity} />;
  } else if (theme === "places") {
    inspectorPanel = <PlacesPanel entity={entity} />;
  } else if (theme === "transportation") {
    inspectorPanel = <TransportationPanel entity={entity} />;
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
      <h4>Inspector Panel</h4>
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