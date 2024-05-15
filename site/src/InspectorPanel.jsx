import PropTypes from 'prop-types';

function InspectorPanel({entity}) {

  if (!entity) {
    return;
  }

  return (
    <div className="inspector-panel">
      <h3>Inspector Panel</h3>
      <div>
        Name: {entity.name}
      </div>
      <div>
        Category: {entity.category_main}
      </div>
      <div>
        Confidence: {entity.confidence}
      </div>
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
