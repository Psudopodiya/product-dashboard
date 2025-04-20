import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { useState } from "react";

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center">
      <div className="w-full max-w-md bg-black rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <div className="mb-6">
          {isLogin ? <LoginForm /> : <RegisterForm toggleForm={toggleForm} />}
        </div>
        <div className="text-center">
          {isLogin ? (
            <p className="text-gray-300">
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-[#4ECDC4] hover:text-[#3DBDB4] font-medium"
              >
                Register
              </button>
            </p>
          ) : (
            <p className="text-gray-300">
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-[#4ECDC4] hover:text-[#3DBDB4] font-medium"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
