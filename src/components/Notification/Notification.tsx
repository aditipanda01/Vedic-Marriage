/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  property1: "no-notification";
  className: any;
  propertyNo: string;
}

export const Notification = ({
  property1,
  className,
  propertyNo = "/img/property-1-no-notification.png",
}: Props): JSX.Element => {
  return (
    <img
      className={`notification ${className}`}
      alt="Property no"
      src={propertyNo}
    />
  );
};

Notification.propTypes = {
  property1: PropTypes.oneOf(["no-notification"]),
  propertyNo: PropTypes.string,
};
