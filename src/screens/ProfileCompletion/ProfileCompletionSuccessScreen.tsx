"use client"

import React from "react";
import { HomeIcon, MoreVerticalIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ProfileCompletionSuccessScreen = (): JSX.Element => {
  return (
    <div
      className="relative w-[390px] h-[844px] bg-white border border-solid border-[#000000]"
      data-model-id="471:58476"
    >
      <ScrollArea className="absolute w-[390px] h-[612px] top-40 left-0">
        <div className="flex flex-col items-center px-6">
          <img
            className="w-[159px] h-[181px] mt-[88px]"
            alt="Profile verification illustration"
            src="/assets/images/img/clip-path-group.png"
          />

          <Card className="w-full mt-4 border-none shadow-none">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className="flex flex-col items-center gap-1 w-full">
                <p className="self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-e-84420 text-xs text-center tracking-[0] leading-5">
                  Congratulations! 🎉
                </p>
                <p className="self-stretch [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#2bcc8d] text-[15px] text-center tracking-[0] leading-5">
                  Your Profile Verification is Underway
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full border-none shadow-none">
            <CardContent className="px-10 py-4">
              <div className="flex flex-col items-start gap-1">
                <p className="self-stretch mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-medium text-black text-xs tracking-[0] leading-5">
                  You've completed onboarding! 🚀 Your profile is now under
                  verification to ensure authenticity and security. This process
                  takes up to 24 hours.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full border-none shadow-none">
            <CardContent className="px-10 py-4">
              <div className="flex flex-col items-start gap-2">
                <h3 className="self-stretch mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-bold text-orange text-sm tracking-[0] leading-4">
                  Why it matters?
                </h3>
                <p className="font-medium leading-7 self-stretch [font-family:'Montserrat',Helvetica] text-black text-xs tracking-[0]">
                  √ Boosts trust & credibility
                  <br />√ Ensures a secure community
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full border-none shadow-none">
            <CardContent className="px-10 py-4">
              <div className="flex flex-col items-start gap-2">
                <h3 className="self-stretch mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-bold text-orange text-sm tracking-[0] leading-4">
                  What's next?
                </h3>
                <p className="leading-5 self-stretch [font-family:'Montserrat',Helvetica] text-black text-xs tracking-[0]">
                  <span className="font-medium">
                    Once verified, you'll unlock full access to start
                    connecting! You'll receive an{" "}
                  </span>
                  <span className="font-bold">email and SMS notification</span>
                  <span className="font-medium">
                    {" "}
                    as soon as your profile is verified.
                    <br />
                    <br />
                    Thanks for your patience—we're excited to have you! 🌟🔒
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <header className="fixed w-[390px] h-40 top-0 left-0 bg-transparent">
        {/* Status Bar */}
        

        {/* Navigation Bar */}
        <div className="absolute w-[390px] h-16 top-8 left-0 bg-white-100 border-b [border-bottom-style:solid] border-[#dbdbdb]">
          <HomeIcon className="absolute w-6 h-6 top-5 left-3 text-gray-333-100" />

          <div className="flex w-[262px] items-center gap-2 px-[11px] py-[9px] absolute top-4 left-11 bg-gray-333-10 rounded-[17px]">
            <div className="relative w-4 h-4">
              <div className="relative w-2 h-[11px] top-[3px] left-1">
                <div className="absolute w-2 h-2 top-[3px] left-0 bg-gray-333-100 rounded-[1px]" />
                <img
                  className="absolute w-5 h-5 top-[3px] left-[9px]"
                  alt="Clip path group"
                  src="/assets/images/img/clip-path-group.png"
                />
              </div>
            </div>

            <div className="inline-flex items-center relative self-stretch flex-[0_0_auto]">
              <div className="relative w-fit [font-family:'Roboto',Helvetica] font-medium text-gray-333-100 text-[10px] tracking-[0] leading-[13px] whitespace-nowrap">
                vedicmarriage.ai
              </div>
              <div className="relative w-fit [font-family:'Roboto',Helvetica] font-medium text-gray-333-60 text-[10px] tracking-[0] leading-[13px] whitespace-nowrap">
                /my-profile
              </div>
            </div>
          </div>

          <div className="absolute w-4 h-4 top-6 left-[322px] rounded-[5px] overflow-hidden border-[1.5px] border-solid border-gray-333-100">
            <div className="absolute w-4 h-4 -top-0.5 -left-0.5 [font-family:'Roboto',Helvetica] font-bold text-gray-333-100 text-[10px] text-center tracking-[0] leading-[normal]">
              1
            </div>
          </div>

          <MoreVerticalIcon className="absolute w-6 h-6 top-5 left-[354px] text-gray-333-100" />
        </div>

        {/* Logo Banner */}
        <div className="flex flex-col w-[390px] h-16 items-center justify-center gap-2 px-[22px] py-2 absolute top-24 left-0 bg-[#fff4e6] overflow-hidden">
          <div className="relative w-[172px] h-8 bg-[url(/assets/images/img/image-15.png)] bg-cover bg-[50%_50%]" />
          <img
            className="absolute w-10 h-[62px] left-0 top-[-10px]"
            alt="Group"
            src="/assets/images/img/group-1000004397.png"
          />
          <img
            className="absolute w-10 h-[62px] right-0 top-[-10px]"
            alt="Group"
            src="/assets/images/img/group-1000004397.png"
          />
        </div>
      </header>
    </div>
  );
}; 