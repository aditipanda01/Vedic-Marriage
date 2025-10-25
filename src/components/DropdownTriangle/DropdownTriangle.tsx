/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface DropdownTriangleProps {
  className?: string;
  polygon?: string;
  polygonClassName?: string;
}

export const DropdownTriangle: React.FC<DropdownTriangleProps> = ({ 
  className = "", 
  polygon = "../../../assets/images/img/polygon-1-10.png",
  polygonClassName = "" 
}) => {
  return (
    <div className={`dropdown-triangle ${className}`}>
      <img 
        className={`polygon ${polygonClassName}`} 
        alt="Dropdown indicator" 
        src={polygon} 
      />
    </div>
  );
};
