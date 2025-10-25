"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/Header"
import { ChevronRightIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Define data for profile sections
const profileSections = [
  {
    title: "Basic Details",
    icon: "/img/image.png",
    completed: true,
  },
  {
    title: "Astro & Lineage",
    icon: "/img/3x.png",
    completed: true,
  },
  {
    title: "Family Background",
    icon: "/img/1.png",
    completed: true,
  },
  {
    title: "Career & Education",
    icon: "/img/2.png",
    completed: true,
  },
  {
    title: "Spiritual Details",
    icon: "/img/3.png",
    completed: true,
  },
  {
    title: "Personality Questions",
    icon: "/img/4.png",
    completed: true,
  },
  {
    title: "Partner Preferences",
    icon: "/img/5.png",
    completed: true,
  },
]

const photoSections = [
  {
    title: "Upload Photos",
    icon: "/img/photos.png",
    completed: true,
  },
  {
    title: "Selfie Verification",
    icon: "/img/recommendations.png",
    completed: true,
  },
]

const verificationSections = [
  {
    title: "Email Verification",
    icon: "/img/mail.png",
    completed: true,
  },
  {
    title: "Mobile Number Verification",
    icon: "/img/phone.png",
    completed: true,
  },
  {
    title: "Govt. ID Verification",
    icon: "/img/secrity.png",
    completed: true,
    hasInfo: true,
  },
  {
    title: "Setup Your Privacy Settings",
    icon: "/img/privacy.png",
    completed: true,
  },
]

export function ProfileCompletion() {
  const navigate = useNavigate();

  const handleBuildProfile = () => {
    navigate("/profile-filling");
  };

  return (
    <main className="min-h-screen bg-background-color">
      <Header />
      <div className="mx-auto max-w-[390px] relative">
        <div className="relative h-[844px] w-full bg-background-color">
          <div className="absolute left-0 top-40 h-[584px] w-full overflow-y-scroll">
            {/* Profile completion card */}
            <div className="flex h-28 w-full flex-wrap items-start justify-center bg-white rounded-b-2xl px-0 py-4 overflow-hidden">
              <div className="flex h-20 w-[339px] items-center justify-center relative">
                <div className="relative flex-1 grow h-16">
                  <div className="relative left-4 top-[-7px] h-[71px] w-[308px]">
                    <div className="absolute left-0 top-0 h-11 w-[307px] overflow-hidden text-ellipsis font-['Plus_Jakarta_Sans',Helvetica] text-xs font-bold leading-5 tracking-[0] text-black [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box]">
                      Profile Completed
                    </div>

                    <div className="absolute left-0 top-[39px] h-8 w-[146px]">
                      <div className="absolute left-0 top-3 h-5 font-['Plus_Jakarta_Sans',Helvetica] text-[10px] font-normal leading-5 tracking-[0] text-black whitespace-nowrap">
                        1% Completed
                      </div>

                      <Progress
                        value={1}
                        className="absolute left-0 top-0 h-1 w-36 rounded-lg bg-background-color"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center gap-2 p-3 relative">
                  <img
                    className="h-6 w-6"
                    alt="Dropdown triangle up"
                    src="/assets/images/img/dropdown-triangle-up.png"
                  />
                </div>
              </div>
            </div>

            {/* Profile sections card */}
            <Card className="mx-7 mt-4 flex flex-col items-start rounded-2xl bg-white">
              {profileSections.map((section, index) => (
                <div key={index} className="relative h-12 w-full">
                  <div className="absolute left-[279px] top-0 h-12 w-14">
                    <img
                      className="absolute left-4 top-3 h-6 w-6"
                      alt="Completed"
                      src="/assets/images/img/completed-6.png"
                    />
                  </div>

                  <div className="absolute left-[60px] top-[13px] h-5 w-[219px] overflow-hidden text-ellipsis whitespace-nowrap font-['Plus_Jakarta_Sans',Helvetica] text-xs font-normal leading-5 tracking-[0] text-black [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box]">
                    {section.title}
                  </div>

                  <div className="absolute left-0 top-0 h-12 w-14">
                    <img
                      className={`absolute left-0.5 ${
                        index === 0 || index === 1 || index === 3 || index === 4
                          ? "top-[13px] h-[23px]"
                          : index === 2
                            ? "top-3 h-6"
                            : index === 5
                              ? "top-3.5 h-5"
                              : "top-[15px] h-[19px]"
                      } w-[52px] object-cover`}
                      alt="Icon"
                      src={section.icon}
                    />
                  </div>
                </div>
              ))}
            </Card>

            {/* Photos card */}
            <Card className="mx-6 mt-4 rounded-2xl bg-white">
              <CardHeader className="px-4 py-4 pb-0">
                <CardTitle className="h-2 text-xs font-bold leading-5 tracking-[0] text-black overflow-hidden text-ellipsis whitespace-nowrap font-['Plus_Jakarta_Sans',Helvetica]">
                  Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="px-[9px] pt-2 pb-4">
                {photoSections.map((section, index) => (
                  <div key={index} className="relative mb-2 h-12 w-full">
                    <div className="absolute left-[271px] top-0 flex h-12 w-14 items-center justify-center gap-2 p-3">
                      <img
                        className="h-6 w-6"
                        alt="Completed"
                        src="/assets/images/img/completed-12.png"
                      />
                    </div>

                    <div className="absolute left-[60px] top-[13px] h-5 w-[211px] overflow-hidden text-ellipsis whitespace-nowrap font-['Plus_Jakarta_Sans',Helvetica] text-xs font-normal leading-5 tracking-[0] text-black [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box]">
                      {section.title}
                    </div>

                    <div className="absolute left-0 top-0 flex h-12 w-14 items-center justify-center gap-2 p-3">
                      <img
                        className="h-6 w-6"
                        alt={section.title}
                        src={section.icon}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Verification & Privacy card */}
            <Card className="mx-6 mt-4 mb-6 rounded-2xl bg-white">
              <CardHeader className="px-4 py-2 pb-0">
                <CardTitle className="h-2 text-xs font-bold leading-5 tracking-[0] text-black overflow-hidden text-ellipsis whitespace-nowrap font-['Plus_Jakarta_Sans',Helvetica]">
                  Verification&nbsp;&nbsp;&amp; Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="px-[9px] pt-0 pb-4">
                {verificationSections.map((section, index) => (
                  <div key={index} className="relative mb-0 h-12 w-full">
                    <div className="absolute left-[271px] top-0 flex h-12 w-14 items-center justify-center gap-2 p-3">
                      <img
                        className="h-6 w-6"
                        alt="Completed"
                        src={
                          index < 2
                            ? "/assets/images/img/completed-10.png"
                            : "/assets/images/img/completed-12.png"
                        }
                      />
                    </div>

                    {section.hasInfo ? (
                      <div className="absolute left-[60px] top-0 h-12 w-[211px]">
                        <div className="absolute left-[155px] top-0 h-12 w-14">
                          <img
                            className="absolute left-5 top-4 h-4 w-4"
                            alt="Info"
                            src="/assets/images/img/info.png"
                          />
                        </div>

                        <div className="absolute left-0 top-[13px] h-5 w-[211px] overflow-hidden text-ellipsis whitespace-nowrap font-['Plus_Jakarta_Sans',Helvetica] text-xs font-normal leading-5 tracking-[0] text-black [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box]">
                          {section.title}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute left-[60px] top-[13px] h-5 w-[211px] overflow-hidden text-ellipsis whitespace-nowrap font-['Plus_Jakarta_Sans',Helvetica] text-xs font-normal leading-5 tracking-[0] text-black [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box]">
                        {section.title}
                      </div>
                    )}

                    <div className="absolute left-0 top-0 flex h-12 w-14 items-center justify-center gap-2 p-3">
                      <img
                        className="h-6 w-6"
                        alt={section.title}
                        src={section.icon}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Card */}
        <Card className="w-full max-w-[390px] mx-auto mt-auto rounded-t-[16px] shadow-[0px_7px_29px_#64646f33] border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between px-4 rounded-[84px]">
              <span className="font-bold text-[#ed6129] text-sm font-['Plus_Jakarta_Sans',Helvetica]">
                Let&apos;s Build Your Profile
              </span>

              <Button
                size="icon"
                className="p-2 rounded-[72px] bg-[#ed6129] hover:bg-[#ed6129]/90"
                onClick={handleBuildProfile}
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 