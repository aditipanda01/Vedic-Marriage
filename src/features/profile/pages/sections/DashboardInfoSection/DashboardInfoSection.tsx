import React from "react";
import { Card, CardContent } from "../../../../../components/ui/card";

export const DashboardInfoSection = (): JSX.Element => {
  // Data for profile completion benefits
  const profileBenefits = [
    "Better Matches: The more you share, the more accurate your matches become.",
    "Show Your Personality: Let your unique qualities shine for others to see.",
    "Build Trust: A complete profile builds trust and credibility.",
  ];

  return (
    <Card className="w-full max-w-[320px] font-['Plus_Jakarta_Sans',Helvetica] opacity-80">
      <CardContent className="p-4">
        <h3 className="font-bold text-xs text-black mb-4">
          ✨ Why Complete Your Profile?
        </h3>
        <ol className="list-decimal pl-5 text-xs font-normal text-black leading-5 space-y-2">
          {profileBenefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};
