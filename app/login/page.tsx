"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import OTPInput from "@/components/OTPInput"; // Komponen terpisah untuk input OTP

export default function LoginPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [shake, setShake] = useState(false);

  // Handle OTP verification
  const handleSubmit = async () => {
    setIsVerifying(true);

    const result = await signIn("google-authenticator", {
      redirect: false,
      code,
    });

    if (result?.error) {
      setError("Whoops.. Wrong code!");
      setCode("");
      setIsVerifying(false);
      setShake(true);

      setTimeout(() => {
        setShake(false);
        setError("");
      }, 2000);
    } else {
      router.push("/dashboard");
    }
  };

  // Auto-submit when code length is 6
  useEffect(() => {
    if (code.length === 6) {
      handleSubmit();
    }
  }, [code]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <motion.div animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}>
          <OTPInput
            code={code}
            setCode={setCode}
            isVerifying={isVerifying}
            error={error}
          />
        </motion.div>

        {error && (
          <p className="mt-4 text-center text-red-500 text-sm font-semibold">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
