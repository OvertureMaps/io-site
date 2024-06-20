import TableRow from "./TableRow";
import "./BasePanel.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import IndentIcon from "../icons/icon-indent.svg?react";
import InfoToolTip from "./InfoToolTip";

const sharedProperties = [
  "theme",
  "type",
  "update_time",
  "id",
  "sources",
  "subtype",
  "version",
];

function BasePanel({ mode, entity }) {
  const [commonExpanded, setCommonExpanded] = useState(false);
  const [otherExpanded, setOtherExpanded] = useState(false);
  return (
    <div className="base-panel">
      <div className="panel-row theme">
        <div>
          <strong>Theme: </strong>
          {entity["theme"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={"placeholder"}
          target={"base-theme-tip"}
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
          target={"base-type-tip"}
        />
      </div>
      <div className="panel-row subtype">
        <div>
          <IndentIcon /> <strong>Subtype: </strong>
          {entity["subtype"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={"placeholder"}
          target={"base-subtype-tip"}
        />
      </div>
      <div className="panel-row id">
        <div>
          <strong>ID: </strong>
          {entity["id"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={"placeholder"}
          target={"base-id-tip"}
        />
      </div>
      <div className="panel-row sources">
        <div>
          <strong>Source(s):</strong>{" "}
          {JSON.parse(entity["sources"]).map((source) => source["dataset"])}
        </div>
        <InfoToolTip
          mode={mode}
          content={"placeholder"}
          target={"base-sources-tip"}
        />
      </div>
      <div className="common-properties">
        <table className="base-table">
          <caption className="common-props">
            <button
              className="base-table"
              onClick={() => setCommonExpanded(!commonExpanded)}
            >
              Common Properties{" "}
              {commonExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </caption>{" "}
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
        <table className="base-table">
          <caption className="other-props">
            <button
              className="base-table"
              onClick={() => setOtherExpanded(!otherExpanded)}
            >
              Other Properties{" "}
              {otherExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </caption>{" "}
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

export default BasePanel;
