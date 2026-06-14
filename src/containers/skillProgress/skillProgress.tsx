import React from "react";
import "./Progress.scss";
import {illustration, techStack} from "../../portfolio";
import {Fade} from "react-awesome-reveal";
import Build from "../../assets/lottie/build.json";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import skillSvg from "../../assets/images/skill.svg";

export default function StackProgress() {
  if (techStack.viewSkillBars) {
    return (
      <Fade direction="up" duration={1000} triggerOnce>
        <div className="skills-container">
          <div className="skills-bar">
            <h1 className="skills-heading">Proficiency</h1>
            {techStack.experience.map((exp, i) => {
              const progressStyle = {
                width: exp.progressPercentage
              };
              return (
                <div key={i} className="skill">
                  <p>{exp.Stack}</p>
                  <div className="meter">
                    <span style={progressStyle}></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img alt="Skills" src={skillSvg} />
            )}
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}
