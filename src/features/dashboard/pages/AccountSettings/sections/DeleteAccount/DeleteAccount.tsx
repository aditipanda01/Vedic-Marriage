import React from "react";
import { Delete } from "@/components/Delete";
import deleteIcon from "@/assets/images/img/delete-1.png";
import "./style.css";

export const DeleteAccount: React.FC = () => {
  return (
    <div className="delete-account">
      <div className="div-4">
        <div className="delete-wrapper">
          <Delete className="delete-instance" img={deleteIcon} />
        </div>

        <div className="frame-2">
          <div className="label-4">Delete My Account</div>

          <p className="body-5">
            Permanently remove your profile and associated data from the
            platform.
          </p>
        </div>
      </div>
    </div>
  );
};
