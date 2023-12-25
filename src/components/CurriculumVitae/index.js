import React, { useEffect, useState } from "react";
import "./CurriculumVitae.scss"

const NameNApplyFor = (props) => {
    return <div className="mt-4">
        <h1 className="mt-2 mb-0 curie__name">{props.name}</h1>
        <span className="curie__apply-position">{props.applyPosition}</span>
    </div>
}

const Avatar = () => {
    return <img className="avatar" alt="" src={require("../../img/avatar.png")} />
}

const formatPhoneNumber = (inputStr) => {
    var digits = inputStr.replace(/\D/g, '');
    if (digits.length !== 10) {
        return "Invalid phone number";
    }
    var formattedNumber = '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + ' ' + digits.slice(6);

    return formattedNumber;
}

const customContact = (item, type) => {
    switch (type) {
        case "phone":
            return <a href={`tel: ${item}`}>{formatPhoneNumber(item)}</a>;
        case "email":
            return <a href={`mailto: ${item}`}>{item}</a>
        default: return <>{item}</>
    }
}

const Overview = (props) => {
    return <>
        <div className="mt-20 d-flex flex-wrap justify-content-between">
            {Object.keys(props).map((item, index) => {
                return <span key={index} className="mb-2 curie__overview-wrapper">
                    <label className="curie__overview-label">{item}: </label>
                    <span className="ms-2 curie__overview-text">{customContact(props[item], item)}</span>
                </span>
            })}
        </div>
    </>
}

const GetIcon = (props) => {
    return (props.icon === "glasses")
        ? <img className="me-3" alt="" src={require("../../img/glasses.svg").default} />
        : (props.icon === "case")
            ? <img className="me-3" alt="" src={require("../../img/case.svg").default} />
            : (props.icon === "graduate")
                ? <img className="me-3" alt="" src={require("../../img/graduate.svg").default} />
                : (props.icon === "piece")
                    ? <img className="me-3" alt="" src={require("../../img/piece.svg").default} />
                    : (props.icon === "target")
                        ? <img className="me-3" alt="" src={require("../../img/target.svg").default} />
                        : <></>
}

const CurriculumSection = (props) => {
    useEffect(() => {
        fetch("/anh_portfolio/curri.json")
            .then(res => res.json())
            .then(data => setCurriList(data))
    }, [])

    const [curriList, setCurriList] = useState([])

    return curriList.map((item, curriIndex) => {
        return <div
            key={curriIndex}
            className={(curriIndex === curriList.length - 1)
                ? "d-flex align-items-start justify-content-start flex-column higher-bottom"
                : "d-flex align-items-start justify-content-start flex-column"}
        >
            <div
                className={(curriIndex === 0)
                    ? "curie__heading-wrapper curie__heading-wrapper--lower-top d-flex align-items-center"
                    : "curie__heading-wrapper d-flex align-items-center"}>
                <GetIcon icon={item.icon} />
                <h2 className="curie__heading">{item.title}</h2>
            </div>
            {item.contents.map((content, contentIndex) => {
                return <div key={contentIndex} className="d-flex">
                    {
                        (content.heading)
                            ? <h3 className="curie__small-heading">{content.heading}</h3>
                            : <></>
                    }
                    <ul>
                        {content.list.map((contentListItem, listIndex) => {
                            return <li key={listIndex} className="curie__content-li">
                                {contentListItem}
                            </li>
                        })}
                    </ul>
                </div>
            })
            }
        </ div >
    })
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
        fetch("/anh_portfolio/projects.json")
            .then(res => res.json())
            .then(data => {
                const result = data.find(item => item.id === props.cv)
                if (result.table) {
                    setHeading(result.title)
                    setStart(result.start)
                    setEnd(result.end)
                    setTable(result.table)
                    setReferenceUrl(result.referenceUrl)
                }
            })
    }, [props.cv])
    const [table, setTable] = useState(null);
    const [referenceUrl, setReferenceUrl] = useState(null);
    const [heading, setHeading] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const columns = (table) ? Object.keys(table) : null;
    const references = (referenceUrl) ? Object.keys(referenceUrl) : null;

    return (table)
        ? <div className="w-100 project-detail">
            <span className="project-detail__heading">{heading}</span>
            <div className="project-detail__date">
                <span>{start}</span>
                <span> - </span>
                <span>{end}</span>
            </div>
            <span className="reference-heading">References: </span>
            <ul className="reference-ul">
                {references.map((reference, referenceIndex) => (
                    <li className="reference-li" key={referenceIndex}>
                        <a className="reference-a" href={referenceUrl[reference]}>
                            {reference}
                        </a>
                    </li>
                ))}
            </ul>
            <table className="w-100 project-detail__table">
                <tbody>
                    {columns.map((column, columnIndex) => (
                        <tr key={columnIndex}>
                            <th>{column}</th>
                            <td>
                                {Array.isArray(table[column]) ? (
                                    <ul>
                                        {table[column].map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    table[column]
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        : <></>
}

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