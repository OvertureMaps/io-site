import TableRow from "./TableRow";
import "./TransportationPanel.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import InfoToolTip from "./InfoToolTip";

const sharedProperties = ["theme", "type"];

function TransportationPanel({ mode, entity }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="trans-panel">
      <div className="panel-row theme">
        <div>
          <strong>Theme: </strong>
          {entity["theme"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={"placeholder"}
          target={"trans-theme-tip"}
        />
      </div>
      <div className="panel-row type">
        <div>
          <strong>Type: </strong>
          {entity["type"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={"placeholder"}
          target={"trans-type-tip"}
        />
      </div>
      <div className="other-properties">
        <table className="trans-table">
          <caption className="other-props">
            <button className="trans-table" onClick={toggleExpanded}>
              Other Properties{" "}
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </caption>
          {expanded ? (
            <tbody>
              {Object.keys(entity)
                .filter((key) => !key.startsWith("@"))
                .filter((key) => !sharedProperties.includes(key))
                .map((key) => (
                  <TableRow mode={mode} table_key={key} entity={entity} />
                ))}
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default TransportationPanel;
