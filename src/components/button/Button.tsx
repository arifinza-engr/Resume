import "./Button.scss";

interface ButtonProps {
  text: string;
  href?: string;
  newTab?: boolean;
  className?: string;
  download?: string;
}

export default function Button({
  text,
  className,
  href,
  newTab,
  download
}: ButtonProps) {
  return (
    <div className={className}>
      <a
        className="main-button"
        href={href}
        download={download}
        target={newTab ? "_blank" : undefined}
      >
        {text}
      </a>
    </div>
  );
}
