import React, { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { FaCheck, FaLock } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";


interface PaymentModalProps {
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<
    "amount" | "confirm" | "processing" | "success"
  >("amount");
  const [amount, setAmount] = useState("");

  const handleAmountSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep("confirm");
    }
  };

  const handleConfirmPayment = () => {
    setStep("processing");
    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
    }, 3000);
  };

  const handleClose = () => {
    setStep("amount");
    setAmount("");
    onClose();
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return (
      now.toLocaleDateString("en-GB") +
      " at " +
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="bg-white rounded-t-3xl shadow-2xl w-full max-h-[90vh] transform transition-all duration-300 animate-slide-in-from-bottom">
        {/* Amount Step */}
        {step === "amount" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Enter Amount
              </h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <IoCloseOutline />
              </button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-semibold text-gray-600">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-4 text-3xl font-bold text-center border-2 border-gray-200 rounded-2xl focus:border-black focus:outline-none transition-colors bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {["1", "5", "10", "50", "100", "500"].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className="py-3 px-4 bg-gray-100 hover:bg-blue-50 hover:border-blue-300 border border-gray-200 rounded-xl text-gray-700 font-medium transition-all duration-200"
                >
                  ₹{preset}
                </button>
              ))}
            </div>

            <button
              onClick={handleAmountSubmit}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full bg-black text-white py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Confirm Step */}
        {step === "confirm" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setStep("amount")}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <MdOutlineKeyboardArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">
                Pay ₹{amount}
              </h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                X
              </button>
            </div>

            {/* Sent to Section */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Sent to</p>
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">AI</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">AI Assistant</p>
                    <p className="text-sm text-gray-600">aiassistant@upi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Using Section */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Using</p>
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">GP</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Google Pay</p>
                      <p className="text-sm text-gray-600">••••1234</p>
                    </div>
                  </div>
                  <button className="text-black text-sm font-medium">
                    Change
                  </button>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{amount}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:bg-black transition-colors flex items-center justify-center space-x-2"
              >
                <span>Pay using UPI</span>
              </button>

              <button
                onClick={handleConfirmPayment}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <CiCreditCard1/>
                <span>Pay using Card</span>
              </button>
            </div>
          </div>
        )}

        {/* Processing Step */}
        {step === "processing" && (
          <div className="p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLock className="w-8 h-8 text-black" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ₹{amount}
              </div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                Processing payment...
              </h2>
              <p className="text-gray-600">Paying AI Assistant</p>
            </div>

            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-black rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-black rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="p-6 text-center">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <IoCloseOutline />
            </button>

            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ₹{amount}
              </div>
              <h2 className="text-xl font-bold text-green-600 mb-2">
                Payment Successful
              </h2>
              <p className="text-gray-700 font-medium">Paid to AI Assistant</p>
              <p className="text-sm text-gray-500 mt-1">
                {getCurrentDateTime()}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleClose}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors"
              >
                Done
              </button>

              <button
                onClick={handleClose}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                View transaction details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
