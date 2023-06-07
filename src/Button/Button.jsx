import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <button className="btn btn-1" onClick={props.handleClick} type={props.type}>
      <span>{props.children}</span>
    </button>
  );
};

export default Button;
