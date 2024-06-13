import TableRow from "./TableRow";
import "./TransportationPanel.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const sharedProperties = ["theme", "type"];

function TransportationPanel({ entity }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="trans-panel">
      <div className="theme">Theme: {entity["theme"]}</div>
      <div className="type">Type: {entity["type"]}</div>
      <div className="other-properties">
        <table>
          <caption className="other-props">
            <button onClick={toggleExpanded}>
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
                  <TableRow table_key={key} entity={entity} />
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
