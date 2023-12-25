import React from "react";
import { GetIcons } from "../Images"
import "./Sidebar.scss"

export default function Sidebar() {
    return <div className="sidebar">
        <a href="/" className="sidebar__link active">
            <GetIcons type="pageIcon" className="sidebar__icon" />
        </a>
    </div>
}