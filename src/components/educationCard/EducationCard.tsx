import {createRef, useContext} from "react";
import {Fade, Slide} from "react-awesome-reveal";
import "./EducationCard.scss";
import StyleContext from "../../contexts/StyleContext";

interface School {
  logo?: string;
  name?: string;
  schoolName: string;
  subHeader: string;
  duration: string;
  desc?: string;
  descBullets?: string[];
}

interface EducationCardProps {
  school: School;
}

export default function EducationCard({school}: EducationCardProps) {
  const imgRef = createRef<HTMLImageElement>();

  const GetDescBullets = ({descBullets}: {descBullets?: string[]}) => {
    return descBullets
      ? descBullets.map((item: string, i: number) => (
          <li key={i} className="subTitle">
            {item}
          </li>
        ))
      : null;
  };
  const {isDark} = useContext(StyleContext);

  if (!school.logo)
    console.error(`Image of ${school.name} is missing in education section`);
  return (
    <div>
      <Fade direction="left" duration={1000} triggerOnce>
        <div className="education-card">
          {school.logo && (
            <div className="education-card-left">
              <img
                crossOrigin={"anonymous"}
                ref={imgRef}
                className="education-roundedimg"
                src={school.logo}
                alt={school.schoolName}
              />
            </div>
          )}
          <div className="education-card-right">
            <h3 className="education-text-school">{school.schoolName}</h3>

            <div className="education-text-details">
              <h4
                className={
                  isDark
                    ? "dark-mode education-text-subHeader"
                    : "education-text-subHeader"
                }
              >
                {school.subHeader}
              </h4>
              <p
                className={`${
                  isDark ? "dark-mode" : ""
                } education-text-duration`}
              >
                {school.duration}
              </p>
              <p className="education-text-desc">{school.desc}</p>
              <div className="education-text-bullets">
                <ul>
                  <GetDescBullets descBullets={school.descBullets} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fade>
      <Slide direction="left" duration={2000} triggerOnce>
        <div className="education-card-border"></div>
      </Slide>
    </div>
  );
}
