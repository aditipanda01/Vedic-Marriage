import PropTypes from "prop-types";
import React from "react";
import "./Heart/style.css";

interface Props {
  className: any;
  property1: "inactive";
  propertyInactive: string;
}

export const Heart = ({
  className,
  property1,
  propertyInactive = "/assets/images/img/heart.png",
}: Props): JSX.Element => {
  return (
    <img
      className={`heart ${className}`}
      alt="Heart"
      src={propertyInactive}
    />
  );
};

Heart.propTypes = {
  property1: PropTypes.oneOf(["inactive"]),
  propertyInactive: PropTypes.string,
};
