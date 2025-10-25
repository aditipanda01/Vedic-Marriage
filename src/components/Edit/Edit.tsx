/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  edit: string;
}

export const Edit = ({
  className,
  edit = "/img/edit.png",
}: Props): JSX.Element => {
  return <img className={`edit ${className}`} alt="Edit" src={edit} />;
};

Edit.propTypes = {
  edit: PropTypes.string,
};
