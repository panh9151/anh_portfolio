import React, { useEffect, useState } from "react";
import { NameNApplyFor, Overview, CurriculumSection, Avatar } from "./Parts";

const CV = () => {
    return <div className="col-lg-6">
        <div className="w-100">
            <div className="ms-5">
                <div className="ms-3 curie">
                    <div className="pb-3 d-flex justify-content-between align-items-center sticky">
                        <div className="d-flex justify-content-start align-items-start flex-column flex-grow-1">
                            <NameNApplyFor
                                name="Pham Tuan Anh"
                                applyPosition="Fresher Front-end Developer"
                            />
                            <Overview
                                phone="0794437748"
                                birth="26/11/2003"
                                address="HCM"
                                email="panh9151@gmail.com"
                            />
                        </div>
                        <Avatar />
                    </div>
                    <CurriculumSection />
                </div>
            </div>
        </div>
    </div>
}

const BackButton = (props) => {
    return <>
        <button
            className="project-detail__back-button"
            onClick={() =>
                props.setCv("CV")}
        >
            Back to CV
        </button>
    </>
}

const ProjectTable = (props) => {
    useEffect(() => {
        fetch("/projects.json")
            .then(res => res.json())
            .then(data => {
                const result = data.find(item => item.id === props.cv)
                if (result.table) {
                    setTable(result.table)
                    setHeading(result.title)
                    setStart(result.start)
                    setEnd(result.end)
                }
            })
    }, [props.cv])
    const [table, setTable] = useState(null);
    const [heading, setHeading] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const columns = (table) ? Object.keys(table) : null;

    return (table)
        ? <div className="w-100 project-detail">
            <span className="project-detail__heading">{heading}</span>
            <div className="project-detail__date">
                <span>{start}</span>
                <span> - </span>
                <span>{end}</span>
            </div>
            <table className="w-100 project-detail__table">
                <tbody>
                    {columns.map((column, columnIndex) => (
                        <tr key={columnIndex}>
                            <th>{column}</th>
                            <td>{Array.isArray(table[column]) ? table[column].join(', ') : table[column]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        : <></>
}

const ProjectDetail = (props) => {
    return <div className="col-lg-6">
        <div className="w-100">
            <BackButton setCv={props.setCv} />
            <ProjectTable cv={props.cv} />
        </div>
    </div>
}

export default function CurriculumnVitae(props) {
    switch (props.cv) {
        case "CV":
            return <CV />
        default:
            return <ProjectDetail setCv={props.setCv} cv={props.cv} />
    }
}