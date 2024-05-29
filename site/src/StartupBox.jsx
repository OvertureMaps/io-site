import { Checkbox, FormControlLabel, Box, Modal } from "@mui/material";
import "./StartupBox.css";

function StartupBox({ open, setOpen, startTour, updateTour, mode }) {
  return (
    <div className="startup-modal">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          className={`${
            mode === "theme-dark" ? "startup-box-dark" : "startup-box-light"
          }`}
        >
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
                control={
                  <Checkbox
                    onChange={updateTour}
                    sx={mode === "theme-dark" ? { color: "whitesmoke" } : {}}
                  />
                }
                label="Don't Ask Me This Again"
              />
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default StartupBox;
