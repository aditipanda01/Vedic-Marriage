/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface PrivacyProps {
  className?: string;
  privacy?: string;
}

export const Privacy: React.FC<PrivacyProps> = ({ 
  className = "", 
  privacy = "../../../assets/images/img/privacy-1.png" 
}) => {
  return (
    <div className={`privacy ${className}`}>
      <img 
        className="privacy-img" 
        alt="Privacy icon" 
        src={privacy} 
      />
    </div>
  );
};
