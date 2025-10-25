import PropTypes from "prop-types";
import React from "react";
import "./SignOut/style.css";

interface Props {
  className: any;
  signOut: string;
}

export const SignOut = ({
  className,
  signOut = "/assets/images/img/sign-out.png",
}: Props): JSX.Element => {
  return <img className={`sign-out ${className}`} alt="Sign Out" src={signOut} />;
};

SignOut.propTypes = {
  signOut: PropTypes.string,
};
