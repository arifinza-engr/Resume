import {useContext} from "react";
import "./Skills.scss";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import {skillsSection} from "../../portfolio";
import {Fade} from "react-awesome-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Skills() {
  const {isDark} = useContext(StyleContext);
  if (!skillsSection.display) {
    return null;
  }
  return (
    <div className={isDark ? "dark-mode main" : "main"} id="skills">
      <div className="skills-main-div skills-single">
        <Fade direction="up" duration={1000} triggerOnce>
          <div className="skills-text-div">
            <h2
              className={isDark ? "dark-mode skills-heading" : "skills-heading"}
            >
              {skillsSection.title}{" "}
            </h2>
            <p
              className={
                isDark
                  ? "dark-mode subTitle skills-text-subtitle"
                  : "subTitle skills-text-subtitle"
              }
            >
              {skillsSection.subTitle}
            </p>
            <SoftwareSkill />
            <div>
              {skillsSection.skills.map((skill, i) => (
                <p
                  key={i}
                  className={
                    isDark ? "dark-mode subTitle skills-text" : "subTitle skills-text"
                  }
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
