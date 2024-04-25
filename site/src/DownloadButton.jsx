 import { useMap } from "react-map-gl/maplibre";
 import { useEffect } from "react";
 function DownloadButton() {
  const {current: map} = useMap();

  useEffect(() => {
    if (map) {
      map.getBounds();
    }
  }, [map])


  const handleDownloadClick = () => {
    const bounds = map.getBounds();
    //Get current bbox dimensions
    console.log(bounds);
    //Send those to the download engine

    //Create a blob

    //Download the blob
  };

  return (
    <>
      <button id="downloadButton" onClick={handleDownloadClick}>
        Download Visible 
      </button>
    </>
  );
}

// DownloadButton.propTypes = {
//   onClick: PropTypes.func.isRequired
// }
export default DownloadButton;