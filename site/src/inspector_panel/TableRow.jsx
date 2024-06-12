import PropTypes from "prop-types";
import { useState } from "react";
import "./TableRow.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function TableRow({ table_key, entity }) {
  const [overflow, setOverflow] = useState("collapsed");

  console.log(table_key);
  console.log(entity);

  const handleExpand = () => {
    if (overflow === "collapsed") {
      setOverflow("expanded");
    } else {
      setOverflow("collapsed");
    }
  };

  return (
    <tr key={table_key}>
      <td classname={overflow}>
        <div className="first-child">
          <strong>{table_key}</strong>
          <button className="expand" onClick={handleExpand}>
            {overflow === "expanded" ? (
              <RemoveIcon fontSize="small" />
            ) : (
              <AddIcon fontSize="small" />
            )}
          </button>
        </div>
      </td>
      <td className={overflow}>{entity[table_key].toString()}</td>
    </tr>
  );
}

TableRow.propTypes = {
  entity: PropTypes.object,
};
export default TableRow;
