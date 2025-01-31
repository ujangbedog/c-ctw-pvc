import { signIn } from "next-auth/react";

export const verifyOTP = async (code: string) => {
  const result = await signIn("google-authenticator", {
    redirect: false,
    code,
  });

  return result;
};
