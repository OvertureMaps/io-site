import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import initWasm, { ParquetDataset, set_panic_hook, writeGeoParquet, ParquetFile } from "@geoarrow/geoarrow-wasm/esm/index.js";
import * as arrow from 'apache-arrow';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
await initWasm();


// const urls = [
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00000-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00001-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00002-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00003-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00004-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00005-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00006-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00007-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00008-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00009-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00010-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00011-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00012-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00013-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00014-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00015-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00016-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00017-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00018-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00019-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00020-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00021-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00022-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00023-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00024-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00025-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00026-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00027-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00028-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00029-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00030-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00031-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00032-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00033-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00034-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00035-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00036-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00037-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00038-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00039-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00040-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00041-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00042-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00043-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00044-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00045-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00046-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00047-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00048-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00049-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00050-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00051-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00052-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00053-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00054-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00055-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00056-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00057-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00058-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00059-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00060-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00061-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00062-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00063-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00064-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00065-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00066-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00067-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00068-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00069-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00070-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00071-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00072-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00073-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00074-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00075-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00076-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00077-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00078-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00079-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00080-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00081-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00082-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00083-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00084-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00085-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00086-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00087-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00088-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00089-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00090-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00091-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00092-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00093-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00094-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00095-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00096-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00097-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00098-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00099-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00100-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00101-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00102-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00103-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00104-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00105-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00106-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00107-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00108-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00109-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00110-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00111-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00112-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00113-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00114-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00115-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00116-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00117-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00118-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00119-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00120-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00121-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00122-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00123-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00124-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00125-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00126-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00127-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00128-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00129-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00130-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00131-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00132-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00133-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00134-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00135-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00136-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00137-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00138-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00139-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00140-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00141-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00142-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00143-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00144-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00145-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00146-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00147-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00148-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00149-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00150-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00151-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00152-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00153-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00154-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00155-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00156-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00157-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00158-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00159-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00160-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00161-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00162-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00163-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00164-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00165-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00166-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00167-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00168-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00169-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00170-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00171-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00172-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00173-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00174-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00175-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00176-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00177-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00178-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00179-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00180-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00181-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00182-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00183-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00184-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00185-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00186-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00187-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00188-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00189-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00190-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00191-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00192-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00193-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00194-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00195-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00196-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00197-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00198-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00199-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00200-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00201-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00202-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00203-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00204-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00205-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00206-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00207-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00208-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00209-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00210-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00211-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00212-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00213-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00214-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00215-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00216-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00217-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00218-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00219-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00220-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00221-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00222-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00223-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00224-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00225-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00226-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00227-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00228-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00229-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00230-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//   "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00231-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet",
//           ];
  

// // const url = "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=buildings/type=building/part-00000-4dfc75cd-2680-4d52-b5e0-f4cc9f36b267-c000.zstd.parquet"

// const minxPath = ["bbox", "minx"];
// const minyPath = ["bbox", "miny"];
// const maxxPath = ["bbox", "maxx"];
// const maxyPath = ["bbox", "maxy"];

const readOptions = {
  batch_size: 1024,
  limit: 100,
  offset: 0,   
//   bbox: [94.9218037, 26.7301782, 94.9618037, 26.7501782],
//   bboxPaths: {
//     minxPath,
//     minyPath,
//     maxxPath,
//     maxyPath,
//   },
};

// let parquetDataset = await new ParquetDataset(urls);

// set_panic_hook();

// //Read ALL FILES and constrain to only shapes within the bounding box
// const wasmTable = await parquetDataset.read(readOptions);

// //Caution: Also invalidates the wasmTable
// const parquetFileReadyForDownload = writeGeoParquet(wasmTable);
 
// //Read the table into JS-land
// // const jsTable = arrow.tableFromIPC(wasmTable.intoIPCStream())


// console.log(parquetFileReadyForDownload);
// const url =
// "https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=transportation/type=segment/part-00000-26412a13-1721-4841-b165-ec480de266f5-c000.zstd.parquet";

const url =
"https://overturemaps-us-west-2.s3.amazonaws.com/release/2024-03-12-alpha.0/theme=transportation/type=segment/part-00000-26412a13-1721-4841-b165-ec480de266f5-c000.zstd.parquet";

let exampleFile = await new ParquetFile(url);
 const wasmTable = await exampleFile.readRowGroups([0], {
  batch_size: 1024,
  limit: 100,
  offset: 0, 
});

const binaryDataForDownload = writeGeoParquet(wasmTable);


let blerb = new Blob([binaryDataForDownload], {
  type: "application/octet-stream"
});

//window.open(URL.createObjectURL(blerb));