/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface PropertyNoWrapperProps {
  className?: string;
  property1?: "no-notification";
  propertyNo?: string;
}

export const PropertyNoWrapper: React.FC<PropertyNoWrapperProps> = ({ 
  className = "", 
  property1 = "no-notification",
  propertyNo = "../../../assets/images/img/notification.png" 
}) => {
  return (
    <div className={`property-no-wrapper ${className} ${property1}`}>
      <img 
        className="notification-img" 
        alt="Notification icon" 
        src={propertyNo} 
      />
    </div>
  );
};
