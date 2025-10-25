/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";
import deleteIcon from "@/assets/images/img/delete-1.png";

interface DeleteProps {
  className?: string;
  img?: string;
}

export const Delete: React.FC<DeleteProps> = ({ 
  className = "", 
  img = deleteIcon
}) => {
  return (
    <div className={`delete ${className}`}>
      <img 
        className="delete-img" 
        alt="Delete icon" 
        src={img} 
      />
    </div>
  );
};
