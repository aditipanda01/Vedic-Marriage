import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { PaymentMethod } from "../../types/payment";
import { BottomNavigation } from "@/components/ui/BottomNavigation";

interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: string;
  isPopular?: boolean;
  disabled?: boolean;
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: PaymentMethod.PHONEPE,
    name: "PhonePe",
    description: "Pay using PhonePe UPI, wallet, or cards",
    icon: "/assets/images/img/phonepe-icon.png",
    isPopular: true,
  },
  {
    id: PaymentMethod.RAZORPAY,
    name: "Razorpay",
    description: "Pay using UPI, cards, net banking, or wallets",
    icon: "/assets/images/img/razorpay-icon.png",
    disabled: true,
  },
  {
    id: PaymentMethod.INSTAMOJO,
    name: "Instamojo",
    description: "Pay using UPI, cards, or net banking",
    icon: "/assets/images/img/instamojo-icon.png",
    disabled: true,
  },
  {
    id: PaymentMethod.STRIPE,
    name: "Stripe",
    description: "Pay using international cards",
    icon: "/assets/images/img/stripe-icon.png",
    disabled: true,
  },
];

export const PaymentMethodScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(PaymentMethod.PHONEPE);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleProceedToPayment = async () => {
    if (!selectedMethod) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Store the selected payment method in localStorage
      localStorage.setItem("selectedPaymentMethod", selectedMethod);
      
      // Navigate to the process payment screen
      navigate("/payment/process");
    } catch (error) {
      console.error("Error proceeding to payment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto overflow-hidden">
      <Header />

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
              Choose Payment Method
            </h1>
            <div className="w-14" /> {/* Spacer for alignment */}
          </nav>
        </header>

        {/* Payment Methods */}
        <main className="px-4 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-black mb-2">Select Payment Method</h2>
            <p className="text-sm text-gray-600">
              Choose your preferred payment method to continue
            </p>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`transition-all duration-200 ${
                  method.disabled
                    ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                    : selectedMethod === method.id
                    ? "border-[#e84420] bg-[#fff4e6] cursor-pointer"
                    : "border-gray-200 hover:border-gray-300 cursor-pointer"
                }`}
                onClick={() => !method.disabled && handleMethodSelect(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src={method.icon}
                          alt={method.name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            // Fallback to text if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-lg font-bold text-gray-600">${method.name.charAt(0)}</span>`;
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-black">{method.name}</h3>
                          {method.isPopular && (
                            <span className="px-2 py-1 text-xs bg-[#e84420] text-white rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method.disabled
                        ? "border-gray-300 bg-gray-200"
                        : selectedMethod === method.id
                        ? "border-[#e84420] bg-[#e84420]"
                        : "border-gray-300"
                    }`}>
                      {selectedMethod === method.id && !method.disabled && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-black mb-2">Secure Payment</h3>
            <p className="text-xs text-gray-600">
              All payments are processed securely through trusted payment gateways. 
              Your payment information is encrypted and protected.
            </p>
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
          text: isProcessing ? 'Processing...' : 'Continue to Payment',
          onClick: handleProceedToPayment,
          disabled: !selectedMethod || isProcessing,
          loading: isProcessing,
          loadingText: 'Processing...',
          color: "orange",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
    </div>
  );
};
