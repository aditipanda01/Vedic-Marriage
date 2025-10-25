import React, { useState } from 'react';
import { Sidebar } from '../../features/sidebar/Sidebar';
import menu from "@/assets/images/img/menu-1.png";
import download from "@/assets/images/img/downloadsimple-2.png";
import edit from "@/assets/images/img/edit-3.png";
import statusIcon from "@/assets/images/img/status-icon.png";


export const DashboardHeader = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleMenuClick = () => {
        setIsSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        console.log('Closing sidebar');
        setIsSidebarOpen(false);
    };

    return (
        <>
            <header className="header fixed top-0 left-0 w-[390px]" style={{
                background: 'linear-gradient(359deg, rgba(255, 255, 255, 1) 0%, rgba(255, 246, 242, 1) 100%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                zIndex: 100,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '390px',
                height: 'auto',
                pointerEvents: 'auto'
              }}>
                <div className="profile-header flex items-center justify-center px-3" style={{
                  alignSelf: 'stretch',
                  flex: '0 0 auto',
                  gap: '4px',
                  padding: '0px 12px',
                  position: 'relative',
                  width: '100%'
                }}>
                  <div className="container flex items-center gap-2 h-14 py-2 w-full" style={{
                    gap: '8px',
                    height: '56px',
                    marginLeft: '-12px',
                    marginRight: '-12px',
                    padding: '8px 0px',
                    position: 'relative',
                    width: '390px'
                  }}>
                    <div className="more-menu flex items-center justify-center p-3 w-14" style={{
                      alignSelf: 'stretch',
                      gap: '8px',
                      padding: '12px',
                      position: 'relative',
                      width: '56px',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      zIndex: 101
                    }} onClick={handleMenuClick}>
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
                          pointerEvents: 'auto'
                        }}
                      />
                    </div>
        
                    <div className="profile-info flex flex-col gap-1 flex-1" style={{
                      alignItems: 'flex-start',
                      flexDirection: 'column',
                      flexGrow: 1,
                      gap: '4px',
                      position: 'relative'
                    }}>
                      <div className="title-2 text-gray-500 text-xs font-normal font-montserrat" style={{
                        alignSelf: 'stretch',
                        color: 'rgba(150, 150, 150, 1)',
                        fontFamily: 'var(--label-11pt-font-family)',
                        fontSize: 'var(--label-11pt-font-size)',
                        fontStyle: 'var(--label-11pt-font-style)',
                        fontWeight: 'var(--label-11pt-font-weight)',
                        letterSpacing: 'var(--label-11pt-letter-spacing)',
                        lineHeight: 'var(--label-11pt-line-height)',
                        marginTop: '-1px',
                        position: 'relative'
                      }}>My Profile</div>
                      <div className="user-info flex items-center gap-2" style={{
                        alignSelf: 'stretch',
                        flex: '0 0 auto',
                        gap: '8px',
                        position: 'relative',
                        width: '100%'
                      }}>
                                         <div className="user-name text-black text-sm font-bold font-plus-jakarta truncate" style={{
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
                           width: 'fit-content'
                         }}>Raghav K</div>
                        <div className="status-icon" style={{
                          height: '16px',
                          left: 'unset',
                          position: 'relative',
                          top: 'unset',
                          width: '16px'
                        }}>
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
                              top: 'unset'
                            }}
                          />
                        </div>
                      </div>
                    </div>
        
                    <div className="icon flex items-center justify-center p-3 w-14" style={{
                      alignItems: 'center',
                      gap: '8px',
                      justifyContent: 'center',
                      marginBottom: '-4px',
                      marginTop: '-4px',
                      padding: '12px',
                      position: 'relative',
                      width: '56px'
                    }}>
                      <img 
                        src={download} 
                        alt="Download" 
                        style={{
                          left: 'unset',
                          position: 'relative',
                          top: 'unset',
                          height: '24px',
                          width: '24px'
                        }}
                      />
                    </div>
        
                    <div className="icon flex items-center justify-center p-3 w-14" style={{
                      alignItems: 'center',
                      gap: '8px',
                      justifyContent: 'center',
                      marginBottom: '-4px',
                      marginTop: '-4px',
                      padding: '12px',
                      position: 'relative',
                      width: '56px'
                    }}>
                      <img 
                        src={edit} 
                        alt="Edit" 
                        style={{
                          height: '24px',
                          left: 'unset',
                          position: 'relative',
                          top: 'unset',
                          width: '24px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </header>

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        </>
    )
}