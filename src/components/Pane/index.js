import { useEffect, useState } from "react"
import { GetBackgroundImage, GetIcons } from "../Images"
import "./Pane.scss"

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
            icon={<GetIcons type="projectIcon" />}
            label="Projects"
            active={(props.pane === "projects") ? "true" : null}
            onClick={() => props.setPane("projects")}
        />
        <TabButton
            icon={<GetIcons type="frontendIcon" />}
            label="Front-end Skills"
            active={(props.pane === "frontend") ? "true" : null}
            onClick={() => props.setPane("frontend")}
        />
        <TabButton
            icon={<GetIcons type="backendIcon" />}
            label="Back-end Skills"
            active={(props.pane === "backend") ? "true" : null}
            onClick={() => props.setPane("backend")}
        />
    </ul>
}


const PaneHeading = (props) => {
    return <div
        className={(props.mt)
            ? "d-flex justify-content-between align-item-start portfolio__pane-heading-wrapper"
            : "d-flex justify-content-between align-item-start portfolio__pane-heading-wrapper no-mt"}
    >
        <span className="d-flex">
            {(props.icon) ? props.icon : <></>}
            <h2 className="portfolio__pane-heading">{props.label}</h2>
        </span>
        <button onClick={() => {
            props.setNums((props.nums) ? null : props.defaultNums)
        }}
            className={
                (props.nums)
                    ? "view-all-btn"
                    : "view-all-btn active"
            }>View all</button>
    </div >
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
    return <span className="mt-2 w-100 overflow-hidden row ms-0 me-0">
        {list.sort((a, b) => b.index - a.index).map((item, index) => {
            return <div key={index} className="mb-3 col-lg-6">
                <button
                    key={index}
                    className={(props.cv === item.id)
                        ? "d-inline-flex portfolio__pane-wrapper active"
                        : "d-inline-flex portfolio__pane-wrapper"}
                    onClick={() =>
                        projectDetailHandle(props.cv, props.setCv, item.id)
                    }
                >
                    <span className="portfolio__pane-img">
                        <GetBackgroundImage
                            className="portfolio__pane-background-img"
                            src={item.img}
                        />
                    </span>
                    <span className="d-flex flex-column flexw-1 portfolio__project">
                        <h4 className="portfolio__project-title pt-3">{item.title}</h4>
                        <span className="portfolio__project-date">
                            <span>{item.start}</span>
                            <span> - </span>
                            <span>{item.end}</span>
                        </span>

                        <ul className="portfolio__project-languages pb-3">
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
                        <GetIcons type="arrowIcon" />
                    </span>
                </button>
            </div>
        })}
    </span >
}

const GameList = (props) => {
    const list = props.list;
    return <div className="mt-3 w-100 overflow-hidden row ms-0 me-0">
        {list.sort((a, b) => b.index - a.index).map((item, index) => {
            return <div key={index} className="col-lg-2">
                <button
                    className={(props.cv === item.id)
                        ? "d-inline-flex portfolio__game active"
                        : "d-inline-flex portfolio__game"
                    }
                    onClick={() =>
                        projectDetailHandle(props.cv, props.setCv, item.id)
                    }>
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

const customSlice = (arr, value) => {
    if (value !== null && !Number.isNaN(value)) {
        return arr.slice(0, value);
    } else {
        return arr;
    }
}

const PortfolioPane = (props) => {
    const defaultNumOfProjects = "4"
    const defaultNumOfGames = "6"
    const [numOfProjects, setNumOfProjects] = useState(defaultNumOfProjects);
    const [numOfGames, setNumOfGames] = useState(defaultNumOfGames);
    const projectList = props.projectList;

    return <div className="portfolio__pane">
        <PaneHeading
            nums={numOfProjects} setNums={setNumOfProjects} defaultNums={defaultNumOfProjects}
            icon={<GetIcons type="prominentIcon" />}
            label="Prominent Projects"
        />

        {(projectList.length > 0)
            ? <ProjectList
                cv={props.cv} setCv={props.setCv}
                list={customSlice(
                    projectList.sort((a, b) =>
                        b.index - a.index
                    ), numOfProjects)
                } />
            : <></>
        }

        <PaneHeading
            nums={numOfGames} setNums={setNumOfGames} defaultNums={defaultNumOfGames}
            icon={<GetIcons type="gameIcon" />}
            label="Games..."
            mt="true"
        />

        {(projectList.filter(item => item.isGame).length > 0)
            ? <GameList
                cv={props.cv} setCv={props.setCv}
                list={
                    customSlice(projectList
                        .filter(item => item.isGame)
                        .sort((a, b) => b.index - a.index), numOfGames)
                } />
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
            <GetIcons type="circleLine" className="circle-line-svg" />
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
                    <GetIcons type="circleLine" />
                    Front-end Skills
                </h2>
                <p className="skill__describe">
                    My primary focus for future development lies in front-end technologies.
                    I am passionate about delving into the intricacies of crafting website interfaces and
                    responsive web applications, employing tools such as HTML, CSS, and Javascript, with
                    a particular emphasis on frameworks like ReactJS. My goal is to consistently deliver
                    products that are not only visually appealing but also function seamlessly when presented
                    to customers, reflecting a commitment to precision and excellence in my work.
                </p>
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
                    <GetIcons type="circleLine" />
                    Back-end Skills
                </h2>
                <p className="skill__describe">
                    My primary focus lies in front-end development.
                    However, I also want to into the backend and design as a supplementary area of interest.
                    That's how I depth-understand "How" and "Why" everything works. I am actively expanding my
                    skill set to encompass backend development. I find satisfaction in understanding backend
                    technologies, including server-side logic and database management. Exploring languages such
                    as and Node.js, along with frameworks Express, allows me to contribute to the comprehensive
                    development of web applications.
                </p>
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
    useEffect(() => {
        fetch("/anh_portfolio/projects.json")
            .then(res => res.json())
            .then(data => setProjectList(data))
        fetch("/anh_portfolio/languages.json")
            .then(res => res.json())
            .then(data => setLanguages(data))
    }, [props.pane])

    const [projectList, setProjectList] = useState([])

    const [languages, setLanguages] = useState([])

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