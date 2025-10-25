import React from "react";
import { FormWrapperSection } from "./sections/FormWrapperSection/FormWrapperSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationProvider } from "../../lib/context/NavigationContext";
import { FormSection } from "./sections/FormSection/FormSection";

const IphoneContent = (): JSX.Element => {
  return (
    <div
      className="flex flex-col w-full max-w-[390px] mx-auto bg-white overflow-hidden"
      data-model-id="247:4503"
    >
      <HeaderSection />
      <MainContentSection />
      <FormSection />
      <FormWrapperSection />
    </div>
  );
};

export const Iphone = (): JSX.Element => {
  return (
    <NavigationProvider>
      <IphoneContent />
    </NavigationProvider>
  );
};
