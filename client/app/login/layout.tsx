import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen bg-slate-200 h-screen flex justify-center items-center">
      {children}
    </div>
  );
}

export default LoginLayout;
