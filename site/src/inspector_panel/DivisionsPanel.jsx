import TableRow from "./TableRow";
import "./DivisionsPanel.css";
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
  "subtype",
  "version",
];
function DivisionsPanel({ entity }) {
  const [commonExpanded, setCommonExpanded] = useState(false);
  const [otherExpanded, setOtherExpanded] = useState(false);

  const hasSources = entity["sources"] != null;

  return (
    <div className="div-panel">
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
      </div>{" "}
      <div className="id">
        <strong>ID: </strong>
        {entity["id"] != null ? entity["id"] : "None Found"}
      </div>
      {hasSources ? (
        <div className="sources">
          <strong>Source(s): </strong>{" "}
          {JSON.parse(entity["sources"]).map(
            (source) => `${source["dataset"]}, `
          )}
        </div>
      ) : (
        <div className="sources">
          {" "}
          <strong>Source(s): </strong>None Found
        </div>
      )}
      <div className="common-properties">
        <table className="divisions-table">
          <caption className="common-props">
            <button
              className="divisions-table"
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
        <table className="divisions-table">
          <caption className="other-props">
            <button
              className="divisions-table"
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

export default DivisionsPanel;
