import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileHeader } from '@/common/components/ui/ProfileHeader';
import { ProfileFooter } from '@/common/components/ui/ProfileFooter';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ROUTES } from '@/common/constants/routes';
import { useAuth } from '@/hooks/useAuth';
interface DashboardStats {
  totalMatches: number;
  newMessages: number;
  profileViews: number;
  pendingRequests: number;
  interestAccepted: number;
  interestReceived: number;
  viewedProfile: number;
  shortlisted: number;
  profileImage:string;
}

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth)
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalMatches: 12,
    newMessages: 3,
    profileViews: 45,
    pendingRequests: 2,
    interestAccepted: 29,
    interestReceived: 5,
    viewedProfile: 204,
    shortlisted: 5,
    profileImage:""
  });

  useEffect(() => {
    if (user) {
      
      
      setStats({
        ...stats,
        profileImage: user.profilePicture
      })
    }
  }, [user])

  return (

    <>
      <ProfileHeader 
      menuenable={true}
      downloadenable={true}
      editenable={true} 
      profileenable={true}
      />
    
    <div className="profile-page bg-white relative w-[390px] mx-auto" style={{
      minHeight: '100vh',
      paddingBottom: '120px' // Extra space for mobile navigation
    }}>
      {/* Header - Exact copy from original */}
    

      {/* Profile Picture */}
      <div 
        className="profile-picture mt-6 mx-6 w-[342px] h-[296px] bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url(${stats.profileImage})`,
          aspectRatio: '1.16'
        }}
      >
        {/* Profile picture indicators */}
        <div className="absolute top-1 left-2 w-[51px] h-1 bg-white rounded-sm opacity-60"></div>
        <div className="absolute top-1 left-9 w-1.5 h-1.5 bg-white rounded-sm opacity-60"></div>
        <div className="absolute top-1 left-11 w-1.5 h-1.5 bg-white rounded-sm opacity-60"></div>
        <div className="absolute top-1 left-23 w-1.5 h-1.5 bg-white rounded-sm opacity-60"></div>
        <div className="absolute top-1 left-34 w-1.5 h-1.5 bg-white rounded-sm opacity-60"></div>
        <div className="absolute top-1 left-46 w-1.5 h-1.5 bg-white rounded-sm opacity-60"></div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[68px] h-3.5 bg-black bg-opacity-30 rounded-sm"></div>
      </div>

      {/* Profile Statistics - Fixed positioning */}
      <div className="profile-statistics mx-6 mt-6 w-[346px] h-[112px] relative">
        {/* Title */}
        <div className="title absolute top-0 left-0 w-full">
          <div className="rows-instance text-gray-500 font-bold text-sm font-plus-jakarta" style={{color: 'var(--variable-collection-light-grey)'}}>Profile Statistics</div>
        </div>
        
        {/* Statistics Values */}
        <div className="statistics-values absolute top-10 left-0 w-full h-[72px]">
          {/* Interest Accepted */}
          <div className="accepted absolute top-0 left-0 w-20 h-[72px]">
            <div className="design-component-instance-node text-center absolute top-1 left-3 w-14 font-montserrat font-bold text-base" style={{color: 'var(--blue)', fontSize: '16px', fontWeight: 700, left: '13px', top: '4px', width: '54px'}}>29</div>
            <div className="list-rows-instance text-center absolute bottom-2 left-3 w-14 font-montserrat font-medium text-xs" style={{color: 'var(--black)', fontSize: '12px', fontWeight: 500, left: '11px', top: '32px', height: '32px'}}>
              Interest<br />Accepted
            </div>
          </div>

          {/* Interest Received */}
          <div className="received absolute top-0 left-[87px] w-20 h-[72px]">
            <div className="received-3 text-center absolute top-1 left-3 w-14 font-montserrat font-bold text-base" style={{color: 'var(--pink)', fontSize: '16px', fontWeight: 700, left: '13px', top: '4px', width: '54px'}}>5</div>
            <div className="received-2 text-center absolute bottom-2 left-3 w-14 font-montserrat font-medium text-xs" style={{color: 'var(--black)', fontSize: '12px', fontWeight: 500, left: '12px', top: '32px', height: '32px'}}>
              Interest<br />Received
            </div>
          </div>

          {/* Viewed Your Profile */}
          <div className="viewed absolute top-0 left-[177px] w-20 h-[72px]">
            <div className="viewed-2 text-center absolute top-1 left-3 w-14 font-montserrat font-bold text-base" style={{color: '#00aa25', fontSize: '16px', fontWeight: 700, left: '13px', top: '4px', width: '54px'}}>204</div>
            <div className="list-rows-2 text-center absolute bottom-2 left-1 w-18 font-montserrat font-medium text-xs" style={{color: 'var(--black)', fontSize: '12px', fontWeight: 500, left: '5px', top: '32px', height: '32px'}}>
              Viewed<br />Your Profile
            </div>
          </div>

          {/* Shortlisted You */}
          <div className="shortlisted absolute top-0 left-[266px] w-20 h-[72px]">
            <div className="shortlisted-2 text-center absolute top-1 left-3 w-14 font-montserrat font-bold text-base" style={{color: '#9747ff', fontSize: '16px', fontWeight: 700, left: '13px', top: '4px', width: '54px'}}>5</div>
            <div className="text-center absolute bottom-2 left-3 w-14 font-montserrat font-medium text-xs" style={{color: 'var(--black)', fontSize: '12px', fontWeight: 500, left: '11px', top: '32px', height: '32px'}}>
              Shortlisted<br />You
            </div>
          </div>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="profile-actions mx-6 mt-6 w-[342px] flex items-center gap-4">
        <button 
        onClick={() => navigate('/my-profile')}
        className="block-instance rounded-full flex-1 h-8 flex items-center justify-center text-sm font-medium" style={{backgroundColor: 'rgba(237, 97, 41, 1)', color: '#ffffff'}}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Profile
        </button>
        <button 
          onClick={() => window.open(ROUTES.DOWNLOAD_PROFILE, '_blank')}
          className="download rounded-full flex-1 h-8 flex items-center justify-center text-sm font-medium" 
          style={{backgroundColor: 'rgba(244, 247, 254, 1)', color: '#222222'}}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Profile
        </button>
      </div>

      {/* Profile Options */}
      <div className="profile-options mx-6 mt-6 w-[342px] flex flex-col space-y-2">
        {/* Profile Details */}
        <Link to="/profile-details" className="div flex items-center gap-2 py-2 px-2 w-full">
        
        <div className="div flex items-center gap-2 py-2 px-2 w-full">
          <div className="frame flex flex-col flex-1">
            <div className="label text-black text-sm font-bold font-montserrat">Profile Details</div>
            <div className="body text-gray-500 text-xs font-montserrat">Manage your personal information and customize your profile.</div>
          </div>
          <div className="action p-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        </Link>

        {/* Account & Privacy */}
        <Link to="/account-setting" className="div flex items-center gap-2 py-2 px-2 w-full">
        <div className="div flex items-center gap-2 py-2 px-2 w-full">
          <div className="frame flex flex-col flex-1">
            <div className="label text-black text-sm font-bold font-montserrat">Account & Privacy</div>
            <div className="body text-gray-500 text-xs font-montserrat">Manage settings and visibility.</div>
          </div>
          <div className="action p-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        </Link>

        {/* Payments & Subscription */}
        <Link to="/subscription" className="div flex items-center gap-2 py-2 px-2 w-full">
        <div className="div flex items-center gap-2 py-2 px-2 w-full">
          <div className="frame flex flex-col flex-1">
            <div className="label text-black text-sm font-bold font-montserrat">Payments & Subscription</div>
            <div className="body-pt text-xs font-montserrat">
              <span className="text-gray-500">You're on </span>
              <span className="text-orange-500 font-bold" style={{color: 'rgba(231, 95, 40, 1)'}}>Vedic Matchmaker</span>
              <span className="text-gray-500"> Plan</span>
            </div>
          </div>
          <div className="action p-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        </Link>

        {/* Support */}
        <Link to="/support" className="div flex items-center gap-2 py-2 px-2 w-full">
          <div className="frame flex flex-col flex-1">
            <div className="label text-black text-sm font-bold font-montserrat">Support</div>
            <div className="body text-gray-500 text-xs font-montserrat">Get help and contact Support</div>
          </div>
          <div className="action p-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Sign Out */}
        <div 
          className={`div flex items-center gap-2 py-2 px-2 w-full rounded-lg transition-colors ${
            isLoggingOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'
          }`}
          onClick={async () => {
            if (isLoggingOut) return;
            
            setIsLoggingOut(true);
            try {
              await logout();
              navigate('/login');
            } catch (error) {
              console.error('Logout failed:', error);
              setIsLoggingOut(false);
            }
          }}
        >
          <div className="frame flex flex-col flex-1">
            <div className="label text-black text-sm font-bold font-montserrat">
              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
            </div>
          </div>
          <div className="action p-3">
            {isLoggingOut ? (
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
    <ProfileFooter />
    </>
  );
} 