import TableRow from "./TableRow";
import "./ThemePanel.css";
import IndentIcon from "../icons/icon-indent.svg?react";
import InfoToolTip from "./InfoToolTip";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import ThemeIcon from "./ThemeIcon";
import SourcesRow from "./SourcesRow.jsx";

const sharedProperties = [
  "theme",
  "type",
  "update_time",
  "id",
  "sources",
  "subtype",
  "version",
];

function ThemePanel({ mode, entity, tips, activeThemes, setActiveThemes }) {
  return (
    <div className="theme-panel">
      {entity["id"] ? (
        <div className="panel-row id">
          <div>
            <strong>id: </strong>
            {entity["id"]}
          </div>
          <InfoToolTip mode={mode} content={tips.id} target={"theme-id-tip"} />
        </div>
      ) : (
        <></>
      )}
      <div className="panel-row theme">
        <div>
          <strong>theme: </strong>
          {entity["theme"]}
        </div>
        <div className="actions">
          <div
            className="pin"
            onClick={() => {
              if (activeThemes.includes(entity["theme"])) {
                setActiveThemes(
                  activeThemes.filter((t) => t !== entity["theme"])
                );
              } else {
                setActiveThemes(activeThemes.concat(entity["theme"]));
              }
            }}
          >
            {activeThemes.includes(entity["theme"]) ? (
              <PushPinIcon />
            ) : (
              <PushPinOutlinedIcon />
            )}
          </div>
          <InfoToolTip
            mode={mode}
            content={tips.theme}
            target={"theme-theme-tip"}
          />
        </div>
      </div>
      <div className="panel-row type">
        <div>
          <strong>type: </strong>
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
            <IndentIcon /> <strong>subtype: </strong>
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
      {entity["sources"] ? (
        <SourcesRow entity={entity} mode={mode} tips={tips} />
      ) : (
        <></>
      )}
      {entity["class"] ? (
        <div className="panel-row class">
          <div>
            <strong>class: </strong> {entity["class"]}
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
      {["version"].map((key) => (
        <div className="panel-row id">
          <div>
            <strong>{key}: </strong>
            {entity[key]}
          </div>
        </div>
      ))}
      {Object.keys(entity)
        .filter((key) => !key.startsWith("@"))
        .filter((key) => !sharedProperties.includes(key))
        .map((key) => (
          <TableRow key={key} mode={mode} table_key={key} entity={entity} />
        ))}
    </div>
  );
}

export default ThemePanel;
