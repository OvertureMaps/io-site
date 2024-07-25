import TableRow from "./TableRow";
import "./ThemePanel.css";
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

function ThemePanel({ mode, entity, tips }) {
  const [commonExpanded, setCommonExpanded] = useState(false);
  const [otherExpanded, setOtherExpanded] = useState(false);

  return (
    <div className="theme-panel">
      <div className="panel-row theme">
        <div>
          <strong>Theme: </strong>
          {entity["theme"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={tips.theme}
          target={"theme-theme-tip"}
        />
      </div>
      <div className="panel-row type">
        <div>
          <strong>Type: </strong>
          {entity["type"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={tips.type}
          target={"theme-type-tip"}
        />
      </div>
      {entity["subtype"] ? (
        <div className="panel-row subtype">
          <div>
            <IndentIcon /> <strong>Subtype: </strong>
            {entity["subtype"]}
          </div>
          <InfoToolTip
            mode={mode}
            content={tips.subtype}
            target={"theme-subtype-tip"}
          />
        </div>
      ) : (
        <></>
      )}
      {entity["id"] ? (
        <div className="panel-row id">
          <div>
            <strong>ID: </strong>
            {entity["id"]}
          </div>
          <InfoToolTip mode={mode} content={tips.id} target={"theme-id-tip"} />
        </div>
      ) : (
        <></>
      )}
      {entity["sources"] ? (
        <div className="panel-row sources">
          <div>
            <strong>Source(s):</strong>{" "}
            {[...new Set(JSON.parse(entity["sources"]).map((source) => source["dataset"]))].join(', ')}
          </div>
          <InfoToolTip
            mode={mode}
            content={tips.source}
            target={"theme-sources-tip"}
          />
        </div>
      ) : (
        <></>
      )}
      {entity["class"] ? (
        <div className="panel-row class">
          <div>
            <strong>Class:</strong> {entity["class"]}
          </div>
          <InfoToolTip
            mode={mode}
            content={tips.class}
            target={"theme-class-tip"}
          />{" "}
        </div>
      ) : (
        ""
      )}
      <div className="common-properties">
        <table className="theme-table">
          <caption className="common-props">
            <button
              className="theme-table"
              onClick={() => setCommonExpanded(!commonExpanded)}
            >
              Common Properties{" "}
              {commonExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </caption>{" "}
          {commonExpanded ? (
            <tbody>
              {["update_time", "version"].map((key) => (
                <TableRow
                  key={key}
                  mode={mode}
                  table_key={key}
                  entity={entity}
                />
              ))}
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </table>
      </div>
      <div className="other-properties">
        <table className="theme-table">
          <caption className="other-props">
            <button
              className="theme-table"
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
                  <TableRow
                    key={key}
                    mode={mode}
                    table_key={key}
                    entity={entity}
                  />
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

export default ThemePanel;
