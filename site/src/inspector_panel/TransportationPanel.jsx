import TableRow from "./TableRow";
import "./TransportationPanel.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import InfoToolTip from "./InfoToolTip";
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
function TransportationPanel({ mode, entity }) {
  const [commonExpanded, setCommonExpanded] = useState(false);
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
          content={
            "The collection of features and attributes that describe the infrastructure and conventions of how people and objects travel around the world. "
          }
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
          content={
            "Further describes the entity. The transportation theme contains the segment feature type and the connector feature type."
          }
          target={"trans-type-tip"}
        />
      </div>
      {entity["subtype"] ? (
        <div className="panel-row subtype">
          {" "}
          <div>
            {" "}
            <IndentIcon /> <strong>Subtype: </strong> {entity["subtype"]}
          </div>
          <InfoToolTip
            mode={mode}
            content={"Further describes the feature type."}
            target={"trans-subtype-tip"}
          />
        </div>
      ) : (
        ""
      )}
      {entity["id"] ? (
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
            target={"trans-id-tip"}
          />{" "}
        </div>
      ) : (
        ""
      )}
      {entity["sources"] ? (
        <div className="panel-row sources">
          <div>
            <strong>Source(s):</strong>{" "}
            {JSON.parse(entity["sources"]).map((source) => source["dataset"])}{" "}
          </div>
          <InfoToolTip
            mode={mode}
            content={
              "The array of source information for the properties of a given feature, with each entry being a source object which lists the property in JSON Pointer notation and the dataset that specific value came from. All features must have a root level source which is the default source if a specific property's source is not specified."
            }
            target={"trans-sources-tip"}
          />{" "}
        </div>
      ) : (
        ""
      )}
      {entity["class"] ? (
        <div className="panel-row class">
          <div>
            <strong>Class:</strong> {entity["class"]}
          </div>
          <InfoToolTip
            mode={mode}
            content={
              "Further describes the transportation entity by its 'class'"
            }
            target={"trans-class-tip"}
          />{" "}
        </div>
      ) : (
        ""
      )}
      <div className="common-properties">
        <table className="trans-table">
          <caption className="common-props">
            <button
              className="trans-table"
              onClick={() => setCommonExpanded(!commonExpanded)}
            >
              Common Properties{" "}
              {commonExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </caption>
          {commonExpanded ? (
            <tbody>
              {["update_time", "version"].map((key) => (
                <TableRow key={key} table_key={key} entity={entity} />
              ))}
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </table>
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

export default TransportationPanel;
