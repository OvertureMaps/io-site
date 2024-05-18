import PropTypes from 'prop-types';

function InspectorPanel({entity}) {

  if (!entity) {
    return;
  }

  return (
    <div className="inspector-panel">
      <h3>Inspector Panel</h3>
      <table>
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
      </table>
      <p>
         <a href="https://docs.overturemaps.org/schema/">Overture Schema Reference</a>
      </p>
     
    </div>
  );
}

InspectorPanel.propTypes = {
  entity: PropTypes.object,
}
export default InspectorPanel;
