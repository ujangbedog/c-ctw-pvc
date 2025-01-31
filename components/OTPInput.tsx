import React from "react";

interface OTPInputProps {
  code: string;
  setCode: (code: string) => void;
  isVerifying: boolean;
  error: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  code,
  setCode,
  isVerifying,
  error,
}) => {
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={6}
      className={`w-full text-gray-900 text-center text-xl font-bold tracking-widest p-3 border-2 rounded-lg focus:outline-none transition-all
        ${error ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
        ${isVerifying ? "bg-gray-200 animate-pulse cursor-not-allowed" : ""}
      `}
      placeholder="------"
      value={code}
      onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} // Hanya angka
      disabled={isVerifying}
      autoFocus
    />
  );
};

export default OTPInput;
