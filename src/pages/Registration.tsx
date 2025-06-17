import AuthLayout from "../components/Layout/AuthLayout";
import RegistrationForm from "../components/Auth/RegistrationForm";
import { useLocation } from "react-router-dom";

const Registration = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  return (
    <AuthLayout>
      <RegistrationForm email={email} />
    </AuthLayout>
  );
};

export default Registration;
