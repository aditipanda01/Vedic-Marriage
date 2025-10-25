/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Info } from "../Info";
import "./style.css";

interface Props {
  property1: "icon";
  className: any;
  override: JSX.Element;
}

export const Element = ({
  property1,
  className,
  override = <Info className="info-instance" info="/img/info-20.png" />,
}: Props): JSX.Element => {
  return <div className={`element ${className}`}>{override}</div>;
};

Element.propTypes = {
  property1: PropTypes.oneOf(["icon"]),
};
