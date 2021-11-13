import classNames from "classnames";
import React from "react";
import Text from "../../components/Text";
import styles from "./styles.module.scss";

function FoundView(props) {
  const { planet, timeTaken } = props;
  return (
    <div
      className={classNames(
        styles["full-view"],
        "display-row-column-center",
        "flex-direction-column"
      )}
    >
      <Text className="display-row-center" type={Text.TYPE.TITLE}>
        Success! Congratulations on Finding Falcone. King shan is mighty
        pleased.
      </Text>
      <Text className="display-row-center" type={Text.TYPE.SUB_TITLE}>
        Time Taken: &nbsp; {timeTaken}
      </Text>
      <Text className="display-row-center" type={Text.TYPE.SUB_TITLE}>
        Planet Found: &nbsp; {planet}
      </Text>
    </div>
  );
}

export default FoundView;
