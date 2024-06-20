import PropTypes from "prop-types";
import { useState } from "react";
import "./TableRow.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InfoToolTip from "./InfoToolTip";

function TableRow({ mode, table_key, entity }) {
  const [overflow, setOverflow] = useState("collapsed");

  const handleExpand = () => {
    if (overflow === "collapsed") {
      setOverflow("expanded");
    } else {
      setOverflow("collapsed");
    }
  };

  return (
    <tr key={table_key}>
      <td className={overflow}>
        <div className="first-child">
          <strong>{table_key}</strong>
          <button className="expand" onClick={handleExpand}>
            {overflow === "expanded" ? (
              <RemoveIcon className="ec-icon" fontSize="small" />
            ) : (
              <AddIcon className="ec-icon" fontSize="small" />
            )}
          </button>
        </div>
      </td>
      {entity[table_key] != null ? (
        <td className={overflow}>
          {entity[table_key].toString()}{" "}
          <InfoToolTip
            mode={mode}
            content={"placeholder"}
            target={`${entity["theme"]}-${table_key}-tip`}
          />
        </td>
      ) : (
        <td className={overflow}>None Found</td>
      )}
    </tr>
  );
}

TableRow.propTypes = {
  entity: PropTypes.object,
};
export default TableRow;
