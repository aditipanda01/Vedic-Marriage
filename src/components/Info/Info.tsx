/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  info: string;
}

export const Info = ({
  className,
  info = "/img/info-21.png",
}: Props): JSX.Element => {
  return <img className={`info ${className}`} alt="Info" src={info} />;
};

Info.propTypes = {
  info: PropTypes.string,
};
