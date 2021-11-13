import React from "react";

function Button(props) {
  const { onClick, className, disabled } = props;
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {props.children}
    </button>
  );
}

export default Button;
