import TableRow from "./TableRow";
import "./BuildingsPanel.css";
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
  "usubtype",
  "version",
];

function BuildingsPanel({ mode, entity }) {
  const [commonExpanded, setCommonExpanded] = useState(false);
  const [otherExpanded, setOtherExpanded] = useState(false);
  return (
    <div className="build-panel">
      <div className="panel-row theme">
        <div>
          <strong>Theme: </strong>
          {entity["theme"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={
            "Describes human-made structures with roofs or interior spaces that are permanently or semi-permanently in one place."
          }
          target={"building-theme-tip"}
        />
      </div>
      <div className="panel-row type">
        <div>
          <strong>Type: </strong>
          {entity["type"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={
            "Describes the feature type of the entity. The building theme is split into two feature types: building, and building_part."
          }
          target={"building-type-tip"}
        />{" "}
      </div>
      <div className="panel-row subtype">
        <div>
          <IndentIcon /> <strong>Subtype: </strong>
          {entity["subtype"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={"A broad category of the building type and purpose."}
          target={"building-subtype-tip"}
        />
      </div>
      <div className="panel-row id">
        <div>
          <strong>ID: </strong>
          {entity["id"]}
        </div>
        <InfoToolTip
          mode={mode}
          content={
            "A feature ID that may be associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS."
          }
          target={"building-id-tip"}
        />
      </div>
      <div className="panel-row sources">
        <div>
          <strong>Source(s):</strong>{" "}
          {JSON.parse(entity["sources"]).map((source) => source["dataset"])}
        </div>
        <InfoToolTip
          mode={mode}
          content={
            "The array of source information for the properties of a given feature. Each source object lists the property in JSON Pointer notation and the dataset from which that specific value originated."
          }
          target={"building-sources-tip"}
        />
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

export default BuildingsPanel;
