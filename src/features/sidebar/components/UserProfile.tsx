import PropTypes from "prop-types";
import React from "react";
import "./UserProfile/style.css";

interface Props {
  className: any;
  userProfile: string;
}

export const UserProfile = ({
  className,
  userProfile = "/assets/images/img/user-profile.png",
}: Props): JSX.Element => {
  return <img className={`user-profile ${className}`} alt="User Profile" src={userProfile} />;
};

UserProfile.propTypes = {
  userProfile: PropTypes.string,
};
