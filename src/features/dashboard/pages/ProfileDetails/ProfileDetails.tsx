import React, { useState } from "react";
import { Arrows } from "@/components/Arrows";
import { DownloadSimple } from "@/components/DownloadSimple";
import { Edit } from "@/components/Edit";
import { Element } from "@/components/Element";
import { ImageGallery } from "@/components/ImageGallery";
import { Mail } from "@/components/Mail";
import { Phone } from "@/components/Phone";
import { SelfieVerified } from "@/components/SelfieVerified";
import { Container } from "./sections/Container";

import "./style.css";

import mail from "@/assets/images/img/mail-1.png";
import phone from "@/assets/images/img/phone-1.png";
import statusIcon from "@/assets/images/img/status-icon.png";
import { ProfileHeader } from "@/common/components/ui/ProfileHeader";
import { ProfileFooter } from "@/common/components/ui/ProfileFooter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import arrows from "@/assets/images/img/arrows.png";
import downloadSimple from "@/assets/images/img/downloadsimple-1.png";
import edit from "@/assets/images/img/edit-1.png";

export const ProfileDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<string>("basic-info");

  return (
    <>
    <ProfileHeader 
      arrowenable={true}
      arrowHandler={() => navigate(-1)}
      downloadenable={true}
      editenable={true} 
      profileenable={true}
      arrowwithProfile={true}
      />  
    <div className="profile-details" data-model-id="399:17822">
      
      <ImageGallery
        className="profile-picture"
        divClassName="profile-picture-6"
        divClassNameOverride="profile-picture-7"
        ellipseClassName="profile-picture-4"
        ellipseClassName1="profile-picture-8"
        ellipseClassNameOverride="profile-picture-5"
        groupClassName="profile-picture-3"
        overlapGroupClassName="profile-picture-2"
        property1="variant-3"
        rectangleClassName="image-gallery-instance"
      />
      <div className="phone-2">
        <Element
          className="icon"
          override={
            <Phone
              className="design-component-instance-node-3"
                phone={phone}
            />
          }
          property1="icon"
        />
        <div className="label-5">Phone</div>

        <div className="body-7">{user?.phoneNumber || 'Not provided'}</div>
      </div>

      <div className="email">
        <Element
          className="icon"
          override={
            <Mail
              className="design-component-instance-node-3"
              mail={mail}
            />
          }
          property1="icon"
        />
        <div className="label-5">Email</div>

        <div className="body-7">{user?.email || 'Not provided'}</div>
      </div>

      <Container activeTab={activeTab} user={user} />
      
      {/* Replace static section headers with clickable tabs */}
      <div className="container-2">
        <div 
          className={`overlap-group-wrapper ${activeTab === "basic-info" ? "active" : ""}`}
          onClick={() => setActiveTab("basic-info")}
          style={{ cursor: "pointer" }}
        >
          <div className="body-pt-wrapper">
            <div className="body-8">Basic Info</div>
          </div>
        </div>

        <div 
          className={`overlap-wrapper ${activeTab === "astro" ? "active" : ""}`}
          onClick={() => setActiveTab("astro")}
          style={{ cursor: "pointer" }}
        >
          <div className="body-pt-wrapper">
            <div className="body-9">Astro</div>
          </div>
        </div>

        <div 
          className={`overlap-wrapper ${activeTab === "family" ? "active" : ""}`}
          onClick={() => setActiveTab("family")}
          style={{ cursor: "pointer" }}
        >
          <div className="body-pt-wrapper">
            <div className="body-9">Family</div>
          </div>
        </div>

        <div 
          className={`list-rows-13 ${activeTab === "career-details" ? "active" : ""}`}
          onClick={() => setActiveTab("career-details")}
          style={{ cursor: "pointer" }}
        >
          <div className="body-pt-wrapper">
            <div className="body-9">Career &amp; Education</div>
          </div>
        </div>

        <div 
          className={`list-rows-14 ${activeTab === "spiritual" ? "active" : ""}`}
          onClick={() => setActiveTab("spiritual")}
          style={{ cursor: "pointer" }}
        >
          <div className="body-pt-wrapper">
            <div className="body-9">Spirituality</div>
          </div>
        </div>

        <div 
          className={`list-rows-14 ${activeTab === "personality" ? "active" : ""}`}
          onClick={() => setActiveTab("personality")}
          style={{ cursor: "pointer" }}
        >
          <div className="body-pt-wrapper">
            <div className="body-9">Personality</div>
          </div>
        </div>

        <div 
          className={`list-rows-15 ${activeTab === "partner-preferences" ? "active" : ""}`}
          onClick={() => setActiveTab("partner-preferences")}
          style={{ cursor: "pointer" }}
        >
          <div className="body-pt-wrapper">
            <div className="body-9">Preferences</div>
          </div>
        </div>
      </div>

     
     
       
    </div>
    <ProfileFooter />
    </>
  );
};
