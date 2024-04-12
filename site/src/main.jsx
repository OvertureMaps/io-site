import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import initWasm, {ParquetFile} from "@geoarrow/geoarrow-wasm/esm/index.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

await initWasm();

const url =
"https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=transportation/type=segment/part-00000-26412a13-1721-4841-b165-ec480de266f5-c000.zstd.parquet";
let exampleFile = await new ParquetFile(url);
 const wasmTable = await exampleFile.readRowGroups([0], {
  batch_size: 1024,
  limit: 100000,
  offset: 0, 
  bbox: [-71.068, 42.353, -71.058, 42.363]
});

 console.log(wasmTable); 