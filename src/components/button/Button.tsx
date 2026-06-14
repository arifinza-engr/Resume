import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  href?: string;
  newTab?: boolean;
  className?: string;
}

export default function Button({text, className, href, newTab}: ButtonProps) {
  return (
    <div className={className}>
      <a
        className="main-button"
        href={href}
        target={newTab ? "_blank" : undefined}
      >
        {text}
      </a>
    </div>
  );
}
