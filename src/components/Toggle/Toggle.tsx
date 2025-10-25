/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import toggleOn from "@/assets/images/img/toggle-7.png";

interface ToggleProps {
  className?: string;
  state?: "on" | "off";
  stateOn?: string;
  onClick?: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ 
  className = "", 
  state = "on",
  stateOn = toggleOn,
  onClick
}) => {
  return (
    <div 
      className={`toggle ${className} ${state}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img 
        className="toggle-img" 
        alt="Toggle switch" 
        src={stateOn} 
      />
    </div>
  );
};
