import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
} from "../../store/slices/authSlice";
import { updateUserSports } from "../../store/slices/sportsSlice";
import { AppDispatch } from "../../store/store";

const SPORTS = [
  "Football",
  "Basketball",
  "Tennis",
  "Cricket",
  "Badminton",
  "Table Tennis",
  "Swimming",
  "Volleyball",
  "Hockey",
  "Golf",
  "Baseball",
  "Running",
];

const GENDERS = ["Male", "Female", "Other"];
const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+81"];

const RegistrationForm: React.FC<{ email: string }> = ({
  email: initialEmail,
}) => {
  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(initialEmail || "");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(GENDERS[0]);
  // Step 2 fields
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Sports selection
  const [sports, setSports] = useState<string[]>([]);
  // State
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Get auth state from Redux
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Handle authentication success
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle auth errors
  useEffect(() => {
    if (authError) {
      setErrors((prev) => ({ ...prev, general: authError }));
    }
  }, [authError]);

  // Step 1 validation
  const validateStep1 = () => {
    const errs: { [k: string]: string } = {};
    if (!firstName.trim()) errs.firstName = "First name is required.";
    if (!lastName.trim()) errs.lastName = "Last name is required.";
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      errs.email = "Valid email required.";
    if (!dob) errs.dob = "Date of birth required.";
    if (!gender) errs.gender = "Gender required.";
    return errs;
  };

  // Step 2 validation
  const validateStep2 = () => {
    const errs: { [k: string]: string } = {};
    if (!mobile.match(/^\d{7,15}$/)) errs.mobile = "Valid mobile required.";
    if (!password || password.length < 6) errs.password = "Min 6 characters.";
    if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  // Sports validation
  const validateSports = () => {
    if (sports.length === 0) return { sports: "Select at least one sport." };
    return {};
  };

  // Handlers
  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep1();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep2();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(3);
  };

  const handleSportToggle = (sport: string) => {
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateSports();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      try {
        // Calculate age from DOB
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        // Get current location
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        // Register user
        await dispatch(
          register({
            firstName,
            lastName,
            gender: gender.toLowerCase(),
            age,
            email,
            mobile: `${countryCode}${mobile}`,
            password,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        ).unwrap();

        // Convert selected sports to the format expected by the API
        const userSports = sports.map((sportName) => {
          const sport = SPORTS.find((s) => s === sportName);
          return {
            sportId: SPORTS.indexOf(sportName) + 1, // Assuming sport IDs match array indices + 1
            skillLevel: 3, // Default skill level
          };
        });

        // Update user's sports
        await dispatch(updateUserSports(userSports)).unwrap();

        // Store selected sports in localStorage for UI purposes
        localStorage.setItem("espn_sports", JSON.stringify(sports));
      } catch (err) {
        // Error is handled by the auth slice and displayed via authError
      }
    }
  };

  // Progress bar
  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="bg-orange-600/20 rounded-2xl p-4 mb-2">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
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
      {/* Progress bar and step label */}
      <div className="flex items-center justify-between w-full mb-2 mt-2">
        <span className="text-white/70 text-sm font-medium">
          Step {step} of 3
        </span>
        <span className="text-white/70 text-sm font-medium">
          {step === 1
            ? "Basic Info"
            : step === 2
            ? "Contact & Security"
            : "Sports"}
        </span>
      </div>
      <div className="w-full h-2 bg-[#23232b] rounded mb-4">
        <div
          className="h-2 rounded bg-orange-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {errors.general && (
        <div className="text-red-500 text-sm text-center mb-4">
          {errors.general}
        </div>
      )}

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <form onSubmit={handleStep1} className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white text-center">
            Tell Us About You
          </h3>
          <p className="text-white/70 text-center text-sm mb-2">
            Complete your basic profile information
          </p>
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-white font-medium">First Name</label>
              <input
                className="rounded-lg px-4 py-3 bg-[#181924] text-white border-2 focus:outline-none focus:border-orange-600 transition"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
                autoFocus
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">{errors.firstName}</span>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-white font-medium">Last Name</label>
              <input
                className="rounded-lg px-4 py-3 bg-[#181924] text-white border-2 focus:outline-none focus:border-orange-600 transition"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">{errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white font-medium">Email Address</label>
            <input
              type="email"
              className="rounded-lg px-4 py-3 bg-[#181924] text-white border-2 focus:outline-none focus:border-orange-600 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-white font-medium">Date of Birth</label>
              <input
                type="date"
                className="rounded-lg px-4 py-3 bg-[#181924] text-white border-2 focus:outline-none focus:border-orange-600 transition"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={isLoading}
              />
              {errors.dob && (
                <span className="text-red-500 text-xs">{errors.dob}</span>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-white font-medium">Gender</label>
              <select
                className="rounded-lg px-4 py-3 bg-[#181924] text-white border-2 focus:outline-none focus:border-orange-600 transition"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={isLoading}
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-red-500 text-xs">{errors.gender}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg py-3 mt-2 transition disabled:opacity-60"
            disabled={isLoading}
          >
            Continue →
          </button>
        </form>
      )}

      {/* Step 2: Contact & Security */}
      {step === 2 && (
        <form onSubmit={handleStep2} className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white text-center">
            Contact & Security
          </h3>
          <p className="text-white/70 text-center text-sm mb-2">
            Set up your contact information and password
          </p>
          <div className="flex gap-3">
            <div className="w-24 flex flex-col gap-1">
              <label className="text-white font-medium">Country Code</label>
              <select
                className="rounded-lg px-2 py-3 bg-[#181924] text-white border-2 focus:outline-none focus:border-orange-600 transition"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={isLoading}
              >
                {COUNTRY_CODES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-white font-medium">Mobile Number</label>
              <input
                type="tel"
                className="rounded-lg px-4 py-3 bg-[#181924] text-white border-2 focus:outline-none focus:border-orange-600 transition"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={isLoading}
                placeholder="Enter your mobile number"
              />
              {errors.mobile && (
                <span className="text-red-500 text-xs">{errors.mobile}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white font-medium">Password</label>
            <input
              type="password"
              className="rounded-lg px-4 py-3 bg-[#181924] text-white border-2 focus:outline-none focus:border-orange-600 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="Create a password"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white font-medium">Confirm Password</label>
            <input
              type="password"
              className="rounded-lg px-4 py-3 bg-[#181924] text-white border-2 focus:outline-none focus:border-orange-600 transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              className="flex-1 bg-[#23232b] hover:bg-[#2a2a33] text-white font-semibold rounded-lg py-3 transition"
              onClick={() => setStep(1)}
              disabled={isLoading}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg py-3 transition disabled:opacity-60"
              disabled={isLoading}
            >
              Continue →
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Sports Selection */}
      {step === 3 && (
        <form onSubmit={handleFinish} className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white text-center">
            Select Your Sports
          </h3>
          <p className="text-white/70 text-center text-sm mb-2">
            Choose the sports you're interested in
          </p>
          <div className="grid grid-cols-2 gap-3">
            {SPORTS.map((sport) => (
              <button
                key={sport}
                type="button"
                className={`p-3 rounded-lg border-2 transition ${
                  sports.includes(sport)
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "bg-[#181924] border-[#23232b] text-white hover:border-orange-600"
                }`}
                onClick={() => handleSportToggle(sport)}
                disabled={isLoading}
              >
                {sport}
              </button>
            ))}
          </div>
          {errors.sports && (
            <span className="text-red-500 text-xs text-center">
              {errors.sports}
            </span>
          )}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              className="flex-1 bg-[#23232b] hover:bg-[#2a2a33] text-white font-semibold rounded-lg py-3 transition"
              onClick={() => setStep(2)}
              disabled={isLoading}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg py-3 transition disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account →"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
