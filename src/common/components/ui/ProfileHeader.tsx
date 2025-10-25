import React, { useState, useRef } from 'react';
import { Sidebar } from './SideBar';
import menu from '@/assets/images/img/menu-1.png';
import download from '@/assets/images/img/downloadsimple-2.png';
import edit from '@/assets/images/img/edit-3.png';
import statusIcon from '@/assets/images/img/status-icon.png';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Home,
  MessageCircle,
  Heart,
  Bell,
  User,
  Target,
  MessageSquare,
  CreditCard,
  Headphones,
  ChevronRight,
  LucideIcon,
  MoreVertical,
  Ban,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { ROUTES } from '@/common/constants/routes';

interface ProfileHeaderProps {
  menuenable?: boolean;
  downloadenable?: boolean;
  editenable?: boolean;
  arrowenable?: boolean;
  profileenable?: boolean;
  plusenable?: boolean;
  plusHandler?: () => void;
  arrowHandler?: () => void;
  HeaderHeading?: string;
  arrowwithProfile?: boolean;
  buttonenable?: boolean;
  buttonHandler?: () => void;
  buttonText?: string;
  moreverticalenable?: boolean;
  profileimage?: boolean;
  searchicon?: boolean;
  searchHandler?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  menuenable = false,
  downloadenable = false,
  editenable = false,
  profileenable = false,
  arrowenable = false,
  plusenable = false,
  plusHandler = () => {},
  arrowHandler = () => {},
  HeaderHeading = '',
  arrowwithProfile = false,
  buttonenable = false,
  buttonHandler = () => {},
  buttonText = '',
  moreverticalenable = false,
  profileimage = false,
  searchicon = false,
  searchHandler = () => {},
}) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockModalState, setBlockModalState] = useState<'confirm' | 'blocked'>('confirm');

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    console.log('Closing sidebar');
    setIsSidebarOpen(false);
  };
  const handleBlock = () => {
    setShowDropdown(false);
    setShowBlockModal(true);
    setBlockModalState('confirm');
  };
  return (
    <>
      <header
        className="header fixed top-0 left-0 w-[390px]
          right-0  border-b z-50
        
        "
        style={{
          background:
            'linear-gradient(359deg, rgba(255, 255, 255, 1) 0%, rgba(255, 246, 242, 1) 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 100,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '390px',
          height: 'auto',
          pointerEvents: 'auto',
        }}
      >
        {arrowenable && !arrowwithProfile && (
          <div
            className={`flex items-center px-4 py-3 ${
              plusenable || arrowwithProfile || buttonenable || moreverticalenable
                ? 'justify-between'
                : 'justify-start'
            }`}
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" onClick={arrowHandler} />
            <h1 className="text-lg font-semibold text-gray-900">{HeaderHeading}</h1>
            {plusenable && (
              <Plus className="w-6 h-6 text-gray-700 cursor-pointer" onClick={plusHandler} />
            )}
            {buttonenable && (
              <button className="text-orange-500 font-medium text-sm" onClick={buttonHandler}>
                {buttonText}
              </button>
            )}
            {profileimage && (
              <div className="flex items-center gap-3">
              <img
                src="/woman-profile.png"
                alt="Riddhi Sharma"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-gray-900 text-lg">Riddhi Sharma</span>
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            )}
            {moreverticalenable && (
              <div className="relative" ref={dropdownRef}>
              <button onClick={() => setShowDropdown(!showDropdown)}>
                <MoreVertical className="w-6 h-6 text-gray-800" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48 z-20">
                  <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 w-full text-left">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">View Profile</span>
                  </button>
                  <button
                    onClick={handleBlock}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 w-full text-left"
                  >
                    <Ban className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Block</span>
                  </button>
                </div>
              )}
            </div>
            )}
            

          </div>
        )}
        {(menuenable || arrowwithProfile) && (
          <div
            className="profile-header flex items-center justify-center px-3"
            style={{
              alignSelf: 'stretch',
              flex: '0 0 auto',
              gap: '4px',
              padding: '0px 12px',
              position: 'relative',
              width: '100%',
            }}
          >
            <div
              className="container flex items-center gap-2 h-14 py-2 w-full justify-between"
              style={{
                gap: '8px',
                height: '56px',
                marginLeft: '-12px',
                marginRight: '-12px',
                padding: '8px 0px',
                position: 'relative',
                width: '390px',
              }}
            >
              {menuenable && (
                <div
                  className="more-menu flex items-center justify-center p-3 w-14"
                  style={{
                    alignSelf: 'stretch',
                    gap: '8px',
                    padding: '12px',
                    position: 'relative',
                    width: '56px',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    zIndex: 101,
                  }}
                  onClick={handleMenuClick}
                >
                  <img
                    src={menu}
                    alt="Menu"
                    className="w-6 h-6"
                    style={{
                      left: 'unset',
                      marginBottom: '-4px',
                      marginTop: '-4px',
                      position: 'relative',
                      top: 'unset',
                      height: '24px',
                      width: '24px',
                      pointerEvents: 'auto',
                    }}
                  />
                </div>
              )}
              {HeaderHeading && (
                <h1 className="text-lg font-semibold text-gray-900">{HeaderHeading}</h1>
              
              )}
              {searchicon && (
              <>
               <button onClick={searchHandler} className="p-2 hover:bg-gray-100 rounded-full">
               <Search className="w-5 h-5 text-gray-700" />
             </button>
             <button className="p-2 hover:bg-gray-100 rounded-full">
               <SlidersHorizontal className="w-5 h-5 text-gray-700" />
             </button>
              </>
              
           
            )}
              {arrowwithProfile && (
                <div
                  className="more-menu flex items-center justify-center p-3 w-14"
                  style={{
                    alignSelf: 'stretch',
                    gap: '8px',
                    padding: '12px',
                    position: 'relative',
                    width: '56px',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    zIndex: 101,
                  }}
                  onClick={arrowHandler}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                  <h1 className="text-lg font-semibold text-gray-900">{HeaderHeading}</h1>
                </div>
              )}

              {profileenable && (
                <div
                  className="profile-info flex flex-col gap-1 flex-1"
                  style={{
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    flexGrow: 1,
                    gap: '4px',
                    position: 'relative',
                  }}
                >
                  <div
                    className="title-2 text-gray-500 text-xs font-normal font-montserrat"
                    style={{
                      alignSelf: 'stretch',
                      color: 'rgba(150, 150, 150, 1)',
                      fontFamily: 'var(--label-11pt-font-family)',
                      fontSize: 'var(--label-11pt-font-size)',
                      fontStyle: 'var(--label-11pt-font-style)',
                      fontWeight: 'var(--label-11pt-font-weight)',
                      letterSpacing: 'var(--label-11pt-letter-spacing)',
                      lineHeight: 'var(--label-11pt-line-height)',
                      marginTop: '-1px',
                      position: 'relative',
                    }}
                  >
                    My Profile
                  </div>

                  <div
                    className="user-info flex items-center gap-2"
                    style={{
                      alignSelf: 'stretch',
                      flex: '0 0 auto',
                      gap: '8px',
                      position: 'relative',
                      width: '100%',
                    }}
                  >
                    <div
                      className="user-name text-black text-sm font-bold font-plus-jakarta truncate"
                      style={{
                        color: '#000000',
                        display: '-webkit-box',
                        fontFamily: '"Plus Jakarta Sans", Helvetica',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '0px',
                        lineHeight: '16px',
                        marginTop: '-1px',
                        overflow: 'hidden',
                        position: 'relative',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: 'fit-content',
                      }}
                    >
                      Raghav K
                    </div>
                    <div
                      className="status-icon"
                      style={{
                        height: '16px',
                        left: 'unset',
                        position: 'relative',
                        top: 'unset',
                        width: '16px',
                      }}
                    >
                      <img
                        src={statusIcon}
                        alt="Status"
                        className="selfie-verified"
                        style={{
                          height: '16px',
                          width: '16px',
                          display: 'block',
                          position: 'relative',
                          left: 'unset',
                          top: 'unset',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {downloadenable && (
                <div
                onClick={() => window.open(ROUTES.DOWNLOAD_PROFILE, '_blank')}
                  className="icon flex items-center justify-center p-3 w-14"
                  style={{
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center',
                    marginBottom: '-4px',
                    marginTop: '-4px',
                    padding: '12px',
                    position: 'relative',
                    width: '56px',
                  }}
                >
                  <img
                    src={download}
                    alt="Download"
                    style={{
                      left: 'unset',
                      position: 'relative',
                      top: 'unset',
                      height: '24px',
                      width: '24px',
                    }}
                  />
                </div>
              )}

              {editenable && (
                <div
                onClick={() => navigate('/my-profile')}
                  className="icon flex items-center justify-center p-3 w-14"
                  style={{
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center',
                    marginBottom: '-4px',
                    marginTop: '-4px',
                    padding: '12px',
                    position: 'relative',
                    width: '56px',
                  }}
                >
                  <img
                    src={edit}
                    alt="Edit"
                    style={{
                      height: '24px',
                      left: 'unset',
                      position: 'relative',
                      top: 'unset',
                      width: '24px',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
    </>
  );
};
