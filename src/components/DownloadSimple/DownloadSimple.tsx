/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  downloadSimple: string;
}

export const DownloadSimple = ({
  className,
  downloadSimple = "/img/downloadsimple.png",
}: Props): JSX.Element => {
  return (
    <img
      className={`download-simple ${className}`}
      alt="Download simple"
      src={downloadSimple}
    />
  );
};

DownloadSimple.propTypes = {
  downloadSimple: PropTypes.string,
};
