import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { useState } from "react";

export default function SignUpVerify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length === 6) {
      navigate("/signup/profile");
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-white">
      <Header />
      <div className="max-w-[390px] mx-auto w-full pt-40">
        <div className="w-full space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Verify Your Number</h1>
            <p className="text-gray-600">Enter the 6-digit code sent to your mobile number.</p>
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              className="flex w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 bg-white rounded-lg border border-solid border-[#d3d3d3] px-4 py-[17px] font-medium text-gray-600 text-sm text-center tracking-[0.5em]"
              placeholder="Enter 6-digit code"
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
            />
            <Button 
              className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full h-12 bg-orange hover:bg-orange/90 rounded-[48px] text-white font-semibold"
              onClick={handleVerify}
              disabled={otp.length !== 6}
            >
              Verify
            </Button>
            <div className="text-center">
              <button 
                className="text-orange text-sm font-medium"
                onClick={() => navigate("/signup")}
              >
                Change Phone Number
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 