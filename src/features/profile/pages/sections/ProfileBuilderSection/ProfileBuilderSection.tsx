import React from "react";
import { Card, CardContent } from "../../../../../components/ui/card";

export const ProfileBuilderSection = (): JSX.Element => {
  return (
    <Card className="w-full py-2 px-6">
      <CardContent className="flex flex-col items-center gap-3 p-0">
        <p className="w-full font-bold text-sm text-grey text-center font-['Plus_Jakarta_Sans',Helvetica] leading-4">
          Welcome to your Dashboard!
        </p>
        <p className="w-full font-bold text-lg text-e-84420 text-center font-['Plus_Jakarta_Sans',Helvetica] leading-6">
          🌟 Unlock the Full Experience: <br />
          Complete Your Profile
        </p>
      </CardContent>
    </Card>
  );
};
