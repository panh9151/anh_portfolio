import React, { useState } from "react";
import { TabPane, Pane } from "./Pane";

export default function Portfolio(props) {
    const [pane, setPane] = useState("projects")

    return <div className="col-lg-6">
        <div className="w-100 mt-20 portfolio">
            <TabPane pane={pane} setPane={setPane} />
            <Pane cv={props.cv} setCv={props.setCv} pane={pane} setPane={setPane} />
        </div>
    </div>
}