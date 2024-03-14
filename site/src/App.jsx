import { useState } from 'react'
import overtureLogo from '/omf_logo_transparent.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>OvertureMaps.io</h1>
      <div>
        <a href="https://overturemaps.org" target="_blank">
          <img src={overtureLogo} className="logo overture" alt="Overture Maps logo" />
        </a>
      </div>
      <p className="read-the-docs">
        Head on over to <a href="https://docs.overturemaps.org/how-to" target="_blank"> the documentation</a> to learn more
      </p>
    </>
  )
}

export default App
