/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  property1: "up" | "down";
  className: any;
  propertyUp: string;
  propertyDown: string;
}

export const Chevron = ({
  property1,
  className,
  propertyUp = "/img/property-1-up.png",
  propertyDown = "/img/property-1-down.png",
}: Props): JSX.Element => {
  return (
    <img
      className={`chevron ${className}`}
      alt="Property up"
      src={property1 === "down" ? propertyDown : propertyUp}
    />
  );
};

Chevron.propTypes = {
  property1: PropTypes.oneOf(["up", "down"]),
  propertyUp: PropTypes.string,
  propertyDown: PropTypes.string,
};
