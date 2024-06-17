import TableRow from "./TableRow";
import "./BuildingsPanel.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import IndentIcon from "../icons/icon-indent.svg?react";

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
      <div className="theme">
        <strong>Theme: </strong>
        {entity["theme"]}
      </div>
      <div className="type">
        <strong>Type: </strong>
        {entity["type"]}
      </div>
      <div className="subtype">
        <IndentIcon /> <strong>Subtype: </strong>
        {entity["subtype"]}
      </div>
      <div className="id">
        <strong>ID: </strong>
        {entity["id"]}
      </div>
      <div className="sources">
        <strong>Source(s)</strong>{" "}
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
