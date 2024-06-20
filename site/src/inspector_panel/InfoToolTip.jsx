import Floater from "react-floater";
import InfoIcon from "../icons/icon-info.svg?react";
import { useState } from "react";
import "./InfoToolTip.css";

function InfoToolTip({ mode, target, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"tool-tip"}>
      <Floater
        styles={{
          container: {
            padding: "10px",
            color: mode === "theme-dark" ? "white" : "black",
            fontSize: ".8rem",
            background:
              mode === "theme-dark"
                ? "var(--ifm-navbar-background-color)"
                : "var(--ifm-color-secondary-light)",
          },
          arrow: {
            color:
              mode === "theme-dark"
                ? "var(--ifm-navbar-background-color)"
                : "var(--ifm-color-secondary-light)",
          },
        }}
        content={<div>{content}</div>}
        target={"." + target}
        open={open}
      >
        <button
          className={target + " tool-tip"}
          onMouseOver={() => setOpen(true)}
          onMouseOut={() => setOpen(false)}
        >
          <InfoIcon />
        </button>
      </Floater>
    </div>
  );
}

export default InfoToolTip;
