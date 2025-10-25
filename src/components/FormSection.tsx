import React from "react";
import { Card, CardContent } from "./ui/card";
import { FormSectionProps } from "../types/form";

export const FormSection: React.FC<FormSectionProps> = ({ section, renderField }) => {
  return (
    <Card className="flex flex-col w-full max-w-md mx-auto items-start gap-6 pt-4 pb-10 px-4 bg-white rounded-2xl">
      <div className="flex h-14 items-center gap-2 py-2 relative self-stretch w-full">
        <div className="inline-flex flex-col h-12 items-center justify-center gap-2 px-0.5 py-[17px] relative flex-[0_0_auto]">
          <div className="relative w-11 [font-family:'Raleway',Helvetica] font-normal text-black text-base text-center tracking-[0] leading-[normal]">
            {section.emoji}
          </div>
        </div>

        <div className="flex items-start flex-1 grow flex-col gap-1 relative">
          {section.subtitle && (
            <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[#b8b4c4] text-xs leading-4 whitespace-nowrap relative tracking-[0]">
              {section.subtitle}
            </div>
          )}

          <div className="w-fit font-body-14pt text-black text-[length:var(--body-14pt-font-size)] whitespace-nowrap relative font-[number:var(--body-14pt-font-weight)] tracking-[var(--body-14pt-letter-spacing)] leading-[var(--body-14pt-line-height)] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [font-style:var(--body-14pt-font-style)]">
            {section.title}
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col items-start gap-6 px-6 py-0 relative self-stretch w-full">
        {section.fields.map(renderField)}
      </CardContent>

      {(section.onSkip || section.onNext) && (
        <div className="flex justify-between w-full px-6">
          {section.onSkip && (
            <button
              onClick={section.onSkip}
              className="w-[100px] h-8 font-bold text-grey text-sm bg-background-color rounded-[84px]"
            >
              Skip
            </button>
          )}
          {section.onNext && (
            <button
              onClick={section.onNext}
              className="w-[100px] h-8 pl-4 pr-0 py-0 bg-orange text-white font-bold text-sm rounded-[84px] flex items-center justify-between"
            >
              Next
              <span className="inline-flex items-center justify-center p-2 rounded-[72px] bg-orange ml-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
      )}
    </Card>
  );
}; 