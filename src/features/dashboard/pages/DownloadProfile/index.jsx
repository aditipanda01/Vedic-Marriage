import React, { useEffect, useRef, useState } from "react";
import "./MatrimonialProfile.css";
import { API_BASE_URL,PHOTO_URL } from "@/common/constants/apiEndpoints";
import { useAuth } from "@/hooks/useAuth";

const DownloadProfile = () => {
    const profileContainerRef = useRef(null);
    const { user: userInfo, isAuthenticated, isLoading } = useAuth();
    const [theme, setTheme] = useState('');
    
    const handleChangeTheme = (theme) => {
        const pdfDownloadDiv = document.querySelector('.kk');
        if (pdfDownloadDiv) {
            pdfDownloadDiv.className = `kk ${theme}`;
        }
    };

    const setLayout = (layout) => {
        if (profileContainerRef.current) {
            profileContainerRef.current.className = `profile-container ${layout}`;
            localStorage.setItem("selectedLayout", layout);
        }
    };

    useEffect(() => {
        const savedTheme = "theme-default";
        const savedLayout = "layout-two-column";

        handleChangeTheme(savedTheme);
        setLayout(savedLayout);
    }, []);

    const handleDownload = async () => {
        window.print()
    };

    const getProfileImage = () => {
        if (userInfo?.profilePicture) {
            return userInfo.profilePicture;
        }
        if (userInfo?.verification?.verifiedGalleryPhoto?.length > 0) {
            return `${API_BASE_URL}uploads/gallery/${userInfo.verification.verifiedGalleryPhoto[0].photoId}`;
        }
        return `${PHOTO_URL}team.png`;
    };

    // Show loading while fetching user data
    if (isLoading || !userInfo) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="text-lg font-semibold">Loading Profile...</div>
                    <div className="text-sm text-gray-500 mt-2">Please wait</div>
                </div>
            </div>
        );
    }
    
    return (
        <div className={`pdf-download-css`}>
            <head>
                <meta charSet="UTF-8" />
                <title>Matrimonial Profile - {userInfo?.fullName || userInfo?.fname + ' ' + userInfo?.lname}</title>

                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Playfair+Display:wght@700&family=Lato:wght@700&family=Montserrat:wght@700&family=Open+Sans:wght@700&display=swap"
                    rel="stylesheet"
                />

                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </head>
            <body>
                <div className={`kk ${theme}`}>
                <img
                    src={PHOTO_URL+"watermark.png"}
                    className="watermark-screen"
                    alt="Watermark"
                />

                <img
                    src={PHOTO_URL+"watermark.png"}
                    className="watermark-print"
                    alt="Watermark"
                />

                <div className="selectors">
                    <div className="selector-group">
                        <h3>Select Template</h3>
                        <button className="theme-button" onClick={()=>handleChangeTheme('theme-default')} style={{ backgroundImage: `url(${PHOTO_URL}theme-default.jpg)` }} title="Default"> <span className="theme-name">Default</span></button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-modern')} style={{backgroundImage: `url(${PHOTO_URL}theme-modern.jpg)`}} title="Modern">Modern</button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-dark')} style={{ backgroundImage: `url(${PHOTO_URL}theme-dark.jpg)` }} title="Dark">Dark</button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-colorful')} style={{ backgroundImage: `url(${PHOTO_URL}theme-colorful.jpg)` }} title="Colorful">Colorful</button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-minimalist')} style={{ backgroundImage: `url(${PHOTO_URL}theme-minimalist.jpg)` }} title="Minimalist"><span className="theme-name">Minimalist</span></button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-elegant')} style={{ backgroundImage: `url(${PHOTO_URL}theme-elegant.jpg)` }} title="Elegant"><span className="theme-name">Elegant</span></button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-vibrant')} style={{ backgroundImage: `url(${PHOTO_URL}theme-vibrant.jpg)` }} title="Vibrant">Vibrant</button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-boxed')} style={{ backgroundImage: `url(${PHOTO_URL}theme-boxed.jpg)` }} title="Boxed"><span className="theme-name">Boxed</span></button>
           
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-rustic')} style={{ backgroundImage: `url(${PHOTO_URL}theme-rustic.jpg)` }} title="Rustic">Rustic</button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-futuristic')} style={{ backgroundImage: `url(${PHOTO_URL}theme-futuristic.jpg)` }} title="Futuristic">Futuristic</button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-nature')} style={{ backgroundImage: `url(${PHOTO_URL}theme-nature.jpg)` }} title="Nature">Nature</button>
            <button className="theme-button" onClick={()=>handleChangeTheme('theme-artistic')} style={{ backgroundImage: `url(${PHOTO_URL}theme-artistic.jpg)` }} title="Artistic">Artistic</button>
                    </div>

                    <div className="selector-group">
                        <h3>Select Layout</h3>
                        <button
                            className="layout-button"
                            onClick={()=>setLayout('layout-two-column')}
                        >
                            <i className="fas fa-columns"></i> Two-Column
                        </button>
                        <button
                            className="layout-button"
                            onClick={()=>setLayout('layout-single-column')}
                        >
                            <i className="fas fa-list"></i> Single-Column
                        </button>
                        <button
                            className="layout-button"
                            onClick={()=>setLayout('layout-grid')}
                        >
                            <i className="fas fa-th"></i> Grid
                        </button>
                    </div>
                </div>

                <button className="print-button" onClick={handleDownload}>
                    <i className="bi bi-download"></i> Download
                </button>
                
                <div ref={profileContainerRef} className="profile-container layout-two-column">
                    {/* Left Column */}
                    <div className="profile-left">
                        {/* Profile Header Section */}
                        <div className="section fixed-size-section-x">
                            <div className="profile-header">
                                <img 
                                    src={getProfileImage()} 
                                    alt="Profile Picture" 
                                    className="profile-pic"
                                />
                                <div>
                                    <h2>
                                        {userInfo?.fullName || `${userInfo?.fname} ${userInfo?.lname}`}
                                        <img src={`${PHOTO_URL}verified.png`} alt="Verified" className="verified-icon" />
                                    </h2>
                                    <div className="contact-info">
                                        <div>
                                            <i className="fas fa-phone"></i>{" "}
                                            {userInfo?.phoneNumber}
                                        </div>
                                        <div>
                                            <i className="fas fa-envelope"></i>{" "}
                                            {userInfo?.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Info */}
                        {userInfo?.basic_info && (
                            <div className="section">
                                <div className="section-title">Basic Info</div>
                                <div className="section-content">
                                    <div className="info-item">
                                        <span className="label">Name:</span>
                                        <span className="value">
                                            {userInfo?.fullName || `${userInfo?.fname} ${userInfo?.lname}`}
                                        </span>
                                    </div>
                                    {userInfo.basic_info.gender && (
                                        <div className="info-item">
                                            <span className="label">Gender:</span>
                                            <span className="value">{userInfo.basic_info.gender}</span>
                                        </div>
                                    )}
                                    {userInfo.basic_info.marital_status && (
                                        <div className="info-item">
                                            <span className="label">Marital Status:</span>
                                            <span className="value">{userInfo.basic_info.marital_status}</span>
                                        </div>
                                    )}
                                    {userInfo.basic_info.mother_tongue && (
                                        <div className="info-item">
                                            <span className="label">Mother Tongue:</span>
                                            <span className="value">{userInfo.basic_info.mother_tongue}</span>
                                        </div>
                                    )}
                                    {userInfo.basic_info.languages_known?.length > 0 && (
                                        <div className="info-item">
                                            <span className="label">Languages Known:</span>
                                            <span className="value">{userInfo.basic_info.languages_known.join(", ")}</span>
                                        </div>
                                    )}
                                    {userInfo.basic_info.height && (
                                        <div className="info-item">
                                            <span className="label">Height:</span>
                                            <span className="value">{userInfo.basic_info.height}</span>
                                        </div>
                                    )}
                                    {userInfo.basic_info.weight && (
                                        <div className="info-item">
                                            <span className="label">Weight:</span>
                                            <span className="value">{userInfo.basic_info.weight} kg</span>
                                        </div>
                                    )}
                                    {userInfo.basic_info.health_disease_disability && (
                                        <div className="info-item">
                                            <span className="label">Health Status:</span>
                                            <span className="value">{userInfo.basic_info.health_disease_disability}</span>
                                        </div>
                                    )}
                                    {userInfo.basic_info.religion && (
                                        <div className="info-item">
                                            <span className="label">Religion:</span>
                                            <span className="value">{userInfo.basic_info.religion}</span>
                                        </div>
                                    )}
                                    {userInfo.basic_info.ethnicity && (
                                        <div className="info-item">
                                            <span className="label">Ethnicity:</span>
                                            <span className="value">{userInfo.basic_info.ethnicity}</span>
                                        </div>
                                    )}
                                    {userInfo.location?.city && (
                                        <div className="info-item">
                                            <span className="label">City:</span>
                                            <span className="value">{userInfo.location.city}</span>
                                        </div>
                                    )}
                                    {userInfo.location?.state && (
                                        <div className="info-item">
                                            <span className="label">State:</span>
                                            <span className="value">{userInfo.location.state}</span>
                                        </div>
                                    )}
                                    {userInfo.location?.country && (
                                        <div className="info-item">
                                            <span className="label">Country:</span>
                                            <span className="value">{userInfo.location.country}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Career & Education */}
                        {userInfo?.career_education && (
                            <div className="section">
                                <div className="section-title">Career & Education</div>
                                <div className="section-content">
                                    {userInfo.career_education.company_name && (
                                        <div className="info-item">
                                            <span className="label">Company Name:</span>
                                            <span className="value">{userInfo.career_education.company_name}</span>
                                        </div>
                                    )}
                                    {userInfo.career_education.company_type && (
                                        <div className="info-item">
                                            <span className="label">Company Type:</span>
                                            <span className="value">{userInfo.career_education.company_type}</span>
                                        </div>
                                    )}
                                    {userInfo.career_education.occupation && (
                                        <div className="info-item">
                                            <span className="label">Occupation:</span>
                                            <span className="value">{userInfo.career_education.occupation}</span>
                                        </div>
                                    )}
                                    {userInfo.career_education.income && (
                                        <div className="info-item">
                                            <span className="label">Annual Income:</span>
                                            <span className="value">{userInfo.career_education.income}</span>
                                        </div>
                                    )}
                                    {userInfo.career_education.job_location && (
                                        <div className="info-item">
                                            <span className="label">Job Location:</span>
                                            <span className="value">{userInfo.career_education.job_location}</span>
                                        </div>
                                    )}
                                    {userInfo.career_education.working_period && (
                                        <div className="info-item">
                                            <span className="label">Working Period:</span>
                                            <span className="value">{userInfo.career_education.working_period} years</span>
                                        </div>
                                    )}
                                    {userInfo.career_education.ed_qualification && (
                                        <div className="info-item">
                                            <span className="label">Highest Qualification:</span>
                                            <span className="value">{userInfo.career_education.ed_qualification}</span>
                                        </div>
                                    )}
                                    {userInfo.career_education.ed_institution && (
                                        <div className="info-item">
                                            <span className="label">Institution:</span>
                                            <span className="value">{userInfo.career_education.ed_institution}</span>
                                        </div>
                                    )}
                                    {userInfo.career_education.ed_other_qualification && (
                                        <div className="info-item">
                                            <span className="label">Other Qualification:</span>
                                            <span className="value">{userInfo.career_education.ed_other_qualification}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Astro */}
                        {userInfo?.astro && (
                            <div className="section">
                                <div className="section-title">Astrology</div>
                                <div className="section-content">
                                    {userInfo.astro.date_of_birth && (
                                        <div className="info-item">
                                            <span className="label">Date of Birth:</span>
                                            <span className="value">{userInfo.astro.date_of_birth}</span>
                                        </div>
                                    )}
                                    {userInfo.astro.time_of_birth && (
                                        <div className="info-item">
                                            <span className="label">Time of Birth:</span>
                                            <span className="value">{userInfo.astro.time_of_birth}</span>
                                        </div>
                                    )}
                                    {userInfo.astro.birth_place && (
                                        <div className="info-item">
                                            <span className="label">Place of Birth:</span>
                                            <span className="value">{userInfo.astro.birth_place}</span>
                                        </div>
                                    )}
                                    {userInfo.astro.rashi && (
                                        <div className="info-item">
                                            <span className="label">Rashi:</span>
                                            <span className="value">{userInfo.astro.rashi}</span>
                                        </div>
                                    )}
                                    {userInfo.astro.nakshatra && (
                                        <div className="info-item">
                                            <span className="label">Nakshatra:</span>
                                            <span className="value">{userInfo.astro.nakshatra}</span>
                                        </div>
                                    )}
                                    {userInfo.astro.manglik && (
                                        <div className="info-item">
                                            <span className="label">Manglik:</span>
                                            <span className="value">{userInfo.astro.manglik}</span>
                                        </div>
                                    )}
                                    {userInfo.astro.community && (
                                        <div className="info-item">
                                            <span className="label">Community:</span>
                                            <span className="value">{userInfo.astro.community}</span>
                                        </div>
                                    )}
                                    {userInfo.astro.caste && (
                                        <div className="info-item">
                                            <span className="label">Caste:</span>
                                            <span className="value">{userInfo.astro.caste}</span>
                                        </div>
                                    )}
                                    {userInfo.astro.gotra && (
                                        <div className="info-item">
                                            <span className="label">Gotra:</span>
                                            <span className="value">{userInfo.astro.gotra}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="profile-right">
                        {/* About Me Section */}
                        {userInfo?.lifestyle_personality?.about_me && (
                            <div className="section fixed-size-section-x">
                                <h2>About Me</h2>
                                <p>
                                    {userInfo.lifestyle_personality.about_me.length > 486 
                                        ? userInfo.lifestyle_personality.about_me.slice(0, 486) + "..." 
                                        : userInfo.lifestyle_personality.about_me
                                    }
                                </p>
                            </div>
                        )}

                        {/* Family */}
                        {userInfo?.family && (
                            <div className="section">
                                <div className="section-title">Family</div>
                                <div className="section-content">
                                    {userInfo.family.father_name && (
                                        <div className="info-item">
                                            <span className="label">Father's Name:</span>
                                            <span className="value">{userInfo.family.father_name}</span>
                                        </div>
                                    )}
                                    {userInfo.family.father_occupation && (
                                        <div className="info-item">
                                            <span className="label">Father's Occupation:</span>
                                            <span className="value">{userInfo.family.father_occupation}</span>
                                        </div>
                                    )}
                                    {userInfo.family.mother_name && (
                                        <div className="info-item">
                                            <span className="label">Mother's Name:</span>
                                            <span className="value">{userInfo.family.mother_name}</span>
                                        </div>
                                    )}
                                    {userInfo.family.mother_occupation && (
                                        <div className="info-item">
                                            <span className="label">Mother's Occupation:</span>
                                            <span className="value">{userInfo.family.mother_occupation}</span>
                                        </div>
                                    )}
                                    {userInfo.family.family_culture && (
                                        <div className="info-item">
                                            <span className="label">Family Culture:</span>
                                            <span className="value">{userInfo.family.family_culture}</span>
                                        </div>
                                    )}
                                    {userInfo.family.family_status && (
                                        <div className="info-item">
                                            <span className="label">Family Status:</span>
                                            <span className="value">{userInfo.family.family_status}</span>
                                        </div>
                                    )}
                                    {userInfo.family.family_location && (
                                        <div className="info-item">
                                            <span className="label">Family Location:</span>
                                            <span className="value">{userInfo.family.family_location}</span>
                                        </div>
                                    )}
                                    {userInfo.family.brother_count > 0 && (
                                        <div className="info-item">
                                            <span className="label">Brothers:</span>
                                            <span className="value">{userInfo.family.brother_count}</span>
                                        </div>
                                    )}
                                    {userInfo.family.sister_count > 0 && (
                                        <div className="info-item">
                                            <span className="label">Sisters:</span>
                                            <span className="value">{userInfo.family.sister_count}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {/* Personality & Lifestyle */}
                        {userInfo?.lifestyle_personality && (
                            <div className="section">
                                <div className="section-title">Personality & Lifestyle</div>
                                <div className="section-content">
                                    {userInfo.lifestyle_personality.diet && (
                                        <div className="info-item">
                                            <span className="label">Diet:</span>
                                            <span className="value">{userInfo.lifestyle_personality.diet}</span>
                                        </div>
                                    )}
                                    {userInfo.lifestyle_personality.social_gathering_comfort && (
                                        <div className="info-item">
                                            <span className="label">Social Gathering Comfort:</span>
                                            <span className="value">{userInfo.lifestyle_personality.social_gathering_comfort}</span>
                                        </div>
                                    )}
                                    {userInfo.lifestyle_personality.characterize_your_personality && (
                                        <>
                                            {userInfo.lifestyle_personality.characterize_your_personality.attention_focus && (
                                                <div className="info-item">
                                                    <span className="label">Attention Focus:</span>
                                                    <span className="value">{userInfo.lifestyle_personality.characterize_your_personality.attention_focus}</span>
                                                </div>
                                            )}
                                            {userInfo.lifestyle_personality.characterize_your_personality.decision_making && (
                                                <div className="info-item">
                                                    <span className="label">Decision Making:</span>
                                                    <span className="value">{userInfo.lifestyle_personality.characterize_your_personality.decision_making}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {userInfo.lifestyle_personality.core_values_or_motivates_inspires?.length > 0 && (
                                        <div className="info-item">
                                            <span className="label">Core Values:</span>
                                            <span className="value">{userInfo.lifestyle_personality.core_values_or_motivates_inspires.join(", ")}</span>
                                        </div>
                                    )}
                                    {userInfo.lifestyle_personality.strengths?.length > 0 && (
                                        <div className="info-item">
                                            <span className="label">Strengths:</span>
                                            <span className="value">{userInfo.lifestyle_personality.strengths.join(", ")}</span>
                                        </div>
                                    )}
                                    {userInfo.lifestyle_personality.free_time_activities?.length > 0 && (
                                        <div className="info-item">
                                            <span className="label">Hobbies:</span>
                                            <span className="value">{userInfo.lifestyle_personality.free_time_activities.slice(0, 5).join(", ")}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Preferences */}
                        {userInfo?.preferences && (
                            <div className="section">
                                <div className="section-title">Preferences</div>
                                <div className="preferences">
                                    <div className="preference-category">
                                        <h3>Basic Preference</h3>
                                        <div className="section-content">
                                            {userInfo.preferences.preferred_marital_status?.length > 0 && (
                                                <div className="info-item">
                                                    <span className="label">Marital Status:</span>
                                                    <span className="value">{userInfo.preferences.preferred_marital_status.join(", ")}</span>
                                                </div>
                                            )}
                                            {(userInfo.preferences.preferred_age_start || userInfo.preferences.preferred_age_end) && (
                                                <div className="info-item">
                                                    <span className="label">Preferred Age:</span>
                                                    <span className="value">
                                                        {userInfo.preferences.preferred_age_start} - {userInfo.preferences.preferred_age_end} years
                                                    </span>
                                                </div>
                                            )}
                                            {userInfo.preferences.preferred_height_start && (
                                                <div className="info-item">
                                                    <span className="label">Preferred Height:</span>
                                                    <span className="value">
                                                        {userInfo.preferences.preferred_height_start} {userInfo.preferences.preferred_height_end ? `- ${userInfo.preferences.preferred_height_end}` : ''}
                                                    </span>
                                                </div>
                                            )}
                                            {userInfo.preferences.preferred_language?.length > 0 && (
                                                <div className="info-item">
                                                    <span className="label">Preferred Language:</span>
                                                    <span className="value">{userInfo.preferences.preferred_language.join(", ")}</span>
                                                </div>
                                            )}
                                            {userInfo.preferences.preferred_qualification && (
                                                <div className="info-item">
                                                    <span className="label">Preferred Qualification:</span>
                                                    <span className="value">{userInfo.preferences.preferred_qualification}</span>
                                                </div>
                                            )}
                                            {userInfo.preferences.preferred_occupation && (
                                                <div className="info-item">
                                                    <span className="label">Preferred Occupation:</span>
                                                    <span className="value">{userInfo.preferences.preferred_occupation}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="preference-category">
                                        <h3>Community Preferences</h3>
                                        <div className="section-content">
                                            {userInfo.preferences.preferred_religion && (
                                                <div className="info-item">
                                                    <span className="label">Religion:</span>
                                                    <span className="value">{userInfo.preferences.preferred_religion}</span>
                                                </div>
                                            )}
                                            {userInfo.preferences.preferred_caste && (
                                                <div className="info-item">
                                                    <span className="label">Caste:</span>
                                                    <span className="value">{userInfo.preferences.preferred_caste}</span>
                                                </div>
                                            )}
                                            {userInfo.preferences.preferred_community && (
                                                <div className="info-item">
                                                    <span className="label">Community:</span>
                                                    <span className="value">{userInfo.preferences.preferred_community}</span>
                                                </div>
                                            )}
                                            {userInfo.preferences.preferred_cultural_values && (
                                                <div className="info-item">
                                                    <span className="label">Cultural Values:</span>
                                                    <span className="value">{userInfo.preferences.preferred_cultural_values}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Spiritual Info */}
                        {userInfo?.spiritual_info && (
                            <div className="section">
                                <div className="section-title">Spiritual Information</div>
                                <div className="section-content">
                                    {userInfo.spiritual_info.affiliated_with_spiritual_organization && (
                                        <div className="info-item">
                                            <span className="label">Spiritual Organization:</span>
                                            <span className="value">{userInfo.spiritual_info.affiliated_with_spiritual_organization}</span>
                                        </div>
                                    )}
                                    {userInfo.spiritual_info.other_organization_details?.other_organization_name && (
                                        <div className="info-item">
                                            <span className="label">Organization Name:</span>
                                            <span className="value">{userInfo.spiritual_info.other_organization_details.other_organization_name}</span>
                                        </div>
                                    )}
                                    {userInfo.spiritual_info.other_organization_details?.affiliated_duration && (
                                        <div className="info-item">
                                            <span className="label">Affiliated Duration:</span>
                                            <span className="value">{userInfo.spiritual_info.other_organization_details.affiliated_duration} years</span>
                                        </div>
                                    )}
                                    {userInfo.spiritual_info.other_organization_details?.sadhana_time && (
                                        <div className="info-item">
                                            <span className="label">Sadhana Time:</span>
                                            <span className="value">{userInfo.spiritual_info.other_organization_details.sadhana_time} hours</span>
                                        </div>
                                    )}
                                    {userInfo.spiritual_info.iskcon_affiliation_details?.chanting_rounds && (
                                        <div className="info-item">
                                            <span className="label">Chanting Rounds:</span>
                                            <span className="value">{userInfo.spiritual_info.iskcon_affiliation_details.chanting_rounds}</span>
                                        </div>
                                    )}
                                    {userInfo.spiritual_info.iskcon_affiliation_details?.temple_visit && (
                                        <div className="info-item">
                                            <span className="label">Temple Visit Frequency:</span>
                                            <span className="value">{userInfo.spiritual_info.iskcon_affiliation_details.temple_visit}</span>
                                        </div>
                                    )}
                                    {userInfo.spiritual_info.iskcon_affiliation_details?.initiated && (
                                        <div className="info-item">
                                            <span className="label">Initiated:</span>
                                            <span className="value">{userInfo.spiritual_info.iskcon_affiliation_details.initiated}</span>
                                        </div>
                                    )}
                                    {userInfo.spiritual_info.iskcon_affiliation_details?.initiation_details?.initiation_name && (
                                        <div className="info-item">
                                            <span className="label">Initiation Name:</span>
                                            <span className="value">{userInfo.spiritual_info.iskcon_affiliation_details.initiation_details.initiation_name}</span>
                                        </div>
                                    )}
                                    {userInfo.spiritual_info.iskcon_affiliation_details?.initiation_details?.spiritual_master && (
                                        <div className="info-item">
                                            <span className="label">Spiritual Master:</span>
                                            <span className="value">{userInfo.spiritual_info.iskcon_affiliation_details.initiation_details.spiritual_master}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Footer */}
                    <div className="footer">
                        &copy; 2024 https://vedicmarriage.ai. All rights reserved.
                    </div>
                </div>
                </div>
            </body>
        </div>
    );
};

export default DownloadProfile;

