import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chevron } from "@/components/Chevron";
import { Close } from "@/components/Close";
import { TickMark } from "@/components/TickMark";
import { TimeSpent } from "@/components/TimeSpent";
import "./style.css";
import chevron from "@/assets/images/img/chevron.png";
import chevronDown from "@/assets/images/img/chevron-3.png";
import tickMark from "@/assets/images/img/tick-mark-5.png";
import close from "@/assets/images/img/close-4.png";
import close2 from "@/assets/images/img/close-2.png";
import timeSpent from "@/assets/images/img/timespent-1.png";

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

interface UpgradePlanProps {
  plans: SubscriptionPlan[];
  currentSubscriptionId?: string;
  isSubscriptionActive?: boolean;
}

export const UpgradePlan = ({ plans, currentSubscriptionId, isSubscriptionActive }: UpgradePlanProps): JSX.Element => {
  const navigate = useNavigate();
  
  // Create a state object dynamically based on plans
  const initialExpandedState = plans.reduce((acc, plan) => {
    // Expand the current subscribed plan by default
    acc[plan.id] = !!(plan.id === currentSubscriptionId && isSubscriptionActive);
    return acc;
  }, {} as Record<string, boolean>);

  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>(initialExpandedState);

  const togglePlan = (planId: string) => {
    setExpandedPlans(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  const isCurrentPlan = (planId: string) => {
    return planId === currentSubscriptionId && isSubscriptionActive;
  };

  const getPlanClassName = (plan: SubscriptionPlan) => {
    return isCurrentPlan(plan.id) ? "premium-plan" : "div";
  };

  const getPlanLabelClass = (index: number) => {
    const classes = ["label-pt", "label-2", "label-3", "label-4"];
    return classes[index % classes.length];
  };

  const handleGetStarted = (plan: SubscriptionPlan) => {
    // Calculate pricing with GST
    const basePrice = plan.price;
    const gst = Math.round(basePrice * 0.18); // 18% GST
    const total = basePrice + gst;
    
    // Store the selected plan data in localStorage
    localStorage.setItem("selectedPlan", JSON.stringify({
      id: plan.id,
      name: plan.name,
      price: `Rs. ${basePrice}/-`,
      period: `Per ${Math.round(plan.durationInDays / 30)} ${Math.round(plan.durationInDays / 30) === 1 ? 'Month' : 'Months'}`,
      breakdown: {
        price: `Rs. ${basePrice}`,
        gst: `Rs. ${gst}`,
      },
      subtotal: `Rs. ${total}`,
      total: `Rs. ${total}`,
    }));
    
    // Navigate to make payment screen
    navigate('/payment/make-payment');
  };

  return (
    <div className="upgrade-plan">
      <div className="upgrade-heading">
        <div className="frame">
          <div className="label">Upgrade Plans</div>
        </div>
      </div>

      {plans.map((plan, index) => (
        <div key={plan.id} className={getPlanClassName(plan)}>
          <div className="autolayout-row">
            <div className="frame-2">
              <div className={getPlanLabelClass(index)}>{plan.name}</div>

              <p className="body">
                <span className="text-wrapper">Rs. {plan.price}/- </span>
                <span className="span">Per {Math.round(plan.durationInDays / 30)} {Math.round(plan.durationInDays / 30) === 1 ? 'Month' : 'Months'}</span>
              </p>
            </div>

            <div className="action" onClick={() => togglePlan(plan.id)}>
              <Chevron
                className={`chevron-instance ${expandedPlans[plan.id] ? 'rotated' : ''}`}
                property1={expandedPlans[plan.id] ? "down" : "up"}
                propertyUp={chevron}
                propertyDown={chevronDown}
              />
            </div>
          </div>

          {expandedPlans[plan.id] && (
            <>
              {isCurrentPlan(plan.id) && (
                <div className="autolayout-row-3">
                  <div className="div-wrapper">
                    <div className="body-3">Key Features</div>
                  </div>
                </div>
              )}

              <div className={isCurrentPlan(plan.id) ? "frame-4" : "frame-3"}>
                <div className="autolayout-row-2">
                  <div className="icon">
                    <TickMark
                      className="design-component-instance-node-2"
                      property1="default"
                      propertyDefault={plan.facilities.connections > 0 ? tickMark : close}
                    />
                  </div>
                  <div className="body-wrapper">
                    <div className="body-pt">{plan.facilities.connections} Connections</div>
                  </div>
                </div>

                <div className="autolayout-row-2">
                  <div className="icon">
                    <TickMark
                      className="design-component-instance-node-2"
                      property1="default"
                      propertyDefault={plan.facilities.messages > 0 ? tickMark : close}
                    />
                  </div>
                  <div className="body-wrapper">
                    <div className="body-pt">{plan.facilities.messages} Personal Messages</div>
                  </div>
                </div>

                <div className="autolayout-row-2">
                  <div className="icon">
                    <TickMark
                      className="design-component-instance-node-2"
                      property1="default"
                      propertyDefault={plan.facilities.contactsView > 0 ? tickMark : close}
                    />
                  </div>
                  <div className="body-wrapper">
                    <div className="body-pt">{plan.facilities.contactsView} Contact Details</div>
                  </div>
                </div>

                <div className="autolayout-row-2">
                  <div className="icon">
                    {plan.facilities.personalizedRecommendation > 0 ? (
                      <TickMark
                        className="design-component-instance-node-2"
                        property1="default"
                        propertyDefault={tickMark}
                      />
                    ) : (
                      <Close className="design-component-instance-node-2" close={close2} />
                    )}
                  </div>
                  <div className="body-wrapper">
                    <div className="body-pt">
                      {plan.facilities.personalizedRecommendation > 0 
                        ? `${plan.facilities.personalizedRecommendation} Matchmaker's Recommendations` 
                        : "No Matchmaker's Recommendations"}
                    </div>
                  </div>
                </div>

                {isCurrentPlan(plan.id) && (
                  <div className="autolayout-row-2">
                    <div className="icon">
                      <TimeSpent
                        className="design-component-instance-node-2"
                        timeSpent={timeSpent}
                      />
                    </div>
                    <div className="body-wrapper">
                      <div className="body-pt">{Math.round(plan.durationInDays / 30)} {Math.round(plan.durationInDays / 30) === 1 ? 'Month' : 'Months'} Validity</div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div 
            className={isCurrentPlan(plan.id) ? "autolayout-row-4" : "frame-wrapper"}
            onClick={() => !isCurrentPlan(plan.id) && handleGetStarted(plan)}
            style={{ 
              cursor: isCurrentPlan(plan.id) ? 'default' : 'pointer',
              opacity: isCurrentPlan(plan.id) ? 0.7 : 1
            }}
          >
            <div className="body-pt-wrapper">
              <div className="body-2">
                {isCurrentPlan(plan.id) ? "Subscribed" : "Get Started"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
