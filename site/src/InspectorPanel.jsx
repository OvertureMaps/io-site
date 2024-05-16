import PropTypes from 'prop-types';

function InspectorPanel({entity}) {

  if (!entity) {
    return;
  }

  return (
    <div className="inspector-panel">
      <h3>Inspector Panel</h3>
      {Object.keys(entity)
        .filter((key) => !key.startsWith('@'))
        .map((key) => (
          <div key={key}>
            <strong>{key}:</strong> {entity[key].toString()}
          </div>
        ))}
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
