import React, { useEffect, useState } from "react";
import { DropdownTriangle } from "@/components/DropdownTriangle";
import { Element } from "@/components/Element";
import { Privacy } from "@/components/Privacy";
import { Rows } from "@/components/Rows";
import { Toggle } from "@/components/Toggle";
import "./style.css";
import privacy from "@/assets/images/img/privacy-1.png";
import polygon from "@/assets/images/img/polygon-1-10.png";
import toggle from "@/assets/images/img/toggle-7.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const PrivacySection: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [privacySettings, setPrivacySettings] = useState({
    basicDetails: "Everyone",
    familyDetails: "Everyone", 
    astroDetails: "Everyone",
    careerDetails: "Everyone",
    spiritualDetails: "Everyone",
    personalityQuestions: "Everyone",
    // partnerPreferences: "Everyone",
    photoPrivacy: "Everyone",
    contactPrivacy: "Everyone",
    activityStatus: "Everyone"
  });
  useEffect(()=>{
    if (user) {
      setPrivacySettings({
        basicDetails: user.privacy_setups?.basic_privacy || "Everyone",
        familyDetails: user.privacy_setups?.family_privacy || "Everyone",
        astroDetails: user.privacy_setups?.astro_privacy || "Everyone",
        careerDetails: user.privacy_setups?.career_privacy || "Everyone",
        spiritualDetails: user.privacy_setups?.spiritual_privacy || "Everyone",
        personalityQuestions: user.privacy_setups?.personality_privacy || "Everyone",
        // partnerPreferences: user.privacy_setups?.partner_preferences || "Everyone",
        photoPrivacy: user.privacy_setups?.photo_privacy || "Everyone",
        contactPrivacy: user.privacy_setups?.contact_privacy || "Everyone",
        activityStatus: user.privacy_setups?.activity_status || "Everyone"
      })
    }
  },[])
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const toggleDropdown = (dropdownKey: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  const updatePrivacySetting = (settingKey: string, value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [settingKey]: value
    }));
    setOpenDropdowns(prev => ({
      ...prev,
      [settingKey]: false
    }));
  };

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(prev => !prev);
  };

  const privacyOptions = ["Only Me", "Connections", "Everyone"];

  return (
    <div className="privacy-section">
      <div className="privacy-heading">
        <Element
          className="icon"
          override={
            <Privacy
              className="design-component-instance-node"
              privacy={privacy}
            />
          }
          property1="icon"
        />
        <div className="label">Privacy</div>

        <div className="body">Setup Your Privacy</div>
      </div>

      <Rows
        className="subheading"
        divClassName="rows-instance"
        divClassNameOverride=""
        overlapGroupClassName=""
        property1="free-text"
        text="Profile Details Visibility Preferences"
        text1=""
        text2=""
      />
      <div className="div">
        <Rows
          className="rows-2"
          divClassName="rows-3"
          divClassNameOverride=""
          overlapGroupClassName=""
          property1="free-text"
          text="Basic Details"
          text1=""
          text2=""
        />
        <div className="rows-4">
          <Element
            className="action"
            override={
              <DropdownTriangle
                className={`dropdown-triangle-instance ${openDropdowns.basicDetails ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="body-pt dropdown-trigger"
            onClick={() => toggleDropdown('basicDetails')}
          >
            {privacySettings.basicDetails}
          </div>
          {openDropdowns.basicDetails && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('basicDetails', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="div">
        <Rows
          className="rows-2"
          divClassName="rows-3"
          divClassNameOverride=""
          overlapGroupClassName=""
          property1="free-text"
          text="Family Details"
          text1=""
          text2=""
        />
        <div className="rows-4">
          <Element
            className="action"
            override={
              <DropdownTriangle
                className={`dropdown-triangle-instance ${openDropdowns.familyDetails ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="body-pt dropdown-trigger"
            onClick={() => toggleDropdown('familyDetails')}
          >
            {privacySettings.familyDetails}
          </div>
          {openDropdowns.familyDetails && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('familyDetails', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="div">
        <Rows
          className="rows-2"
          divClassName="rows-3"
          divClassNameOverride=""
          overlapGroupClassName=""
          property1="free-text"
          text="Astro Details"
          text1=""
          text2=""
        />
        <div className="rows-4">
          <Element
            className="action"
            override={
              <DropdownTriangle
                className={`dropdown-triangle-instance ${openDropdowns.astroDetails ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="body-pt dropdown-trigger"
            onClick={() => toggleDropdown('astroDetails')}
          >
            {privacySettings.astroDetails}
          </div>
          {openDropdowns.astroDetails && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('astroDetails', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="div">
        <Rows
          className="rows-2"
          divClassName="rows-3"
          divClassNameOverride=""
          overlapGroupClassName=""
          property1="free-text"
          text="Career Details"
          text1=""
          text2=""
        />
        <div className="rows-4">
          <Element
            className="action"
            override={
              <DropdownTriangle
                className={`dropdown-triangle-instance ${openDropdowns.careerDetails ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="body-pt dropdown-trigger"
            onClick={() => toggleDropdown('careerDetails')}
          >
            {privacySettings.careerDetails}
          </div>
          {openDropdowns.careerDetails && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('careerDetails', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="div">
        <Rows
          className="rows-2"
          divClassName="rows-3"
          divClassNameOverride=""
          overlapGroupClassName=""
          property1="free-text"
          text="Spiritual Details"
          text1=""
          text2=""
        />
        <div className="rows-4">
          <Element
            className="action"
            override={
              <DropdownTriangle
                className={`dropdown-triangle-instance ${openDropdowns.spiritualDetails ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="body-pt dropdown-trigger"
            onClick={() => toggleDropdown('spiritualDetails')}
          >
            {privacySettings.spiritualDetails}
          </div>
          {openDropdowns.spiritualDetails && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('spiritualDetails', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="div">
        <Rows
          className="rows-2"
          divClassName="rows-3"
          divClassNameOverride=""
          overlapGroupClassName=""
          property1="free-text"
          text="Personality Questions"
          text1=""
          text2=""
        />
        <div className="rows-4">
          <Element
            className="action"
            override={
              <DropdownTriangle
                className={`dropdown-triangle-instance ${openDropdowns.personalityQuestions ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="body-pt dropdown-trigger"
            onClick={() => toggleDropdown('personalityQuestions')}
          >
            {privacySettings.personalityQuestions}
          </div>
          {openDropdowns.personalityQuestions && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('personalityQuestions', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* <div className="div">
        <Rows
          className="rows-2"
          divClassName="rows-3"
          divClassNameOverride=""
          overlapGroupClassName=""
          property1="free-text"
          text="Partner Preferences"
          text1=""
          text2=""
        />
        <div className="rows-4">
          <Element
            className="action"
            override={
              <DropdownTriangle
                className={`dropdown-triangle-instance ${openDropdowns.partnerPreferences ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="body-pt dropdown-trigger"
            onClick={() => toggleDropdown('partnerPreferences')}
          >
            {privacySettings.partnerPreferences}
          </div>
          {openDropdowns.partnerPreferences && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('partnerPreferences', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}

      <div className="div">
        <Rows
          className="rows-7"
          divClassName=""
          divClassNameOverride="rows-5"
          overlapGroupClassName="rows-6"
          property1="label-free-text"
          text="Who can see my Picture?"
          text1="Photo Privacy"
          text2=""
        />
        <div className="rows-8">
          <Element
            className="element-h"
            override={
              <DropdownTriangle
                className={`design-component-instance-node ${openDropdowns.photoPrivacy ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="text-wrapper dropdown-trigger"
            onClick={() => toggleDropdown('photoPrivacy')}
          >
            {privacySettings.photoPrivacy}
          </div>
          {openDropdowns.photoPrivacy && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('photoPrivacy', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="div">
        <Rows
          className="rows-7"
          divClassName=""
          divClassNameOverride="rows-5"
          overlapGroupClassName="rows-6"
          property1="label-free-text"
          text="Who can see my contact details?"
          text1="Contact Privacy"
          text2=""
        />
        <div className="rows-8">
          <Element
            className="element-h"
            override={
              <DropdownTriangle
                className={`design-component-instance-node ${openDropdowns.contactPrivacy ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="text-wrapper dropdown-trigger"
            onClick={() => toggleDropdown('contactPrivacy')}
          >
            {privacySettings.contactPrivacy}
          </div>
          {openDropdowns.contactPrivacy && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('contactPrivacy', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="div">
        <Rows
          className="rows-7"
          divClassName=""
          divClassNameOverride="rows-5"
          overlapGroupClassName="rows-6"
          property1="label-free-text"
          text="Who can see my Online ?"
          text1="Activity Status"
          text2=""
        />
        <div className="rows-8">
          <Element
            className="element-h"
            override={
              <DropdownTriangle
                className={`design-component-instance-node ${openDropdowns.activityStatus ? 'rotated' : ''}`}
                polygon={polygon}
                polygonClassName="dropdown-triangle-2"
              />
            }
            property1="icon"
          />
          <div 
            className="text-wrapper dropdown-trigger"
            onClick={() => toggleDropdown('activityStatus')}
          >
            {privacySettings.activityStatus}
          </div>
          {openDropdowns.activityStatus && (
            <div className="dropdown-menu">
              {privacyOptions.map(option => (
                <div 
                  key={option}
                  className="dropdown-option"
                  onClick={() => updatePrivacySetting('activityStatus', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="two-factor">
        <div className="toggle-wrapper">
          <Toggle
            className="toggle-2"
            state={twoFactorEnabled ? "on" : "off"}
            stateOn={toggle}
            onClick={toggleTwoFactor}
          />
        </div>
        <div className="label-pt">Two-factor Authentication</div>

        <p className="p">
          Add extra layer of protection by two-factor authentication
        </p>
      </div>
    </div>
  );
};
