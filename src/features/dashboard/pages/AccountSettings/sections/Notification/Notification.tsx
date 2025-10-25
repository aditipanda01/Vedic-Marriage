import React, { useState } from "react";
import { Element } from "@/components/Element";
import { PropertyNoWrapper } from "@/components/PropertyNoWrapper";
import { Rows } from "@/components/Rows";
import { Toggle } from "@/components/Toggle";
import notification from "@/assets/images/img/notification.png";
import toggle from "@/assets/images/img/toggle-7.png";
import "./style.css";

export const Notification: React.FC = () => {
  const [allNotificationsEnabled, setAllNotificationsEnabled] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState({
    newConnectionRequest: true,
    acceptedConnectionRequests: true,
    newMatchNotification: true
  });
  const [emailNotifications, setEmailNotifications] = useState({
    newConnectionRequest: true,
    acceptedConnectionRequests: true,
    newMatchNotification: true
  });

  const toggleAllNotifications = () => {
    setAllNotificationsEnabled(prev => !prev);
  };

  const toggleSmsNotification = (type: keyof typeof smsNotifications) => {
    setSmsNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const toggleEmailNotification = (type: keyof typeof emailNotifications) => {
    setEmailNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="notification">
      <div className="div-2">
        <Element
          className="element-instance"
          override={
            <PropertyNoWrapper
              className="notification-instance"
              property1="no-notification"
              propertyNo={notification}
            />
          }
          property1="icon"
        />
        <div className="label-2">Notification</div>

        <div className="body-2">Set your Notification Preferences</div>
      </div>

      <div className="notification-on-off">
        <div className="frame">
          <div className="body-3">Turn off All Notifications</div>
        </div>

        <div className="toggle-wrapper">
          <Toggle 
            className="toggle-2" 
            state={allNotificationsEnabled ? "on" : "off"} 
            stateOn={toggle}
            onClick={toggleAllNotifications}
          />
        </div>
      </div>

      <Rows
        className="rows-9"
        divClassName="rows-10"
        divClassNameOverride=""
        overlapGroupClassName=""
        property1="sub-section-title"
        text=""
        text1=""
        text2="SMS Notifications"
      />
      <div className="div-3">
        <div className="toggle-wrapper">
          <Toggle
            className="toggle-2"
            state={smsNotifications.newConnectionRequest ? "on" : "off"}
            stateOn={toggle}
            onClick={() => toggleSmsNotification('newConnectionRequest')}
          />
        </div>
        <div className="label-3">New Connection Request</div>

        <p className="body-4">
          Add extra layer of protection by two-factor authentication
        </p>
      </div>

      <div className="div-3">
        <div className="toggle-wrapper">
          <Toggle
            className="toggle-2"
            state={smsNotifications.acceptedConnectionRequests ? "on" : "off"}
            stateOn={toggle}
            onClick={() => toggleSmsNotification('acceptedConnectionRequests')}
          />
        </div>
        <div className="label-3">Accepted Connection Requests</div>

        <p className="body-4">
          Add extra layer of protection by two-factor authentication
        </p>
      </div>

      <div className="div-3">
        <div className="toggle-wrapper">
          <Toggle
            className="toggle-2"
            state={smsNotifications.newMatchNotification ? "on" : "off"}
            stateOn={toggle}
            onClick={() => toggleSmsNotification('newMatchNotification')}
          />
        </div>
        <div className="label-3">New Match Notification</div>

        <p className="body-4">
          Add extra layer of protection by two-factor authentication
        </p>
      </div>

      <Rows
        className="rows-9"
        divClassName="rows-10"
        divClassNameOverride=""
        overlapGroupClassName=""
        property1="sub-section-title"
        text=""
        text1=""
        text2="Email Notifications"
      />
      <div className="div-3">
        <div className="toggle-wrapper">
          <Toggle
            className="toggle-2"
            state={emailNotifications.newConnectionRequest ? "on" : "off"}
            stateOn={toggle}
            onClick={() => toggleEmailNotification('newConnectionRequest')}
          />
        </div>
        <div className="label-3">New Connection Request</div>

        <p className="body-4">
          Add extra layer of protection by two-factor authentication
        </p>
      </div>

      <div className="div-3">
        <div className="toggle-wrapper">
          <Toggle
            className="toggle-2"
            state={emailNotifications.acceptedConnectionRequests ? "on" : "off"}
            stateOn={toggle}
            onClick={() => toggleEmailNotification('acceptedConnectionRequests')}
          />
        </div>
        <div className="label-3">Accepted Connection Requests</div>

        <p className="body-4">
          Add extra layer of protection by two-factor authentication
        </p>
      </div>

      <div className="div-3">
        <div className="toggle-wrapper">
          <Toggle
            className="toggle-2"
            state={emailNotifications.newMatchNotification ? "on" : "off"}
            stateOn={toggle}
            onClick={() => toggleEmailNotification('newMatchNotification')}
          />
        </div>
        <div className="label-3">New Match Notification</div>

        <p className="body-4">
          Add extra layer of protection by two-factor authentication
        </p>
      </div>
    </div>
  );
};
