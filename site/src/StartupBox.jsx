import { Checkbox, FormControlLabel, Box, Modal } from "@mui/material";
import "./StartupBox.css";

function StartupBox({ open, setOpen, startTour, updateTour }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="startup-box">
        <Box>
          <p className="tour-intro">
            First time here? Take the tour to get familiar with our features!
          </p>
          <button className="button start" onClick={startTour}>
            Start Tour
          </button>
          <button className="button skip" onClick={() => setOpen(false)}>
            Skip Tour
          </button>
          <div className="perma-skip">
            <FormControlLabel
              control={<Checkbox onChange={updateTour} />}
              label="Don't Ask Again"
            />
          </div>
        </Box>
      </div>
    </Modal>
  );
}

export default StartupBox;
