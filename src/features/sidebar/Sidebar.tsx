import React from "react";
import { Close } from "./components/Close";
import { Heart } from "./components/Heart";
import { Home } from "./components/Home";
import { SignOut } from "./components/SignOut";
import { UserProfile } from "./components/UserProfile";
import "./style.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps): JSX.Element | null => {
  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Close button clicked');
    onClose();
  };

  return (
    <div className="iphone" data-model-id="449:16752" style={{ 
      zIndex: 9999, 
      position: 'fixed', 
      top: 0, 
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'auto'
    }}>
      <div className="rectangle" onClick={onClose} style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9998
      }} />

      <div className="frame" style={{ 
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '320px'
      }}>
        <div className="overlap-group">
          <div className="div">
            <div className="frame-2">
              <div className="autolayout-row">
                <div className="div-2">
                  <Home className="home-instance" home="/assets/images/img/home-1.png" />
                </div>

                <div className="body-wrapper">
                  <div className="body">Home</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">All (32)</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Near Me (3)</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">New (4)</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Recently viewed (2)</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Shortlisted (3)</div>
                </div>
              </div>
            </div>

            <div className="frame-2">
              <div className="autolayout-row">
                <div className="div-2">
                  <Heart
                    className="design-component-instance-node"
                    property1="inactive"
                    propertyInactive="/assets/images/img/heart.png"
                  />
                </div>

                <div className="body-wrapper">
                  <div className="body">My Matches</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Accepted</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Requests</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Recommended</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Sent Requests</div>
                </div>
              </div>
            </div>

            <div className="frame-2">
              <div className="autolayout-row">
                <div className="div-2">
                  <UserProfile
                    className="design-component-instance-node"
                    userProfile="/assets/images/img/user-profile-1.png"
                  />
                </div>

                <div className="body-wrapper">
                  <div className="body">Profile</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Edit Profile</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Settings</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Privacy</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Plans and Subscription</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Blocked Users</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Support</div>
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="body-wrapper">
                  <div className="body-pt">Sign Out</div>
                </div>

                <div className="div-2">
                  <SignOut
                    className="sign-out-instance"
                    signOut="/assets/images/img/sign-out-1.png"
                  />
                </div>
              </div>

              <div className="autolayout-row-2">
                <div className="icon" />

                <div className="frame-3" />
              </div>
            </div>
          </div>

          <div className="rectangle-2" />
        </div>

        <div className="frame-4">
          <img
            className="final-colour-logo"
            alt="Final colour logo"
            src="/assets/images/img/final-colour-logo-1-1.png"
          />

          <img className="group" alt="Group" src="/assets/images/img/group-1000004396.png" />

          <div className="close-wrapper" onClick={handleClose} style={{ cursor: 'pointer', pointerEvents: 'auto', zIndex: 10000 }}>
            <Close className="close-instance" close="/assets/images/img/close-1.png" onClick={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
};
