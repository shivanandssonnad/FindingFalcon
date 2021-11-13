import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "./styles.module.scss";

function TokenExpiredView(props) {
  const navigate = useNavigate();
  function onClick() {
    navigate("/");
  }
  return (
    <div
      className={classNames(
        styles["full-view"],
        "display-row-column-center",
        "flex-direction-column"
      )}
    >
      <Text className="display-row-center" type={Text.TYPE.TITLE}>
        Sorry! Something went wrong with token.
      </Text>
      <Text className="display-row-center" type={Text.TYPE.SUB_TITLE}>
        Please try again with new token!
      </Text>
      <Button onClick={onClick}>Retry!</Button>
    </div>
  );
}

export default TokenExpiredView;
