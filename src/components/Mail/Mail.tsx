/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  mail: string;
}

export const Mail = ({
  className,
  mail = "/img/mail.png",
}: Props): JSX.Element => {
  return <img className={`mail ${className}`} alt="Mail" src={mail} />;
};

Mail.propTypes = {
  mail: PropTypes.string,
};
