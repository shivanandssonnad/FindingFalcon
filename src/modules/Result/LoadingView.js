import classNames from "classnames";
import React from "react";
import Text from "../../components/Text";
import styles from "./styles.module.scss";

function LoadingView() {
  return (
    <div
      className={classNames(styles["full-view"], "display-row-column-center")}
    >
      <Text type={Text.TYPE.SUB_TITLE}>Finding Falcone....</Text>
    </div>
  );
}

export default LoadingView;
