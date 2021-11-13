import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const HEADER_ACTION_CONFIGS = {
  RESET: {
    label: "Reset",
    href: "/",
    target: ""
  },
  Home: {
    label: "GeekTrust Home",
    externalLink: true,
    href: "https://www.geektrust.in/",
    target: "_blank"
  }
};

function Header(props) {
  function renderAction(action) {
    if (action.externalLink) {
      return (
        <span key={action.label}>
          <a href={action.href} target={action.target}>
            {action.label}
          </a>
        </span>
      );
    } else {
      return (
        <span key={action.label}>
          <Link to={action.href} target={action.target}>
            {action.label}
          </Link>
        </span>
      );
    }
  }
  function renderActions() {
    const actions = Object.values(HEADER_ACTION_CONFIGS);
    return actions.map(renderAction);
  }

  return <div className={styles["header-container"]}>{renderActions()}</div>;
}

export default Header;
