import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import { PaymentService, PaymentData as ServicePaymentData } from '@/services/paymentService';
import { Header } from "@/components/Header";
import { PaymentMethod } from "../../types/payment";
import { BottomNavigation } from "@/components/ui/BottomNavigation";

interface LocalPaymentData {
  id: string;
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
  id: "premiumplus",
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

export const ProcessPaymentScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<LocalPaymentData>(defaultPaymentData);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  useEffect(() => {
    try {
      // Get the selected plan data from localStorage
      const selectedPlan = localStorage.getItem("selectedPlan");
      const selectedPaymentMethod = localStorage.getItem("selectedPaymentMethod");
      
      if (selectedPlan) {
        const parsedData = JSON.parse(selectedPlan);
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

      if (selectedPaymentMethod) {
        setSelectedMethod(selectedPaymentMethod as PaymentMethod);
      } else {
        // If no payment method selected, redirect back to method selection
        navigate("/payment/method");
        return;
      }
    } catch (error) {
      console.error("Error loading payment data:", error);
      setPaymentData(defaultPaymentData);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleProcessPayment = async () => {
    if (!user?.id || !selectedMethod) {
      setError('User not authenticated or payment method not selected');
      return;
    }

    setIsPaying(true);
    setError(null);

    try {
      // Extract numeric value from price string (e.g., "Rs. 2000/-" -> 2000)
      const priceString = paymentData.total.replace(/[^\d]/g, '');
      const priceValue = parseInt(priceString, 10);
    
      // Prepare comprehensive payment data
      const paymentPayload: ServicePaymentData = {
        amount: priceValue,
        paymentMethod: selectedMethod,
        paymentType: 'ONE_TIME',
        currency: 'INR',
        subscriptionPlanId: paymentData.id,
        redirectUrl: `${window.location.origin}/payment/success`,
        callbackUrl: `${window.location.origin}/api/payment/callback`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
        metadata: {
          planName: paymentData.name,
          planPeriod: paymentData.period,
          planPrice: paymentData.price,
          breakdown: paymentData.breakdown,
          subtotal: paymentData.subtotal,
          total: paymentData.total,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
      };

      const result = await PaymentService.createPayment(paymentPayload);

      if (result.status === 'success') {
        // Handle success - redirect to payment gateway or show success
        if (result.data?.paymentUrl) {
          // Redirect to payment gateway
          window.location.href = result.data.paymentUrl;
        } else {
          // Show success message
          alert('Payment initiated successfully!');
          navigate('/payment/success');
        }
      } else {
        setError(result.error || 'Failed to initiate payment');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to initiate payment.');
    } finally {
      setIsPaying(false);
    }
  };

  const handleBackToMethodSelection = () => {
    navigate("/payment/method");
  };

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
              Process Payment
            </h1>
            <div className="w-14" />
          </nav>
        </header>

        {/* Payment Summary */}
        <main className="px-4 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-black mb-2">Payment Summary</h2>
            <p className="text-sm text-gray-600">
              Review your payment details before proceeding
            </p>
          </div>

          {/* Plan Details */}
          <Card className="mb-6 border-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="text-base font-bold text-e-84420 mb-1">
                    {paymentData.name}
                  </div>
                  <div className="text-sm">
                    <span className="text-black">{paymentData.price}</span>
                    <span className="text-[11px] font-bold text-[#959595] ml-1">
                      {paymentData.period}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-[11px] text-[#313131] mb-2">Price</div>
                  <div className="text-[11px] text-[#313131]">18% GST</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#313131] mb-2">{paymentData.breakdown.price}</div>
                  <div className="text-[11px] text-[#313131]">{paymentData.breakdown.gst}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="mb-6 border-none">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-black mb-3">Payment Method</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-600">
                    {selectedMethod?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-black">{selectedMethod}</div>
                  <div className="text-sm text-gray-600">Selected payment method</div>
                </div>
                <Button
                  variant="ghost"
                  className="ml-auto text-xs"
                  onClick={handleBackToMethodSelection}
                >
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-bold text-black">Total Amount</div>
            <div className="text-lg font-bold text-[#e84420]">{paymentData.total}</div>
          </div>

          {/* Security Notice */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-1">Secure Payment</h3>
                <p className="text-xs text-blue-700">
                  Your payment will be processed securely through {selectedMethod}. 
                  All transactions are encrypted and protected.
                </p>
              </div>
            </div>
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
          text: isPaying ? 'Processing...' : `Pay ${paymentData.total}`,
          onClick: handleProcessPayment,
          disabled: isPaying,
          loading: isPaying,
          loadingText: 'Processing...',
          color: "orange",
          iconDirection: "right",
          iconPosition: "right"
        }}
      />
      
      {error && (
        <div className="fixed top-20 left-4 right-4 max-w-[390px] mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};
