import PropTypes from "prop-types";

function InspectorPanel({ entity }) {
  if (!entity) {
    return;
  }

  return (
    <div className="inspector-panel">
      <h4>Inspector Panel</h4>
      <table>
        <tbody>
          {Object.keys(entity)
            .filter((key) => !key.startsWith("@"))
            .map((key) => (
              <tr key={key}>
                <td>
                  <strong>{key}</strong>
                </td>
                <td>{entity[key].toString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <p>
        <a
          href="https://docs.overturemaps.org/schema/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Overture Schema Reference
        </a>
      </p>
    </div>
  );
}

InspectorPanel.propTypes = {
  entity: PropTypes.object,
};
export default InspectorPanel;
