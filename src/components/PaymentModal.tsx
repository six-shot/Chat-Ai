"use client";
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';


interface PaymentModalProps {
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'amount' | 'confirm' | 'success'>('amount');
  const [amount, setAmount] = useState('');

  const handleAmountSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep('confirm');
    }
  };

  const handleConfirmPayment = () => {
    setStep('success');
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    setStep('amount');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Amount Step */}
        {step === "amount" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Enter Amount</h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                X
              </button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-4 text-2xl font-semibold text-center border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {["10", "25", "50", "100", "250", "500"].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className="py-3 px-4 bg-gray-100 hover:bg-blue-50 hover:border-blue-300 border border-gray-200 rounded-xl text-gray-700 font-medium transition-all duration-200 hover:scale-105"
                >
                  ${preset}
                </button>
              ))}
            </div>

            <button
              onClick={handleAmountSubmit}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full bg-black text-white py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {/* Confirm Step */}
        {step === "confirm" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Confirm Payment
              </h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                X
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <div className="text-center">
                credit card
                <p className="text-gray-600 mb-2">Payment Amount</p>
                <p className="text-4xl font-bold text-gray-900">${amount}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${amount}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Processing Fee</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-blue-600">
                  ${amount}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep("amount")}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Pay Now
              </button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="p-6 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <FaCheck/>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600">
                Your payment of ${amount} has been processed successfully.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-600">Transaction ID</p>
              <p className="font-mono text-sm text-gray-800">
                TXN-{Date.now().toString().slice(-8)}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
