import "./Greeting.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {greeting} from "../../portfolio";
import resumePdf from "./resume.pdf";

export default function Greeting() {
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <div className="greet-main" id="greeting">
      <div className="hero">
        <div className="prompt">
          ~/finza $ whoami<span className="cursor"></span>
        </div>
        <h1 className="hero-name">{greeting.username}</h1>
        <div className="hero-role">
          &gt; <b>IT Support Specialist</b> · server · network · automation
        </div>
        <p className="hero-sub">{greeting.subTitle}</p>
        <div className="hero-cta">
          <Button text="Contact me" href="#contact" />
          {greeting.resumeLink && (
            <a
              href={resumePdf}
              download="Resume.pdf"
              className="download-link-button"
            >
              <Button text="Download résumé" />
            </a>
          )}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
}
