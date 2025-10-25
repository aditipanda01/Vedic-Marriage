import { Arrows } from '@/components/Arrows';
import arrows from "@/assets/images/img/arrows.png";

export const DetailsHeader = ({ title }: { title: string }) => {
    return (
        <>
            <style>
                {`
                    .account-header {
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        z-index: 9999 !important;
                        width: 100% !important;
                        max-width: 390px !important;
                        background: linear-gradient(359deg, rgba(255, 255, 255, 1) 0%, rgba(255, 246, 242, 1) 100%) !important;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 8px !important;
                        min-height: 64px !important;
                    }
                    
                    .account-header .profile-header {
                        align-items: center;
                        align-self: stretch;
                        display: flex;
                        flex: 0 0 auto;
                        justify-content: center;
                        padding: 0px 12px;
                        position: relative;
                        width: 100%;
                    }
                    
                    .account-header .container {
                        align-items: center;
                        display: flex;
                        height: 56px;
                        margin-left: -12.00px;
                        margin-right: -12.00px;
                        padding: 8px 0px;
                        position: relative;
                        width: 390px;
                    }
                    
                    .account-header .back {
                        align-items: center;
                        display: flex;
                        gap: 8px;
                        justify-content: center;
                        margin-bottom: -4.00px;
                        margin-top: -4.00px;
                        padding: 12px;
                        position: relative;
                        width: 56px;
                    }
                    
                    .account-header .profile-info {
                        align-items: flex-start;
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                        flex-grow: 1;
                        gap: 4px;
                        position: relative;
                    }
                    
                    .account-header .user-info {
                        align-items: center;
                        align-self: stretch;
                        display: flex;
                        flex: 0 0 auto;
                        gap: 8px;
                        position: relative;
                        width: 100%;
                    }
                    
                    .account-header .user-name {
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        color: #000000;
                        display: -webkit-box;
                        font-family: "Plus Jakarta Sans", Helvetica;
                        font-size: 14px;
                        font-weight: 700;
                        letter-spacing: 0;
                        line-height: 16px;
                        margin-top: -1.00px;
                        overflow: hidden;
                        position: relative;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: fit-content;
                    }
                `}
            </style>
            <div className="account-header">
                <div className="profile-header">
                    <div className="container">
                        <div className="back">
                            <Arrows
                                className="arrows-instance"
                                direction="back"
                                directionBack={arrows}
                            />
                        </div>

                        <div className="profile-info">
                            <div className="user-info">
                                <div className="user-name">{title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}