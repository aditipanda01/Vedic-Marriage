import { ChevronRightIcon, PencilIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

export const BasicDetailsSection = (): JSX.Element => {
  // Form field data for mapping
  const formFields = [
    {
      id: "maritalStatus",
      label: "Marital Status",
      type: "select",
      width: "half",
    },
    { id: "gender", label: "Gender", type: "select", width: "half" },
    {
      id: "motherTongue",
      label: "Mother Tongue",
      type: "select",
      width: "full",
    },
    {
      id: "languageKnown",
      label: "Language Known",
      type: "select",
      width: "full",
    },
    { id: "height", label: "Height", type: "select", width: "half" },
    {
      id: "weight",
      label: "Weight",
      type: "text",
      width: "half",
      suffix: "kg",
    },
    {
      id: "diseaseOrDisability",
      label: "Disease or Disability",
      type: "select",
      width: "full",
    },
    {
      id: "conditional",
      label: "(Conditional to fill input)",
      type: "text",
      width: "full",
      disabled: true,
    },
    { id: "religion", label: "Religion", type: "select", width: "full" },
    { id: "ethnicity", label: "Ethnicity", type: "select", width: "full" },
  ];

  return (
    <Card className="flex flex-col w-full max-w-md gap-2 pt-4 pb-10 px-4 bg-white rounded-2xl overflow-hidden">
      <div className="flex h-14 items-center gap-2 py-2 w-full">
        <div className="flex items-center justify-center h-12 px-0.5 py-[17px]">
          <div className="w-11 [font-family:'Montserrat',Helvetica] font-normal text-black text-[17px] text-center">
            🧑
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[#b8b4c4] text-xs leading-4 whitespace-nowrap">
            Self • Rajesh Kumar
          </div>

          <div className="w-fit font-body-14pt text-black text-[length:var(--body-14pt-font-size)] whitespace-nowrap font-[number:var(--body-14pt-font-weight)] tracking-[var(--body-14pt-letter-spacing)] leading-[var(--body-14pt-line-height)] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [font-style:var(--body-14pt-font-style)]">
            Basic Details
          </div>
        </div>

        <Button variant="ghost" size="icon" className="p-3 h-auto">
          <PencilIcon className="w-6 h-6" />
        </Button>
      </div>

      <CardContent className="flex flex-col items-start gap-6 pt-6 pb-0 px-2">
        <div className="flex items-start gap-6 w-full">
          {formFields.slice(0, 2).map((field) => (
            <div key={field.id} className="flex-1 relative h-16">
              <div className="absolute h-[23px] -top-1 left-0 [font-family:'Raleway',Helvetica] font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                {field.label}
              </div>
              <Select>
                <SelectTrigger className="w-full h-10 mt-6 border border-solid border-[#dfe1e6]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
          ))}
        </div>

        {formFields.slice(2, 4).map((field) => (
          <div key={field.id} className="relative w-full h-16">
            <div className="absolute h-[23px] -top-1 left-0 [font-family:'Raleway',Helvetica] font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
              {field.label}
            </div>
            <Select>
              <SelectTrigger className="w-full h-10 mt-6 border border-solid border-[#dfe1e6]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
        ))}

        <div className="flex items-start gap-6 w-full">
          <div className="flex-1 relative h-16">
            <div className="absolute h-[23px] -top-1 left-0 [font-family:'Raleway',Helvetica] font-semibold text-[#3a3a3a] text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
              Height
            </div>
            <Select>
              <SelectTrigger className="w-full h-10 mt-6 border border-solid border-[#dfe1e6]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>

          <div className="flex-1 relative h-16">
            <div className="absolute h-[23px] -top-1 left-0 [font-family:'Raleway',Helvetica] font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
              Weight
            </div>
            <div className="w-full h-10 mt-6 flex items-center rounded border border-solid border-[#dfe1e6]">
              <div className="flex-1"></div>
              <div className="flex items-center justify-center h-10 w-12">
                <div className="font-caption-12pt font-[number:var(--caption-12pt-font-weight)] text-black text-[length:var(--caption-12pt-font-size)] text-center tracking-[var(--caption-12pt-letter-spacing)] leading-[var(--caption-12pt-line-height)] [font-style:var(--caption-12pt-font-style)]">
                  kg
                </div>
              </div>
            </div>
          </div>
        </div>

        {formFields.slice(6, 8).map((field, index) => (
          <div
            key={field.id}
            className={`relative w-full h-16 ${field.disabled ? "opacity-40" : ""}`}
          >
            <div className="absolute h-[23px] -top-1 left-0 [font-family:'Raleway',Helvetica] font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
              {field.label}
            </div>
            {!field.disabled ? (
              <Select disabled={field.disabled}>
                <SelectTrigger className="w-full h-10 mt-6 border border-solid border-[#dfe1e6]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent />
              </Select>
            ) : (
              <div className="w-full h-10 mt-6 rounded border border-solid border-[#dfe1e6]"></div>
            )}
          </div>
        ))}

        {formFields.slice(8).map((field) => (
          <div key={field.id} className="relative w-full h-16">
            <div
              className={`absolute h-[23px] -top-1 left-0 ${field.id === "religion" || field.id === "ethnicity" ? "[font-family:'Plus_Jakarta_Sans',Helvetica]" : "[font-family:'Raleway',Helvetica]"} font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap`}
            >
              {field.label}
            </div>
            <Select>
              <SelectTrigger className="w-full h-10 mt-6 border border-solid border-[#dfe1e6]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
        ))}
      </CardContent>

      <div className="flex justify-between mt-4 px-2">
        <Button variant="ghost" className="h-auto">
          Skip
        </Button>
        <Button className="bg-orange text-white h-auto flex items-center gap-1">
          Next
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
