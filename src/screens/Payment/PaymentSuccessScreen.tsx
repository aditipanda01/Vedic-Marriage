"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Header } from "@/components/Header"
import { BottomNavigation } from "@/components/ui/BottomNavigation";

interface PlanData {
  name: string;
  price: string;
  period: string;
  features: {
    connectionsPerMonth: number;
    personalMessages: number;
    contactDetails: number;
    matchmakerRecommendations: boolean;
    advancedAnalytics: boolean;
    customMatching: boolean;
    validityMonths: number;
  };
}

const defaultPlanData: PlanData = {
  name: "Premium Plus",
  price: "Rs. 1999/-",
  period: "Per Month",
  features: {
    connectionsPerMonth: 50,
    personalMessages: 50,
    contactDetails: 50,
    matchmakerRecommendations: false,
    advancedAnalytics: true,
    customMatching: true,
    validityMonths: 6
  }
};

export const PaymentSuccessScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState<PlanData>(defaultPlanData);

  useEffect(() => {
    try {
      const selectedPlan = localStorage.getItem("selectedPlan");
      if (selectedPlan) {
        const parsedData = JSON.parse(selectedPlan);
        // Ensure the parsed data has all required fields
        if (parsedData && parsedData.name && parsedData.price && parsedData.period) {
          setPlanData({
            ...defaultPlanData,
            ...parsedData,
            features: parsedData.features || defaultPlanData.features
          });
        }
      }
    } catch (error) {
      console.error("Error loading plan data:", error);
    }
  }, []);

  const renderFeature = (label: string, value: number | boolean) => {
    return (
      <div className="flex items-center gap-2">
        <div className="p-1">
          <CheckIcon className="w-4 h-4 text-black" />
        </div>
        <span className="font-['Montserrat',Helvetica] font-medium text-black text-xs leading-4">
          {typeof value === 'number' ? `${value} ${label}` : label}
        </span>
      </div>
    );
  };

  const handleGoToDashboard = () => {
    // Navigate to profile completion screen
    // navigate('/profile-completion');
    navigate('/dashboard');
  };

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto">
      {/* Status Bar */}
      <Header />

     

      

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10">
          <nav className="flex items-center h-14 px-4">
            <Button
              variant="ghost"
              className="w-14 h-14 p-3"
              onClick={() => navigate(-1)}
            >
              <img
                className="w-6 h-6"
                alt="Back"
                src="/assets/images/img/arrows.png"
              />
            </Button>
            <h1 className="flex-1 text-sm font-bold text-black text-center">
              Payment Success
            </h1>
            <div className="w-14" /> {/* Spacer for alignment */}
          </nav>
        </header>

        {/* Success Message */}
        <main className="px-4 py-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-[#e84420] rounded-full opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  className="w-16 h-16"
                  alt="Success"
                  src="/assets/images/img/vector-1.png"
                />
              </div>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">
              Payment Successful!
            </h2>
            <p className="text-sm text-gray-600 text-center mb-8 max-w-[280px]">
              Your payment has been processed successfully. You can now access all premium features.
            </p>

            {/* Selected Plan */}
            <Card className="w-full mb-6 border-none">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-base font-bold text-e-84420 mb-1">
                      {planData.name}
                    </div>
                    <div className="text-sm">
                      <span className="text-black">{planData.price}</span>
                      <span className="text-[11px] font-bold text-[#959595] ml-1">
                        {planData.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Available Features */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-black mb-2">Available Features:</h3>
                  <div className="space-y-2">
                    {renderFeature("No. of Connections per month", planData.features.connectionsPerMonth)}
                    {renderFeature("Personal Messages", planData.features.personalMessages)}
                    {renderFeature("Contact Details", planData.features.contactDetails)}
                    {planData.features.matchmakerRecommendations && renderFeature("Matchmaker's Recommendations", true)}
                    {planData.features.advancedAnalytics && renderFeature("Advanced Analytics", true)}
                    {planData.features.customMatching && renderFeature("Custom Matching", true)}
                    {renderFeature("Months Validity", planData.features.validityMonths)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Button
              className="w-full h-12 bg-[#e84420] text-white hover:bg-[#e84420]/90"
              onClick={handleGoToDashboard}
            >
              Go to Dashboard
            </Button> */}
          </div>
        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        singleButton={{
          text: "Continue",
          onClick: handleGoToDashboard,
          color: "orange",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  );
}; 