/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  property1: "default";
  className: any;
  propertyDefault: string;
}

export const TickMark = ({
  property1,
  className,
  propertyDefault = "/img/property-1-default-1.png",
}: Props): JSX.Element => {
  return (
    <img
      className={`tick-mark ${className}`}
      alt="Property default"
      src={propertyDefault}
    />
  );
};

TickMark.propTypes = {
  property1: PropTypes.oneOf(["default"]),
  propertyDefault: PropTypes.string,
};
