import React from "react";
import styles from "./styles.module.scss";

function Footer() {
  return (
    <footer className={styles["footer-container"]}>
      <span>
        Coding problem - Finding Falcon &nbsp;
        <a href="https://www.geektrust.in/finding-falcon" target="_blank">
          www.geektrust.in/finding-falcon
        </a>
      </span>
    </footer>
  );
}

export default Footer;
