/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  phone: string;
}

export const Phone = ({
  className,
  phone = "/img/phone.png",
}: Props): JSX.Element => {
  return <img className={`phone ${className}`} alt="Phone" src={phone} />;
};

Phone.propTypes = {
  phone: PropTypes.string,
};
