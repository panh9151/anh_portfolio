// import { useEffect } from "react"
import { ArrowIcon, BackendIcon, CircleLine, FrontendIcon, GameIcon, GetBackgroundImage, ProjectIcon, ProminentIcon } from "./Images"

export function NameNApplyFor(props) {
    return <div className="mt-4">
        <h1 className="mt-2 mb-0 curie__name">{props.name}</h1>
        <span className="curie__apply-position">{props.applyPosition}</span>
    </div>
}

export function Avatar() {
    return <img className="avatar" alt="" src={require("../img/avatar.png")} />
}

export function Overview(props) {
    return <>
        <div className="mt-20 d-flex flex-wrap justify-content-between">
            {Object.keys(props).map((item, index) => {
                return <span key={index} className="mb-2 curie__overview-wrapper">
                    <label className="curie__overview-label">{item}: </label>
                    <span className="ms-2 curie__overview-text">{props[item]}</span>
                </span>
            })}
        </div>
    </>
}

const GetIcon = (props) => {
    return (props.icon === "glasses")
        ? <img className="me-3" alt="" src={require("../img/glasses.svg").default} />
        : (props.icon === "case")
            ? <img className="me-3" alt="" src={require("../img/case.svg").default} />
            : (props.icon === "graduate")
                ? <img className="me-3" alt="" src={require("../img/graduate.svg").default} />
                : (props.icon === "piece")
                    ? <img className="me-3" alt="" src={require("../img/piece.svg").default} />
                    : (props.icon === "target")
                        ? <img className="me-3" alt="" src={require("../img/target.svg").default} />
                        : <></>
}

