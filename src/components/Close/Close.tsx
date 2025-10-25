/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  close: string;
}

export const Close = ({
  className,
  close = "/img/close.png",
}: Props): JSX.Element => {
  return <img className={`close ${className}`} alt="Close" src={close} />;
};

Close.propTypes = {
  close: PropTypes.string,
};
