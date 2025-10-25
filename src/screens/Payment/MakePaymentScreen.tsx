import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import { PaymentService, PaymentData as ServicePaymentData } from '@/services/paymentService';
import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
interface LocalPaymentData {
  id: string; // Add subscription plan ID
  name: string;
  price: string;
  period: string;
  breakdown: {
    price: string;
    gst: string;
  };
  subtotal: string;
  total: string;
}

const defaultPaymentData: LocalPaymentData = {
  id: "premiumplus", // Default ID for fallback
  name: "Premium Plus",
  price: "Rs. 1499/-",
  period: "Per Month",
  breakdown: {
    price: "Rs. 1000",
    gst: "Rs. 180",
  },
  subtotal: "Rs. 1180",
  total: "Rs. 1180",
};

export const MakePaymentScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<LocalPaymentData>(defaultPaymentData);

  useEffect(() => {
    try {
      // Get the selected plan data from localStorage
      const selectedPlan = localStorage.getItem("selectedPlan");
      if (selectedPlan) {
        const parsedData = JSON.parse(selectedPlan);
        // Validate the data structure
        if (parsedData && parsedData.name && parsedData.price) {
          setPaymentData(parsedData);
        } else {
          console.warn("Invalid payment data structure, using default data");
          setPaymentData(defaultPaymentData);
        }
      } else {
        console.warn("No selected plan found in localStorage");
        setPaymentData(defaultPaymentData);
      }
    } catch (error) {
      console.error("Error loading payment data:", error);
      setPaymentData(defaultPaymentData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Ensure we have valid data before rendering
  const safePaymentData = paymentData || defaultPaymentData;

  if (isLoading) {
    return (
      <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e84420] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  const handleProceedToPay = async () => {
    // Navigate to payment method selection screen
    navigate("/payment/method");
  };

  const handleRemovePlan = () => {
    // Clear the selected plan from localStorage
    localStorage.removeItem("selectedPlan");
    // Navigate back to plan selection
    navigate("/payment");
  };

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      {/* Status Bar */}
      
      <Header />
      {/* Browser Bar */}
      

      {/* Main Content */}
      <div className="absolute w-full h-[calc(100%-200px)] top-[200px] left-0 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10">
          <nav className="flex items-center h-14 px-4">
            <Button
              variant="ghost"
              className="w-14 h-14 p-3"
              onClick={() => navigate(-1)}
            >
              <img
                className="w-6 h-6"
                alt="Back"
                src="/assets/images/img/arrows.png"
              />
            </Button>
            <h1 className="flex-1 text-sm font-bold text-black text-center">
              Payment Summary
            </h1>
            <div className="w-14" /> {/* Spacer for alignment */}
          </nav>
        </header>

        {/* Payment Details */}
        <main className="px-4 py-6">
          {/* Plan Card */}
          <Card className="mb-6 border-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="text-base font-bold text-e-84420 mb-1">
                    {safePaymentData.name}
                  </div>
                  <div className="text-sm">
                    <span className="text-black">{safePaymentData.price}</span>
                    <span className="text-[11px] font-bold text-[#959595] ml-1">
                      {safePaymentData.period}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="h-auto px-2"
                  onClick={handleRemovePlan}
                >
                  <span className="text-xs font-medium text-black">Remove</span>
                </Button>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-[11px] text-[#313131] mb-2">Price</div>
                  <div className="text-[11px] text-[#313131]">18% GST</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#313131] mb-2">{safePaymentData.breakdown.price}</div>
                  <div className="text-[11px] text-[#313131]">{safePaymentData.breakdown.gst}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-4" />

          {/* Subtotal */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-xs font-bold text-grey">Subtotal</div>
            <div className="text-xs font-bold text-grey">{safePaymentData.subtotal}</div>
          </div>

          {/* Discount Codes */}
          <div className="mb-6">
            <div className="text-xs font-bold text-grey mb-4">Discount Code &amp; Vouchers</div>

            {/* Promo Code Input */}
            <div className="relative mb-4">
              <div className="absolute left-4 top-2">
                <img
                  className="w-6 h-6"
                  alt="Promo"
                  src="/assets/images/img/promo.png"
                />
              </div>
              <Input
                className="pl-14 pr-20 h-10 bg-[#f7f9ff] border-2 rounded-lg text-[10px] font-semibold text-grey"
                placeholder="Promo Code"
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0 h-10 px-4"
              >
                <span className="text-xs font-bold text-variable-collection-light-grey">Apply</span>
              </Button>
            </div>

            {/* Referral Code Input */}
            <div className="relative">
              <div className="absolute left-4 top-2">
                <img
                  className="w-6 h-6"
                  alt="Referral"
                  src="/assets/images/img/referaal.png"
                />
              </div>
              <Input
                className="pl-14 pr-20 h-10 bg-[#f7f9ff] border-2 rounded-lg text-[10px] font-semibold text-grey"
                placeholder="Referral Code"
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0 h-10 px-4"
              >
                <span className="text-xs font-bold text-variable-collection-light-grey">Apply</span>
              </Button>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-xs font-bold text-grey">Total</div>
            <div className="text-xs font-bold text-grey">{safePaymentData.total}</div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        leftButton={{
          text: "Back",
          onClick: () => navigate(-1),
          variant: "outline",
          iconDirection: "left",
          iconPosition: "left"
        }}
        rightButton={{
          text: isPaying ? 'Processing...' : 'Proceed to Pay',
          onClick: handleProceedToPay,
          disabled: isPaying,
          loading: isPaying,
          loadingText: 'Processing...',
          color: "orange",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
      {error && (
        <div className="text-red-500 text-xs text-center mt-2">{error}</div>
      )}
    </div>
  );
}; 