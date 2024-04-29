import { useMap } from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import { DownloadCatalog } from "./DownloadCatalog.js"
import { ParquetDataset, set_panic_hook, writeGeoParquet } from "@geoarrow/geoarrow-wasm/esm/index.js"

function DownloadButton() {
  const { myMap } = useMap();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (myMap) {
      myMap.getBounds();
    }
  }, [myMap])


  const handleDownloadClick = async () => {
    setLoading(true);
    //Get current map dimensions and convert to bbox
    const bounds = myMap.getBounds();
    let bbox = [
      bounds.getWest(),  //minx
      bounds.getSouth(), //miny
      bounds.getEast(),  //maxx
      bounds.getNorth()  //maxy
    ];

    console.log(bounds);

    //Send those to the download engine
    const minxPath = ["bbox", "minx"];
    const minyPath = ["bbox", "miny"];
    const maxxPath = ["bbox", "maxx"];
    const maxyPath = ["bbox", "maxy"];

    const readOptions = {
      bbox: bbox,
      bboxPaths: {
        minxPath,
        minyPath,
        maxxPath,
        maxyPath,
      },
    };

    let parquetDataset = await new ParquetDataset(DownloadCatalog);
    const wasmTable = await parquetDataset.read(readOptions);

    set_panic_hook();
    //Create a blob
    const binaryDataForDownload = writeGeoParquet(wasmTable);


    let blerb = new Blob([binaryDataForDownload], {
      type: "application/octet-stream"
    });

    //Download the blob
    window.open(URL.createObjectURL(blerb));
    setLoading(false);
  };

  return (
    <>
      <button id="downloadButton" disabled={loading} className={loading ? "disabled" : ''} onClick={handleDownloadClick}>
        {loading ? 'Downloading...' : 'Download Visible'}
      </button>
    </>
  );
}

// DownloadButton.propTypes = {
//   onClick: PropTypes.func.isRequired
// }
export default DownloadButton;