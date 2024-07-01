import { Modal } from "@mui/material";
import "./Sidecar.css";
import CloseIcon from "@mui/icons-material/Close";

function Sidecar({ open, setOpen }) {
  return (
    <div className="sidecar-modal">
      <Modal open={open} onClose={() => pass}>
        <div className="sidecar-box">
          <button className="close-panel-button" onClick={() => setOpen(false)}>
            <CloseIcon className="close-panel-icon" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Sidecar;
