import React from "react";
import { Card, CardContent, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui";

interface FormField {
  id: string;
  label: string;
  type: "text" | "select";
  width: "full" | "half";
}

export const BasicDetailsSection = (): JSX.Element => {
  // Form field data
  const formFields: FormField[] = [
    { id: "name", label: "Full Name", type: "text", width: "full" },
    { id: "gender", label: "Gender", type: "select", width: "full" },
    { id: "age", label: "Age", type: "text", width: "half" },
    { id: "height", label: "Height", type: "text", width: "half" },
    { id: "education", label: "Education", type: "select", width: "full" },
    { id: "occupation", label: "Occupation", type: "select", width: "full" },
    { id: "income", label: "Annual Income", type: "select", width: "full" },
    { id: "maritalStatus", label: "Marital Status", type: "select", width: "full" },
  ];

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <div className={field.width === "full" ? "w-full" : "w-1/2"}>
            <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-grey text-sm mb-2">
              {field.label}
            </div>
            <Input className="h-10 w-full" />
          </div>
        );
      case "select":
        return (
          <div className={field.width === "full" ? "w-full" : "w-1/2"}>
            <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-grey text-sm mb-2">
              {field.label}
            </div>
            <Select>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col w-full max-w-md mx-auto gap-2 pt-4 pb-10 px-4 bg-white rounded-2xl overflow-hidden">
      <CardContent className="flex flex-col items-start gap-6 pt-6 pb-0 px-2 sm:px-4">
        <div className="flex h-14 gap-2 py-2 w-full items-center">
          <div className="flex flex-col h-12 items-center justify-center gap-2 px-0.5 py-[17px]">
            <div className="w-11 [font-family:'Raleway',Helvetica] font-normal text-black text-base text-center">
              👤
            </div>
          </div>

          <div className="flex items-start flex-1 flex-col gap-1">
            <div className="w-fit [font-family:'Montserrat',Helvetica] font-bold text-[#b8b4c4] text-xs leading-4 whitespace-nowrap">
              Self • Rajesh Kumar
            </div>

            <div className="w-fit font-body-14pt text-black text-[length:var(--body-14pt-font-size)] whitespace-nowrap font-[number:var(--body-14pt-font-weight)] tracking-[var(--body-14pt-letter-spacing)] leading-[var(--body-14pt-line-height)] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [font-style:var(--body-14pt-font-style)]">
              Basic Details
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 pt-6 w-full">
          {formFields.map((field) => renderField(field))}
        </div>
      </CardContent>
    </Card>
  );
};
