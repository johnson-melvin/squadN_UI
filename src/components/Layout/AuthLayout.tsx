import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#23232b]">
    <div className="w-full max-w-md bg-[#111112] rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#333]">
      {children}
    </div>
  </div>
);

export default AuthLayout;
