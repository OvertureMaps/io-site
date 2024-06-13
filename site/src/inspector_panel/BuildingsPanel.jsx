import TableRow from "./TableRow";
import "./BuildingsPanel.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const sharedProperties = [
  "theme",
  "type",
  "update_time",
  "id",
  "sources",
  "usubtype",
  "version",
];

function BuildingsPanel({ entity }) {
  const [commonExpanded, setCommonExpanded] = useState(false);
  const [otherExpanded, setOtherExpanded] = useState(false);
  return (
    <div className="build-panel">
      <div className="theme">Theme: {entity["theme"]}</div>
      <div className="type">Type: {entity["type"]}</div>
      <div className="subtype">Subtype: {entity["subtype"]}</div>
      <div className="id"> ID: {entity["id"]}</div>
      <div className="sources">
        Sources:{" "}
        {JSON.parse(entity["sources"]).map((source) => source["dataset"])}
      </div>
      <div className="common-properties">
        <table className="building-table">
          <caption className="common-props">
            <button
              className="building-table"
              onClick={() => setCommonExpanded(!commonExpanded)}
            >
              Common Properties{" "}
              {commonExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </caption>
          {commonExpanded ? (
            <tbody>
              {["update_time", "version"].map((key) => (
                <TableRow table_key={key} entity={entity} />
              ))}
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </table>
      </div>
      <div className="other-properties">
        <table className="building-table">
          <caption className="other-props">
            <button
              className="building-table"
              onClick={() => setOtherExpanded(!otherExpanded)}
            >
              Other Properties{" "}
              {otherExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </caption>
          {otherExpanded ? (
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

export default BuildingsPanel;
