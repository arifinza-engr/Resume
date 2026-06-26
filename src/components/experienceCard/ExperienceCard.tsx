import "./ExperienceCard.scss";

interface ExperienceCardInfo {
  company: string;
  companylogo?: string;
  role: string;
  date: string;
  desc?: string;
  descBullets?: string[];
}

interface ExperienceCardProps {
  cardInfo: ExperienceCardInfo;
  isDark: boolean;
}

export default function ExperienceCard({
  cardInfo,
  isDark
}: ExperienceCardProps) {
  const GetDescBullets = ({
    descBullets,
    isDark
  }: {
    descBullets?: string[];
    isDark: boolean;
  }) => {
    return descBullets
      ? descBullets.map((item: string, i: number) => (
          <li
            key={i}
            className={isDark ? "subTitle dark-mode-text" : "subTitle"}
          >
            {item}
          </li>
        ))
      : null;
  };

  return (
    <div className={isDark ? "experience-card-dark" : "experience-card"}>
      <div className="experience-banner">
        <div className="experience-blurred_div"></div>
        <div className="experience-div-company">
          <h3 className="experience-text-company">{cardInfo.company}</h3>
        </div>

        {cardInfo.companylogo && (
          <img
            className="experience-roundedimg"
            src={cardInfo.companylogo}
            alt={cardInfo.company}
          />
        )}
      </div>
      <div className="experience-text-details">
        <h4
          className={
            isDark
              ? "experience-text-role dark-mode-text"
              : "experience-text-role"
          }
        >
          {cardInfo.role}
        </h4>
        <h5
          className={
            isDark
              ? "experience-text-date dark-mode-text"
              : "experience-text-date"
          }
        >
          {cardInfo.date}
        </h5>
        <p
          className={
            isDark
              ? "subTitle experience-text-desc dark-mode-text"
              : "subTitle experience-text-desc"
          }
        >
          {cardInfo.desc}
        </p>
        <ul>
          <GetDescBullets descBullets={cardInfo.descBullets} isDark={isDark} />
        </ul>
      </div>
    </div>
  );
}
