import "./SocialMedia.scss";
import {socialMediaLinks as _socialMediaLinks} from "../../portfolio";

// Cast to permissive type — portfolio.ts only defines the used subset;
// optional fields (gmail, gitlab, etc.) may not be present.
const links = _socialMediaLinks as Record<string, string | boolean | undefined>;

const str = (key: string): string | undefined => {
  const v = links[key];
  return typeof v === "string" ? v : undefined;
};

export default function socialMedia() {
  if (!links["display"]) {
    return null;
  }
  return (
    <div className="social-media-div">
      {str("github") ? (
        <a
          href={str("github")}
          aria-label="GitHub"
          className="icon-button github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
          <span></span>
        </a>
      ) : null}

      {str("linkedin") ? (
        <a
          href={str("linkedin")}
          aria-label="LinkedIn"
          className="icon-button linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin-in"></i>
          <span></span>
        </a>
      ) : null}

      {str("gmail") ? (
        <a
          href={`mailto:${str("gmail")}`}
          aria-label="Email"
          className="icon-button google"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-envelope"></i>
          <span></span>
        </a>
      ) : null}

      {str("gitlab") ? (
        <a
          href={str("gitlab")}
          aria-label="GitLab"
          className="icon-button gitlab"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-gitlab"></i>
          <span></span>
        </a>
      ) : null}

      {str("facebook") ? (
        <a
          href={str("facebook")}
          aria-label="Facebook"
          className="icon-button facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-f"></i>
          <span></span>
        </a>
      ) : null}

      {str("instagram") ? (
        <a
          href={str("instagram")}
          aria-label="Instagram"
          className="icon-button instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
          <span></span>
        </a>
      ) : null}

      {str("twitter") ? (
        <a
          href={str("twitter")}
          aria-label="Twitter"
          className="icon-button twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter"></i>
          <span></span>
        </a>
      ) : null}

      {str("medium") ? (
        <a
          href={str("medium")}
          aria-label="Medium"
          className="icon-button medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-medium"></i>
          <span></span>
        </a>
      ) : null}

      {str("stackoverflow") ? (
        <a
          href={str("stackoverflow")}
          aria-label="Stack Overflow"
          className="icon-button stack-overflow"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-stack-overflow"></i>
          <span></span>
        </a>
      ) : null}

      {str("kaggle") ? (
        <a
          href={str("kaggle")}
          aria-label="Kaggle"
          className="icon-button kaggle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-kaggle"></i>
          <span></span>
        </a>
      ) : null}

      {str("whatsapp") ? (
        <a
          href={str("whatsapp")}
          aria-label="WhatsApp"
          className="icon-button whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
          <span></span>
        </a>
      ) : null}
    </div>
  );
}