export function CurriculumSection(props) {
    const curriList = [
        {
            title: "Overview",
            icon: "glasses",
            contents: [
                {
                    heading: null,
                    list: [
                        "Strengths: Front-end technology and Back-end web application development",
                        "Proficiency in HTML, CSS, JavaScript",
                        "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
                        "Thorough under standing of React.js and it score principles",
                        "Familiarity with newer specifications of EcmaScript"
                    ]
                }
            ]
        },
        {
            title: "Career Objective",
            icon: "target",
            contents: [
                {
                    heading: null,
                    list: [
                        "In 3-6 months: Focus on working and honing skills, enhancing proficiency at the fresher level. Simultaneously, seek opportunities to be a junior developer.",
                        "In 3-5 years: Dedicate time to extensive investment in specialized knowledge, aiming to become an expert in your field. Attain the qualifications necessary to be a senior developer.",
                    ]
                }
            ]
        },
        {
            title: "Skills",
            icon: "piece",
            contents: [
                {
                    heading: "Technical",
                    list: [
                        "HTML, CSS, & JavaScript (ES6)",
                        "Boostrap, SCSS",
                        "ReactJS"
                    ]
                },
                {
                    heading: "Others",
                    list: [
                        "UI website design with Figma",
                        "Database design, MySQL, RESTful API with ExpressJS"
                    ]
                }
            ]
        },
        {
            title: "Education",
            icon: "graduate",
            contents: [
                {
                    heading: null,
                    list: [
                        "2022-now: FPT Polytechnic College",
                    ]
                }
            ]
        },
        {
            title: "Experience",
            icon: "case",
            contents: [
                {
                    heading: null,
                    list: [
                        "No specialized work experience"
                    ]
                }
            ]
        }
    ]

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

const TabButton = (props) => {
    return <li className={(props.active) ? "portfolio__tab-wrapper active" : "portfolio__tab-wrapper"} >
        <button onClick={(props.active) ? () => { } : props.onClick} className="portfolio__tab-btn" >
            <div className="d-flex justify-content-center align-items-center">
                <span>{props.icon}</span>
                <span>{props.label}</span>
            </div>
        </button>
    </li >
}

export function TabPane(props) {
    return <ul className="portfolio__tab">
        <TabButton
            icon={<ProjectIcon />}
            label="Projects"
            active={(props.pane === "projects") ? "true" : null}
            onClick={() => props.setPane("projects")}
        />
        <TabButton
            icon={<FrontendIcon />}
            label="Front-end Skills"
            active={(props.pane === "frontend") ? "true" : null}
            onClick={() => props.setPane("frontend")}
        />
        <TabButton
            icon={<BackendIcon />}
            label="Back-end Skills"
            active={(props.pane === "backend") ? "true" : null}
            onClick={() => props.setPane("backend")}
        />
    </ul>
}


const PaneHeading = (props) => {
    return <span className=
        {(props.mt)
            ? "d-flex portfolio__pane-heading-wrapper"
            : "d-flex portfolio__pane-heading-wrapper portfolio__pane-heading-wrapper--no-mt"}>
        {(props.icon) ? props.icon : <></>}
        <h2 className="portfolio__pane-heading">{props.label}</h2>
    </span>
}

const projectDetailHandle = (cv, setCv, id) => {
    setCv((cv === "CV")
        ? id
        : (cv !== id)
            ? id
            : "CV"
    )
}

const ProjectList = (props) => {
    const list = props.list;
    return <span className="mt-20 row">
        {list.map((item, index) => {
            return <div key={index} className="mb-3 col-lg-6">
                <button onClick={() => projectDetailHandle(props.cv, props.setCv, item.id)} key={index} className="d-inline-flex portfolio__pane-wrapper">
                    <span className="portfolio__pane-img">
                        <GetBackgroundImage
                            className="portfolio__pane-background-img"
                            src={item.img}
                        />
                    </span>
                    <span className="d-flex flex-column flex-grow-1 portfolio__project">
                        <h4 className="portfolio__project-title">{item.title}</h4>
                        <span className="portfolio__project-date">
                            <span>{item.start}</span>
                            <span> - </span>
                            <span>{item.end}</span>
                        </span>

                        <ul className="portfolio__project-languages">
                            {item.languages.map((language, index) => {
                                const languageStyle = {
                                    "--language-color": "#" + language.color,
                                    "--border-color": "#" + language.color + "80"
                                }
                                return <li
                                    style={languageStyle}
                                    className="portfolio__project-language"
                                    key={index}
                                >{language.name}</li>
                            })}
                        </ul>
                    </span>
                    <span className="portfolio__project-arrow">
                        <ArrowIcon />
                    </span>
                </button>
            </div>
        })}
    </span>
}

const GameList = (props) => {
    const list = props.list;
    return <div className="mt-3 row">
        {list.map((item, index) => {
            return <div key={index} className="col-lg-2">
                <button className="portfolio__game">
                    <GetBackgroundImage
                        className="portfolio__game-img"
                        src={item.img}
                    />
                    <span className="portfolio__game-title">{item.title}</span>
                </button>
            </div>
        })}
    </div>
}

const PortfolioPane = (props) => {
    const projectList = props.projectList
    return <div className="portfolio__pane">
        <PaneHeading
            icon={<ProminentIcon />}
            label="Prominent Projects"
        />

        {(projectList.length > 0)
            ? <ProjectList
                cv={props.cv} setCv={props.setCv}
                list={projectList
                    .sort((a, b) => b.index - a.index)
                    .slice(0, 4)} />
            : <></>
        }

        <PaneHeading
            icon={<GameIcon />}
            label="Games..."
            mt="true"
        />

        {(projectList.filter(item => item.isGame).length > 0)
            ? <GameList
                list={projectList
                    .filter(item => item.isGame)
                    .sort((a, b) => b.index - a.index)
                    .slice(0, 6)} />
            : <></>
        }
    </div>
}

const classifyLanguages = (languages) => {
    languages.forEach((item, index) => {
        if (item.reference) {
            const indexRef = [];
            if (languages.filter((language, i) => {
                if (language.name === item.reference)
                    indexRef.push(i);
                return language.name === item.reference
            }).length === 0) {
            } else {
                indexRef.forEach((i) => {
                    if (!Array.isArray(languages[i].reference)) {
                        languages[i].reference = []
                    }
                    languages[i].reference.push(item)
                    languages[index] = ""
                })
            }
        }
    })

    return languages.filter(function (language) {
        return language !== "";
    });
}

const RenderReferenceLanguages = (props) => {
    return <RenderLanguages
        lt={props.lt}
        key={props.index}
        language={props.language}
    />
}

const TopLine = () => {
    return <div className="skill__language--lt"></div>
}

const RenderLanguages = (props) => {
    const languageStyle = {
        "--language-color": "#" + props.language.color
    }

    return <>
        <div className="d-inline-flex align-items-center mb-3 position-relative">
            {(props.lt) ? <TopLine /> : <></>}
            <CircleLine className="circle-line-svg" />
            <div className="skill__language" style={languageStyle}>
                {props.language.name}
            </div>
            {((props.language.reference)
                && (Array.isArray(props.language.reference))
                && (props.language.reference.length) > 0)
                ? <div className="circle-line"></div>
                : <></>
            }
        </div>
        {
            ((props.language.reference)
                && (Array.isArray(props.language.reference))
                && (props.language.reference.length) > 0)
                ? <div className="d-inline-flex flex-column">
                    {props.language.reference
                        .map((e, index) =>
                            <RenderReferenceLanguages
                                lt={
                                    (index > 0)
                                        ? "skill__language--lt"
                                        : ""
                                }
                                key={index}
                                language={e}
                            />)}
                </div>
                : <></>
        }
    </>
}

const Skills = (props) => {
    const languages = classifyLanguages(props.languages);
    switch (props.type) {
        case "frontend":
            return <div className="ps-20 w-100 skill main-line">
                <h2 className="skill__heading">
                    <CircleLine />
                    Front-end Skills
                </h2>
                <p className="skill__describe">Front-end is an essential component of the user interface of a web application, as it is the part that directly interacts with the user. As a front-end developer, my goal is always to optimize the UI/UX of the website to ensure the best possible user experience. I focus on graphic design, page loading speed optimization, improving interactivity, and ensuring consistency across different devices</p>
                <div className="skill__languages">
                    {languages.map((item, index) => {
                        return <div className="skill__languages-wrapper" key={index}>
                            <RenderLanguages language={item} />
                        </div>
                    })}
                </div>
            </div>
        case "backend":
            return <div className="ps-20 w-100 skill main-line">
                <h2 className="skill__heading">
                    <CircleLine />
                    Back-end Skills
                </h2>
                <p className="skill__describe">Back-end is an essential component of the user interface of a web application, as it is the part that directly interacts with the user. As a front-end developer, my goal is always to optimize the UI/UX of the website to ensure the best possible user experience. I focus on graphic design, page loading speed optimization, improving interactivity, and ensuring consistency across different devices</p>
                <div className="skill__languages">
                    {languages.map((item, index) => {
                        return <div className="skill__languages-wrapper" key={index}>
                            <RenderLanguages language={item} />
                        </div>
                    })}
                </div>
            </div>
        default:
            return <></>
    }
}

export function Pane(props) {
    const projectList = [
        {
            id: "123",
            title: "Anh Portfolio 1",
            start: "2/2023",
            end: "12/2023",
            src: "#",
            isGame: true,
            index: 1,
            img: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg",
            languages: [
                {
                    name: "HTML",
                    color: "DD4B25"
                },
                {
                    name: "SCSS",
                    color: "254BDD"
                },
                {
                    name: "ReactJS",
                    color: "5ED3F3"
                }
            ],
            table: {
                "Client": "Self",
                "Descriptions": "Website for showing porfolio (anh-portfolio.com)",
                "Number f Members": 1,
                "Position": "Design + Front-end developer",
                "Responsibilities": [
                    "Design interface. URL: abc.com",
                    "Build Front-end "
                ],
                "Technology in use": [
                    "Design: Figma",
                    "Front-end: ReactJS, SASS, Boostrap"
                ],
            }
        },
        {
            id: "234",
            title: "Anh Portfolio 2",
            start: "2/2023",
            end: "12/2023",
            src: "#",
            isGame: false,
            index: 1,
            img: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg",
            languages: [
                {
                    name: "HTML",
                    color: "DD4B25"
                },
                {
                    name: "SCSS",
                    color: "254BDD"
                },
                {
                    name: "ReactJS",
                    color: "5ED3F3"
                }
            ],
            table: {
                "Client": "Self",
                "Descriptions": "Website for showing porfolio (anh-portfolio.com)",
                "Number f Members": 1,
                "Position": "Design + Front-end developer",
                "Responsibilities": [
                    "Design interface. URL: abc.com",
                    "Build Front-end "
                ],
                "Technology in use": [
                    "Design: Figma",
                    "Front-end: ReactJS, SASS, Boostrap"
                ],
            }
        },
        {
            id: "345",
            title: "Anh Portfolio 2",
            start: "2/2023",
            end: "12/2023",
            src: "#",
            isGame: false,
            index: 11,
            img: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg",
            languages: [
                {
                    name: "HTML",
                    color: "DD4B25"
                },
                {
                    name: "SCSS",
                    color: "254BDD"
                },
                {
                    name: "ReactJS",
                    color: "5ED3F3"
                }
            ],
            table: {
                "Client": "Self",
                "Descriptions": "Website for showing porfolio (anh-portfolio.com)",
                "Number f Members": 1,
                "Position": "Design + Front-end developer",
                "Responsibilities": [
                    "Design interface. URL: abc.com",
                    "Build Front-end "
                ],
                "Technology in use": [
                    "Design: Figma",
                    "Front-end: ReactJS, SASS, Boostrap"
                ],
            }
        },
        {
            id: "456",
            title: "Anh Portfolio 1ánmdvasjdh0",
            start: "2/2023",
            end: "12/2023",
            src: "#",
            isGame: true,
            index: 10,
            img: "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg",
            languages: [
                {
                    name: "HTML",
                    color: "DD4B25"
                },
                {
                    name: "SCSS",
                    color: "254BDD"
                },
                {
                    name: "ReactJS",
                    color: "5ED3F3"
                }
            ],
            table: {
                "Client": "Self",
                "Descriptions": "Website for showing porfolio (anh-portfolio.com)",
                "Number f Members": 1,
                "Position": "Design + Front-end developer",
                "Responsibilities": [
                    "Design interface. URL: abc.com",
                    "Build Front-end "
                ],
                "Technology in use": [
                    "Design: Figma",
                    "Front-end: ReactJS, SASS, Boostrap"
                ],
            }
        }
    ]

    const languages = [
        {
            name: "HTML",
            reference: null,
            type: "frontend",
            color: "DD4B25"
        },
        {
            name: "SCSS",
            reference: "CSS",
            type: "frontend",
            color: "254BDD"
        },
        {
            name: "CSS",
            reference: null,
            type: "frontend",
            color: "254BDD"
        },
        {
            name: "ReactJS",
            reference: "Javascript",
            type: "frontend",
            color: "5ED3F3"
        },
        {
            name: "Bootstrap",
            reference: "CSS",
            type: "frontend",
            color: "5ED3F3"
        },
        {
            name: "Javascript",
            reference: null,
            type: "both",
            color: "5ED3F3"
        },
        {
            name: "Nodejs",
            reference: "Javascript",
            type: "backend",
            color: "5ED3F3"
        },
        {
            name: "T-SQL",
            reference: "",
            type: "backend",
            color: "5ED3F3"
        }
    ]

    switch (props.pane) {
        case "projects":
            return <PortfolioPane
                projectList={projectList}
                cv={props.cv} setCv={props.setCv}
            />
        case "frontend":
            return <Skills
                type="frontend"
                languages={languages
                    .filter((item) =>
                        item.type === "frontend"
                        || item.type === "both")
                }
            />
        case "backend":
            return <Skills
                type="backend"
                languages={languages
                    .filter((item) =>
                        item.type === "backend"
                        || item.type === "both")}
            />
        default: return <></>
    }

}