import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { useState } from "react";
import { SiAuthy } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => {
    setIsLogin((prev) => !prev)
  }

  return (
    <div className="flex min-h-screen bg-[#121212]">
      {/* Left side - Branding/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0a] items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="mb-8">
            <SiAuthy className="mx-auto h-16 w-16 text-[#4ECDC4]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">BCG X</h1>
          <p className="text-gray-400 text-lg mb-8">Secure, fast, and reliable platform for all your needs.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaCheckCircle className="h-6 w-6 text-[#4ECDC4]" />
              <p className="text-gray-300 text-left">Product Management</p>
            </div>
            <div className="flex items-center gap-4">
              <FaCheckCircle className="h-6 w-6 text-[#4ECDC4]" />
              <p className="text-gray-300 text-left">Price Optimization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-[#1a1a1a] rounded-xl shadow-xl p-8 border border-[#333]">
            <h1 className="text-2xl font-bold text-center mb-8 text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            <div className="mb-6">{isLogin ? <LoginForm /> : <RegisterForm toggleForm={toggleForm} />}</div>

            <div className="text-center mt-6">
              {isLogin ? (
                <p className="text-gray-300">
                  Don't have an account?{" "}
                  <button onClick={toggleForm} className="text-[#4ECDC4] hover:text-[#3DBDB4] font-medium">
                    Register
                  </button>
                </p>
              ) : (
                <p className="text-gray-300">
                  Already have an account?{" "}
                  <button onClick={toggleForm} className="text-[#4ECDC4] hover:text-[#3DBDB4] font-medium">
                    Login
                  </button>
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationPage

