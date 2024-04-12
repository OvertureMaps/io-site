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
"https://overturemaps-us-west-2.s3.amazonaws.com/release/2023-11-14-alpha.0/theme=transportation/type=segment/part-00158-6cb89013-4ec2-4b94-8e4b-8e27c7d30865.c000.zstd.parquet";
let exampleFile = await new ParquetFile(url);
 const wasmTable = await exampleFile.readRowGroups([0], {
  batch_size: 1024,
  limit: 100,
  offset: 0
});

 console.log(wasmTable); 