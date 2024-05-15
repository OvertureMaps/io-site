import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import initWasm from "@geoarrow/geoarrow-wasm/esm/index.js";
import wasmUrl from "@geoarrow/geoarrow-wasm/esm/index_bg.wasm?url"

//TODO: Make this async and parallelize with the startup of the map component, rather than blocking in. 
await initWasm(wasmUrl);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)