import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import OptionRenderer from "./OptionRenderer";

function Select(props) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef(null);
  const node = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
    };
  }, []);

  function getSelectedItem() {
    const { value, options } = props;
    if (!Array.isArray(options)) return null;
    return options.find((each) => each.value === value) || null;
  }

  function handleSelect(option) {
    const { disabled } = option || {};
    if (disabled) return;
    if (typeof props.onChange === "function") {
      props.onChange(option);
    }
    setOpen(false);
  }

  function handleClick(e) {
    const element = node.current;
    if (e.target !== element && !element.contains(e.target)) {
      setOpen(false);
    }
  }

  function renderOption(option) {
    return (
      <OptionRenderer
        selectedValue={props.value}
        onSelect={handleSelect}
        option={option}
      />
    );
  }

  function renderEmptyRow() {
    return <li className={styles["empty-row"]}>Nothing to select here</li>;
  }

  function renderOptions() {
    const { options } = props;
    if (!Array.isArray(options)) return null;
    const filteredOptions = options.filter((each) =>
      each.label.toLowerCase().includes(search.toLocaleLowerCase())
    );
    if (!filteredOptions.length) return renderEmptyRow();
    return filteredOptions.map(renderOption);
  }

  function renderSearchOptions() {
    return (
      <input
        type="text"
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        placeholder="search by label"
        ref={inputRef}
      />
    );
  }

  function renderOptionsContainer() {
    return (
      <div
        className={classNames(styles["custom-select-options-container"], {
          [styles.open]: open
        })}
        ref={node}
      >
        {renderSearchOptions()}
        <ul>{renderOptions()}</ul>
      </div>
    );
  }

  function renderSelectedValue() {
    if (!props.value) return props.placeholder;
    const selectedItem = getSelectedItem() || {};
    return selectedItem.label || props.value || "";
  }

  return (
    <div className={classNames(styles["custom-select"])}>
      <div
        className={classNames(styles["custom-select-value"])}
        onClick={(evt) => {
          evt.stopPropagation();
          evt.preventDefault();
          setOpen(!open);
        }}
      >
        {renderSelectedValue()}
      </div>
      {renderOptionsContainer()}
    </div>
  );
}

Select.defaultProps = {
  value: "",
  options: [],
  placeholder: "Select..."
};

export default Select;
