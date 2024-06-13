import TableRow from "./TableRow";

const sharedProperties = ["theme", "type"];

function TransportationPanel({ entity }) {
  return (
    <div>
      <div className="theme">Theme: {entity["theme"]}</div>
      <div className="type">Type: {entity["type"]}</div>
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

export default TransportationPanel;
