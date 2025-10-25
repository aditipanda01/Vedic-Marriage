/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface ArrowsProps {
  className?: string;
  direction?: "back" | "forward";
  directionBack?: string;
}

export const Arrows: React.FC<ArrowsProps> = ({ 
  className = "", 
  direction = "back",
  directionBack = "/assets/images/img/arrows.png" 
}) => {
  return (
    <div className={`arrows ${className}`}>
      <img 
        className="arrows-img" 
        alt="Navigation arrow" 
        src={directionBack} 
      />
    </div>
  );
};
