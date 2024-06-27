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
          content={
            "Provides the land and water features that are necessary to render a complete basemap."
          }
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
          content={
            "Describes the feature type of the entity. The base theme is split into five feature types: infrastructure, land, land_cover, land_use, and water."
          }
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
          content={"Further description of the feature type."}
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
          content={
            "A feature ID. This may be an ID associated with the Global Entity Reference System (GERS) if—and-only-if the feature represents an entity that is part of GERS."
          }
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
          content={
            "The array of source information for the properties of a given feature, with each entry being a source object which lists the property in JSON Pointer notation and the dataset that specific value came from. All features must have a root level source which is the default source if a specific property's source is not specified."
          }
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

export default BasePanel;
