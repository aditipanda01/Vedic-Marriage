import "./style.css";

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

interface PlanDetailsProps {
  currentPlan: SubscriptionPlan | null;
  userSubscription?: UserSubscription | null;
}

export const PlanDetails = ({ currentPlan, userSubscription }: PlanDetailsProps): JSX.Element => {
  // If no subscription, show message
  if (!currentPlan || !userSubscription || userSubscription.status !== "ACTIVE") {
    return (
      <div className="plan-details">
        <div className="plan-header">
          <div className="instance">
            <div className="autolayout-row-5">
              <div className="frame-5">
                <div className="label-5">No Active Subscription</div>
                <div className="test-variant">Choose a plan to get started</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="plan-details">
      <div className="plan-header">
        <div className="instance">
          <div className="autolayout-row-5">
            <div className="frame-5">
              <div className="label-5">You're Subscribed to</div>

              <div className="test-variant">{currentPlan.name}</div>
            </div>
          </div>

          <div className="hover-variant">
            Rs. {currentPlan.price} / {Math.round(currentPlan.durationInDays / 30)} {Math.round(currentPlan.durationInDays / 30) === 1 ? 'Month' : 'Months'}
          </div>
        </div>
      </div>

      <div className="frame-wrapper-2">
        <div className="frame-6">
          <div className="label-6">Usage Stats</div>
        </div>
      </div>

      <div className="div-2">
        <div className="frame-6">
          <div className="label-7">Connections</div>

          <div className="body-4">0 of {currentPlan.facilities.connections} Used</div>
        </div>
      </div>

      <div className="div-2">
        <div className="frame-6">
          <div className="label-7">Contact View</div>

          <div className="body-4">0 of {currentPlan.facilities.contactsView} used</div>
        </div>
      </div>

      <div className="div-2">
        <div className="frame-6">
          <div className="label-7">Messages</div>

          <div className="body-4">0 of {currentPlan.facilities.messages} used</div>
        </div>
      </div>

      <div className="div-2">
        <div className="frame-6">
          <div className="label-7">Recommendations</div>

          <div className="body-4">0 of {currentPlan.facilities.personalizedRecommendation} used</div>
        </div>
      </div>

      <div className="frame-wrapper-2">
        <div className="frame-6">
          <div className="label-6">Active Features</div>
        </div>
      </div>

      <div className="div-2">
        <div className="frame-6">
          <div className="label-8">System Recommendations</div>
        </div>

        <div className={currentPlan.facilities.systemRecommendation ? "element-wrapper" : "element-m-wrapper"}>
          <div className={currentPlan.facilities.systemRecommendation ? "element" : "element-m"}>
            {currentPlan.facilities.systemRecommendation ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      <div className="div-2">
        <div className="frame-6">
          <div className="label-8">Advanced Analytics</div>
        </div>

        <div className={currentPlan.facilities.advanceAnalytics ? "element-wrapper" : "element-m-wrapper"}>
          <div className={currentPlan.facilities.advanceAnalytics ? "element" : "element-m"}>
            {currentPlan.facilities.advanceAnalytics ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      <div className="div-2">
        <div className="frame-6">
          <div className="label-8">Custom Matching</div>
        </div>

        <div className={currentPlan.facilities.customMatching ? "element-wrapper" : "element-m-wrapper"}>
          <div className={currentPlan.facilities.customMatching ? "element" : "element-m"}>
            {currentPlan.facilities.customMatching ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      <div className="div-2">
        <div className="frame-6">
          <div className="label-8">Search and Filter</div>
        </div>

        <div className={currentPlan.facilities.searchAndFilter ? "element-wrapper" : "element-m-wrapper"}>
          <div className={currentPlan.facilities.searchAndFilter ? "element" : "element-m"}>
            {currentPlan.facilities.searchAndFilter ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      <div className="div-2">
        <div className="frame-6">
          <div className="label-8">Advanced Sort</div>
        </div>

        <div className={currentPlan.facilities.advancedSort ? "element-wrapper" : "element-m-wrapper"}>
          <div className={currentPlan.facilities.advancedSort ? "element" : "element-m"}>
            {currentPlan.facilities.advancedSort ? "Active" : "Inactive"}
          </div>
        </div>
      </div>
    </div>
  );
};
