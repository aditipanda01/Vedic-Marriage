import React, { useEffect, useState } from "react";
import { Arrows } from "../../../../components/Arrows";
import { DeleteAccount } from "./sections/DeleteAccount";

import { Notification } from "./sections/Notification";
import { PrivacySection } from "./sections/PrivacySection";
import "./style.css";
import accountSettings from "@/assets/images/img/account-settings-1.png";
import { DetailsHeader } from "@/features/detailsHeader";
import { ProfileHeader } from "@/common/components/ui/ProfileHeader";
import { useNavigate } from "react-router-dom";
import { ProfileFooter } from "@/common/components/ui/ProfileFooter";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const AccountSettings = (): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    if (user) {
      setEmail(user.email)  
      setPhone(user.phoneNumber)
      setPassword(user.username)
    }
  },[])
  return (
    <div className="account-settings" data-model-id="412:28043">
      <ProfileHeader 
      
      
      arrowenable={true}
      arrowHandler={() => navigate(-1)}
      HeaderHeading="Account & Privacy"
      />
      {/* <img
        className="img"
        alt="Account settings"
        src={accountSettings}
      /> */}
       <div className="account-settings-container">
        <div className="account-settings-title">Account Setting</div>
          {/* Email ID Input */}
          <div className="input-field">
            <label className="input-label">Email ID</label>
            <div className="input-container">
              <span className="input-icon">@</span>
              <input 
                type="email" 
                className="input-box" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                 
              />
              <button className="action-button">Update Email</button>
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="input-field">
            <label className="input-label">Phone Number</label>
            <div className="input-container">
              <span className="input-icon">📞</span>
              <input 
                type="tel" 
                className="input-box" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                 
              />
              <button className="action-button">Update Phone</button>
            </div>
          </div>

          {/* Password Input */}
          <div className="input-field">
            <label className="input-label">Password</label>
            <div className="input-container">
              <span className="input-icon">**</span>
              <input 
                type="password" 
                className="input-box" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                 
              />
              <button className="action-button">Change Password</button>
            </div>
          </div>
        </div>
      <PrivacySection />
      
      <Notification />
      <DeleteAccount />
      <div className="margin-buttom-20">
      </div>
      {/* <DetailsHeader title="Account & Privacy" /> */}
      <ProfileFooter />
    </div>
  );
};
