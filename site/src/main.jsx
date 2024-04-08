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

 let exampleFile = await new ParquetFile('example.parquet');
 const wasmTable = await exampleFile.readRowGroups([0]);

 console.log(wasmTable); 