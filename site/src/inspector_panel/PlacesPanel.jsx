import TableRow from "./TableRow";

const sharedProperties = [
  "theme",
  "type",
  "update_time",
  "id",
  "sources",
  "subtype",
  "version",
];

function PlacesPanel({ entity }) {
  return (
    <div>
      <div className="theme">Theme: {entity["theme"]}</div>
      <div className="type">Type: {entity["type"]}</div>
      <div className="subtype">Subtype: {entity["subtype"]}</div>
      <div className="id"> ID: {entity["id"]}</div>
      <div className="sources">
        Sources:{" "}
        {JSON.parse(entity["sources"]).map((source) => `${source["dataset"]},`)}
      </div>
      <div className="common-properties">
        <table>
          <caption>Common Place Properties</caption>
          <tbody>
            {["update_time", "version"].map((key) => (
              <TableRow table_key={key} entity={entity} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="other-properties">
        <table>
          <caption>Other Properties</caption>
          <tbody>
            {Object.keys(entity)
              .filter((key) => !key.startsWith("@"))
              .filter((key) => !sharedProperties.includes(key))
              .map((key) => (
                <TableRow table_key={key} entity={entity} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlacesPanel;
