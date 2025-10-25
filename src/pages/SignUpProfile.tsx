import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SignUpProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileFor: "",
    fullName: "",
    location: ""
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.profileFor && formData.fullName && formData.location) {
      setIsCompleted(true);
      // Navigate to personality page after 2 seconds
      setTimeout(() => {
        navigate("/personality");
      }, 2000);
    }
  };

  if (isCompleted) {
    return (
      <main className="relative w-full min-h-screen bg-white">
        <Header />
        <div className="max-w-[390px] mx-auto w-full pt-40">
          <div className="flex flex-col items-center justify-center space-y-6 px-4">
            <div className="w-20 h-20 rounded-full bg-orange/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-orange" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Profile Created Successfully!</h1>
              <p className="text-gray-600">Welcome to Vedic Marriage</p>
            </div>
            <div className="text-center text-sm text-gray-500">
              Redirecting to personality assessment...
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative w-full min-h-screen bg-white">
      <Header />
      <div className="max-w-[390px] mx-auto w-full pt-40">
        {/* Image Placeholder */}
        <div className="w-full h-[234px] bg-[#d9d9d9] mb-6" />

        {/* Registration Form Section */}
        <Card className="flex flex-col w-full items-start gap-6 pt-0 pb-10 px-4 rounded-2xl overflow-hidden border-none">
          <CardContent className="p-0 w-full">
            <div className="flex h-14 items-center gap-2 px-0 py-2 relative self-stretch w-full">
              <div className="items-start gap-1 relative flex-1 grow flex flex-col">
                <div className="relative self-stretch font-body-14pt text-black text-sm">
                  Registration
                </div>
              </div>
            </div>

            <div className="items-start gap-6 px-6 py-0 relative self-stretch w-full flex-[0_0_auto] flex flex-col">
              {/* Profile For */}
              <div className="relative self-stretch w-full h-16">
                <Select onValueChange={(value) => handleSelectChange("profileFor", value)}>
                  <SelectTrigger className="absolute w-full h-10 top-6 left-0 rounded border border-solid border-[#dfe1e6]">
                    <SelectValue placeholder="Select profile for" />
                    <ChevronDownIcon className="absolute w-4 h-4 top-[11px] right-[11px]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="son">Son</SelectItem>
                    <SelectItem value="daughter">Daughter</SelectItem>
                    <SelectItem value="brother">Brother</SelectItem>
                    <SelectItem value="sister">Sister</SelectItem>
                  </SelectContent>
                </Select>
                <div className="absolute h-[23px] -top-1 left-0 font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                  Profile For
                </div>
              </div>

              {/* Full Name */}
              <div className="relative self-stretch w-full h-16">
                <Input
                  name="fullName"
                  type="text"
                  className="absolute w-full h-10 top-6 left-0 rounded border border-solid border-[#dfe1e6]"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <div className="absolute h-[23px] -top-1 left-0 font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                  Full Name
                </div>
              </div>

              {/* Location */}
              <div className="relative self-stretch w-full h-16">
                <Select onValueChange={(value) => handleSelectChange("location", value)}>
                  <SelectTrigger className="absolute w-full h-10 top-6 left-0 rounded border border-solid border-[#dfe1e6]">
                    <SelectValue placeholder="Select location" />
                    <ChevronDownIcon className="absolute w-4 h-4 top-[11px] right-[11px]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
                <div className="absolute h-[23px] -top-1 left-0 font-bold text-grey text-sm text-justify tracking-[0] leading-[23.1px] whitespace-nowrap">
                  Location
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Finish Sign Up Button */}
        <div className="flex justify-center mt-8">
          <Button 
            className="flex w-[216px] h-10 items-center justify-center gap-2 px-[25px] py-2 bg-orange rounded-[48px] h-auto"
            onClick={handleSubmit}
            disabled={!formData.profileFor || !formData.fullName || !formData.location}
          >
            <span className="relative w-fit font-caption-12pt text-white text-sm text-center">
              Finish Sign Up
            </span>
          </Button>
        </div>
      </div>
    </main>
  );
} 