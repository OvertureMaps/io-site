import { useEffect, useState } from "react";
import ChevronUpIcon from "./../icons/chevron-up.svg?react";
import ChevronDownIcon from "./../icons/chevron-down.svg?react";
import "./DownloadOptions.css";

function DownloadOptions() {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open)
	}

	return (
		<div className="download-options">
			<button
				classname="download-options-button"
				onClick={handleClick}
			>
				<div className="wrapper">
					<div classname="icon">
						{open ? <ChevronDownIcon/> : <ChevronUpIcon/>}
					</div>
				</div>
			</button>
			<div className="options-wrapper">
				{open ? 
					<div className="options">
						<span className="fileselect">File Select</span>
						<span className="layerselect">Layer Selector</span>
					</div>
				: <div></div>}
			</div>
			
		</div>
	)   
}

export default DownloadOptions; 