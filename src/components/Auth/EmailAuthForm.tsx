import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailAuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/otp-verification", { state: { email } });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="bg-orange-600/20 rounded-full p-3 mb-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path
              fill="#ea580c"
              d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11ZM4.5 6a.5.5 0 0 0-.5.5v.379l8 5.333 8-5.333V6.5a.5.5 0 0 0-.5-.5h-15Zm15 2.821-7.62 5.08a1 1 0 0 1-1.16 0L4 8.82V17.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V8.82Z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white text-center">
          Welcome to ESPN
        </h2>
        <p className="text-white/70 text-center text-sm">
          Let's get you started with your email
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white font-medium">
          Enter Your Email
        </label>
        <input
          id="email"
          type="email"
          className={`rounded-lg px-4 py-3 bg-[#23232b] text-white border-2 focus:outline-none focus:border-orange-600 transition ${
            error ? "border-red-500" : "border-transparent"
          }`}
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoFocus
        />
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg py-3 mt-2 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Code →"}
      </button>
      <p className="text-xs text-white/40 text-center mt-2">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
};

export default EmailAuthForm;
