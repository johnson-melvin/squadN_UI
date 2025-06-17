import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const OtpVerificationForm: React.FC = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  // const { signIn } = useAuth();
  const email = location.state?.email || "your@email.com";

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (i: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[i] = value;
    setOtp(newOtp);
    if (value && i < OTP_LENGTH - 1) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.join("").length !== OTP_LENGTH) {
      setError("Please enter the 6-digit code.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // After OTP, go to registration page, pass email
      navigate("/registration", { state: { email } });
    }, 1000);
  };

  const handleResend = () => {
    setTimer(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    // Simulate resend
  };

  return (
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
          Verification Code
        </h2>
        <p className="text-white/70 text-center text-sm">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-orange-400">{email}</span>
        </p>
      </div>
      <div className="flex justify-center gap-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-12 text-2xl text-center rounded-lg bg-[#23232b] text-white border-2 focus:outline-none focus:border-orange-600 transition"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={loading}
            autoFocus={i === 0}
          />
        ))}
      </div>
      {error && (
        <span className="text-red-500 text-xs text-center">{error}</span>
      )}
      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg py-3 mt-2 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify Code →"}
      </button>
      <div className="text-center text-white/60 text-sm mt-2">
        {timer > 0 ? (
          <>
            Resend code in{" "}
            <span className="text-orange-400 font-semibold">{timer}s</span>
          </>
        ) : (
          <button
            type="button"
            className="text-orange-400 font-semibold hover:underline"
            onClick={handleResend}
            disabled={loading}
          >
            Resend code
          </button>
        )}
      </div>
    </form>
  );
};

export default OtpVerificationForm;
