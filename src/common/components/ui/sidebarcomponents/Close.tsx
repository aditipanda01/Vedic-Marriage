import PropTypes from "prop-types";
import React from "react";
import "./Close/style.css";

interface Props {
  className: any;
  close: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const Close = ({
  className,
  close = "/assets/images/img/close.png",
  onClick,
}: Props): JSX.Element => {
  return <img className={`close ${className}`} alt="Close" src={close} onClick={onClick} style={{ cursor: 'pointer' }} />;
};

Close.propTypes = {
  close: PropTypes.string,
  onClick: PropTypes.func,
};
