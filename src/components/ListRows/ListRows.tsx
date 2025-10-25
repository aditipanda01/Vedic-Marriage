/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  property1: "label-free-text" | "free-text";
  className: any;
  divClassName: any;
  text: string;
  divClassNameOverride: any;
  text1: string;
  divClassName1: any;
}

export const ListRows = ({
  property1,
  className,
  divClassName,
  text = "Body 14pt",
  divClassNameOverride,
  text1 = "Label 11pt",
  divClassName1,
}: Props): JSX.Element => {
  return (
    <div className={`list-rows ${className}`}>
      <div
        className={`body-6 ${property1} ${property1 === "label-free-text" ? divClassName : (property1 === "free-text") ? divClassName1 : undefined}`}
      >
        {text}
      </div>

      {property1 === "label-free-text" && (
        <div className={`label-4 ${divClassNameOverride}`}>{text1}</div>
      )}
    </div>
  );
};

ListRows.propTypes = {
  property1: PropTypes.oneOf(["label-free-text", "free-text"]),
  text: PropTypes.string,
  text1: PropTypes.string,
};
