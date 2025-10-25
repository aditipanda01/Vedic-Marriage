import { useEffect, useState } from "react";
import { PlanDetails } from "./sections/PlanDetails";
import { UpgradePlan } from "./sections/UpgradePlan";
import "./style.css";

import { ProfileHeader } from "@/common/components/ui/ProfileHeader";
import { ProfileFooter } from "@/common/components/ui/ProfileFooter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/services/axios";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  durationInDays: number;
  facilities: {
    contactsView: number;
    connections: number;
    messages: number;
    systemRecommendation: boolean;
    searchAndFilter: boolean;
    advancedSort: boolean;
    advanceAnalytics: boolean;
    customMatching: boolean;
    personalizedRecommendation: number;
  };
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserSubscription {
  _id: string;
  userId: string;
  plan: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  features: string[];
  metadata: {
    subscriptionPlanId: string;
    paymentId?: string;
  };
}

export const SubscriptionScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all active subscription plans
        const plansResponse = await api.get(API_ENDPOINTS.PAYMENT.SUBSCRIPTION_PLANS.ACTIVE);
        
        if (plansResponse.status === 200) {
          const plans = plansResponse.data.data || plansResponse.data;
          setSubscriptionPlans(plans);
          
          // Fetch user's current subscription if user exists
          if (user?.id || user?._id) {
            try {
              const userId = user.id || user._id;
              const subscriptionResponse = await api.get(API_ENDPOINTS.PAYMENT.USER_SUBSCRIPTION(userId));
              
              if (subscriptionResponse.status === 200) {
                const subscription = subscriptionResponse.data.data;
                setUserSubscription(subscription);
                
                // Find the matching plan using subscriptionPlanId from metadata
                if (subscription?.metadata?.subscriptionPlanId) {
                  const userPlan = plans.find((plan: SubscriptionPlan) => 
                    plan.id === subscription.metadata.subscriptionPlanId
                  );
                  setCurrentPlan(userPlan || null);
                  console.log("Matched plan:", userPlan);
                }
              }
            } catch (subError) {
              console.log("No active subscription found for user");
              setUserSubscription(null);
              setCurrentPlan(null);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [user?.id, user?._id]);

  if (isLoading) {
    return (
      <>
        <div className="account-settings" data-model-id="412:28043">
          <ProfileHeader 
            arrowenable={true}
            arrowHandler={() => navigate(-1)}
            HeaderHeading="Payments & Subscription"
          />
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <ProfileFooter />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="account-settings" data-model-id="412:28043">
        <ProfileHeader 
          arrowenable={true}
          arrowHandler={() => navigate(-1)}
          HeaderHeading="Payments & Subscription"
        />
        <PlanDetails 
          currentPlan={currentPlan}
          userSubscription={userSubscription}
        />
        <UpgradePlan 
          plans={subscriptionPlans}
          currentSubscriptionId={userSubscription?.metadata?.subscriptionPlanId}
          isSubscriptionActive={userSubscription?.status === "ACTIVE"}
        />
        <ProfileFooter />
      </div>
    </>
  );
};
