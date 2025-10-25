import React, { useState, ChangeEvent } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ChevronDownIcon } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { CheckIcon } from "lucide-react";
import { Header } from "../../components/shared/Header";

type SignupStep = "phone" | "otp" | "verified";

export const SignupFlow = (): JSX.Element => {
  const [step, setStep] = useState<SignupStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handlePhoneSubmit = () => {
    // TODO: Implement phone verification logic
    setStep("otp");
  };

  const handleOtpSubmit = () => {
    // TODO: Implement OTP verification logic
    setStep("verified");
  };

  const renderPhoneStep = () => (
    <>
      <div className="absolute w-80 h-20 top-[432px] left-1/2 -translate-x-1/2">
        <label className="absolute w-80 h-4 -top-px left-0 [font-family:'Montserrat',Helvetica] font-semibold text-dark-grey text-sm tracking-[0] leading-[23.1px] whitespace-nowrap">
          Enter Your Mobile Number or Email
        </label>

        <Card className="absolute w-80 h-12 top-8 left-0 bg-white rounded-lg border border-solid border-[#d3d3d3] shadow-none">
          <div className="relative h-12 flex items-center">
            <div className="inline-flex items-center pl-6 pr-0 py-0">
              <div className="w-fit font-normal text-xl text-right whitespace-nowrap [font-family:'Montserrat',Helvetica] text-black tracking-[0] leading-[normal]">
                🇮
              </div>
              <div className="inline-flex h-12 items-center justify-center gap-2 px-2 py-4 relative flex-[0_0_auto]">
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-col w-8 h-12 items-center justify-center gap-2 px-0.5 py-4">
              <div className="relative w-11 mt-[-1.50px] ml-[-8.00px] mr-[-8.00px] [font-family:'Montserrat',Helvetica] font-medium text-black text-sm text-center tracking-[0] leading-[normal]">
                +91
              </div>
            </div>

            <div className="flex flex-col w-[212px] h-12 items-start justify-center gap-2 px-4 py-[17px]">
              <Input
                className="w-full h-full border-none p-0 shadow-none font-medium text-dark-grey text-sm [font-family:'Montserrat',Helvetica] text-center tracking-[0] leading-[normal]"
                value={phoneNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                placeholder="Enter mobile number"
              />
            </div>
          </div>
        </Card>
      </div>

      <Button 
        className="w-80 h-10 absolute top-[544px] left-1/2 -translate-x-1/2 bg-orange rounded-[48px] text-white hover:bg-orange/90"
        onClick={handlePhoneSubmit}
      >
        <span className="font-caption-12pt">Continue</span>
      </Button>

      <div className="absolute top-[600px] left-1/2 -translate-x-1/2 w-80 flex items-center justify-center">
        <Separator className="flex-grow bg-[#d3d3d3]" />
        <span className="px-4 font-caption-12pt text-grey">OR</span>
        <Separator className="flex-grow bg-[#d3d3d3]" />
      </div>

      <Button
        variant="outline"
        className="flex w-80 items-center justify-center gap-2 px-16 py-0 absolute top-[664px] left-1/2 -translate-x-1/2 bg-[#ffffff] rounded-[48px] border border-[#d3d3d3] h-12"
      >
        <div className="p-3 relative flex w-12 h-12 items-center justify-center gap-2">
          <img className="relative w-6 h-6" alt="Google" src="/assets/images/img/googl.png" />
        </div>
        <div className="flex-1 font-semibold text-xs [font-family:'Montserrat',Helvetica] text-black tracking-[0] leading-[normal]">
          Signup with Google
        </div>
      </Button>
    </>
  );

  const renderOtpStep = () => (
    <>
      <div className="absolute w-[320px] top-[440px] left-1/2 -translate-x-1/2">
        <div className="w-full font-semibold text-dark-grey text-sm tracking-[0] leading-[23.1px] mb-2">
          Enter OTP
        </div>

        <div className="flex justify-between w-full mb-2">
          <div className="font-semibold text-grey text-xs tracking-[0] leading-[18px]">
            OTP sent to +91-{phoneNumber}
          </div>
          <div 
            className="font-semibold text-new-blue text-xs text-right tracking-[0] leading-[18px] cursor-pointer"
            onClick={() => setStep("phone")}
          >
            Edit Number?
          </div>
        </div>

        <Card className="w-full border border-solid border-[#d3d3d3] rounded-lg">
          <div className="flex items-center justify-center p-4">
            <InputOTP maxLength={6} value={otp} onChange={setOtp} className="gap-2">
              {Array(6).fill("").map((_, index) => (
                <InputOTPGroup
                  key={index}
                  className="flex w-10 h-12 items-center justify-center relative rounded-lg"
                >
                  <InputOTPSlot
                    index={index}
                    className="w-full h-full flex items-center justify-center font-medium text-dark-grey text-sm"
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
          </div>
        </Card>
      </div>

      <Button 
        className="w-80 h-10 absolute top-[544px] left-1/2 -translate-x-1/2 bg-orange rounded-[48px] text-white hover:bg-orange/90"
        onClick={handleOtpSubmit}
      >
        <span className="font-caption-12pt">Verify</span>
      </Button>

      <div className="flex flex-col w-[165px] h-12 items-center justify-center gap-2 px-0.5 py-[17px] absolute top-[600px] left-1/2 -translate-x-1/2">
        <div className="relative w-fit mt-[-1.50px] font-caption-12pt text-[length:var(--caption-12pt-font-size)] text-center tracking-[var(--caption-12pt-letter-spacing)] leading-[var(--caption-12pt-line-height)]">
          <span className="text-[#959595]">Resent OTP in </span>
          <span className="text-[#e65e28]">60s</span>
        </div>
      </div>
    </>
  );

  const renderVerifiedStep = () => (
    <>
      <div className="absolute w-[320px] top-[440px] left-1/2 -translate-x-1/2">
        <div className="w-full font-semibold text-dark-grey text-sm tracking-[0] leading-[23.1px] mb-2">
          Enter OTP
        </div>

        <div className="flex justify-between w-full mb-2">
          <div className="font-semibold text-grey text-xs tracking-[0] leading-[18px]">
            OTP sent to +91-{phoneNumber}
          </div>
        </div>

        <Card className="w-full border border-solid border-[#d3d3d3] rounded-lg">
          <div className="flex items-center justify-center p-4">
            <InputOTP maxLength={6} value={otp} disabled className="gap-2">
              {Array(6).fill("").map((_, index) => (
                <InputOTPGroup
                  key={index}
                  className="flex w-10 h-12 items-center justify-center relative rounded-lg"
                >
                  <InputOTPSlot
                    index={index}
                    className="w-full h-full flex items-center justify-center font-medium text-dark-grey text-sm"
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
          </div>
        </Card>
      </div>

      <Button className="absolute top-[576px] left-1/2 -translate-x-1/2 h-10 bg-new-green rounded-[48px] shadow-[0px_0px_40px_#00000014] flex items-center justify-center gap-2 px-4">
        <span className="font-caption-12pt text-white">Verified</span>
        <div className="flex items-center justify-center">
          <CheckIcon className="w-6 h-6 text-white" />
        </div>
      </Button>
    </>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="relative w-[390px] h-[844px] bg-[#ffffff] overflow-hidden">
        {/* Gray placeholder area */}
        <div className="absolute w-[387px] h-[234px] top-40 left-1/2 -translate-x-1/2 bg-[#d9d9d9]" />

        {/* Dynamic content based on step */}
        {step === "phone" && renderPhoneStep()}
        {step === "otp" && renderOtpStep()}
        {step === "verified" && renderVerifiedStep()}

        {/* Header */}
        <Header />
      </div>
    </div>
  );
}; 