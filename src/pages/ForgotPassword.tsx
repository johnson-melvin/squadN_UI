import AuthLayout from "../components/Layout/AuthLayout";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="bg-orange-600/20 rounded-full p-3 mb-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                fill="#ea580c"
                d="M12 2a7 7 0 0 1 7 7v2.18a3 3 0 0 1-.88 2.12l-1.41 1.41A2 2 0 0 0 16 16.17V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1.83a2 2 0 0 0-.59-1.41l-1.41-1.41A3 3 0 0 1 5 11.18V9a7 7 0 0 1 7-7Zm0 2a5 5 0 0 0-5 5v2.18c0 .53.21 1.04.59 1.41l1.41 1.41A4 4 0 0 1 10 16.17V18h4v-1.83a4 4 0 0 1 1-2.77l1.41-1.41c.38-.37.59-.88.59-1.41V9a5 5 0 0 0-5-5Z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white text-center">
            Forgot Password?
          </h2>
          <p className="text-white/70 text-center text-sm">
            Enter your email or phone to reset your password.
          </p>
        </div>
        {submitted ? (
          <div className="text-center text-green-400 font-semibold">
            If an account exists, a reset link has been sent.
          </div>
        ) : (
          <>
            <input
              type="text"
              className="rounded-lg px-4 py-3 bg-[#23232b] text-white border-2 focus:outline-none focus:border-orange-600 transition"
              placeholder="Enter your email or phone"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg py-3 mt-2 transition disabled:opacity-60"
              disabled={loading || !value.trim()}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
