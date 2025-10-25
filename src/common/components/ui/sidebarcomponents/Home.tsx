import PropTypes from "prop-types";
import React from "react";
import "./Home/style.css";

interface Props {
  className: any;
  home: string;
}

export const Home = ({
  className,
  home = "/assets/images/img/home.png",
}: Props): JSX.Element => {
  return <img className={`home ${className}`} alt="Home" src={home} />;
};

Home.propTypes = {
  home: PropTypes.string,
};
