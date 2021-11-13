import classNames from "classnames";
import React from "react";
import styles from "./styles.module.scss";

function OptionRenderer(props) {
  const { option, onSelect, selectedValue } = props;
  const { label, value, disabled, subLabel, disabledMessage } = option;

  function renderSublabel(subLabel) {
    if (!subLabel) return null;
    return <div className="text-light">{subLabel}</div>;
  }

  function handleSelect() {
    onSelect(option);
  }

  function renderTooltip() {
    if (disabled && disabledMessage) {
      return <div className={styles["tooltip-message"]}>{disabledMessage}</div>;
    }
    return null;
  }

  return (
    <li
      className={classNames(
        {
          [styles.disabled]: disabled,
          [styles.selected]: value === selectedValue
        },
        styles["tooltip-container"]
      )}
      onClick={handleSelect}
      key={value}
    >
      <div>{label}</div>
      {renderSublabel(subLabel)}
      {renderTooltip()}
    </li>
  );
}

export default OptionRenderer;
