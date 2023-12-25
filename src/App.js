import Sidebar from "./components/Sidebar"
import Portfolio from "./components/Portfolio"
import CurriculumnVitae from "./components/CurriculumVitae"

import "./scss/main.scss"
import { useState } from "react"

function App() {
  const [cv, setCv] = useState("CV");

  return (
    <div className="app">
      <Sidebar />
      <div className="flex-grow-1">
        <div className="w-100 row">
          <CurriculumnVitae cv={cv} setCv={setCv} />
          <Portfolio cv={cv} setCv={setCv} />
        </div>
      </div>
    </div>
  );
}

export default App;