import React from "react";
import { PageIcon } from "./Images"

export default function Sidebar() {
    return <div className="sidebar">
        <a href="/" className="sidebar__link active">
            <PageIcon className="sidebar__icon" />
        </a>
    </div>
}