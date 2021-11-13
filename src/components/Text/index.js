import React from "react";

const TYPE = {
  TITLE: "title",
  SUB_TITLE: "sub_title",
  LABEL: "label",
  SPAN: "span"
};

function Title(props) {
  return <h2 {...props}>{props.children}</h2>;
}

function SubTitle(props) {
  return <h3 {...props}>{props.children}</h3>;
}

function Label(props) {
  return (
    <strong {...props}>
      <label>{props.children}</label>
    </strong>
  );
}

function Span(props) {
  return <span {...props}>{props.children}</span>;
}

function Text(props) {
  function getComponent() {
    switch (props.type) {
      case TYPE.TITLE:
        return Title;
      case TYPE.SUB_TITLE:
        return SubTitle;
      case TYPE.LABEL:
        return Label;
      default:
        return Span;
    }
  }
  const TextComponent = getComponent();
  return <TextComponent {...props}>{props.children}</TextComponent>;
}

Text.defaultProps = {
  type: TYPE.SPAN
};

Text.TYPE = TYPE;
Text.Title = Title;
Text.SubTitle = SubTitle;
Text.Label = Label;
Text.Span = Span;

export default Text;
