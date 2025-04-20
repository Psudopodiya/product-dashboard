import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button, Input } from "@/components/ui";

function LoginForm() {
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success, error } = await login(formData.email, formData.password);
    if (success) {
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error(error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 flex gap-4 justify-around">
        <div className="text-xl">Email</div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="pl-10 bg-gray-900 border-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            required
            value={formData.email}
            onChange={handleFormChange}
          />
        </div>
      </div>

      <div className="space-y-2 flex gap-4 justify-around">
        <div className="text-xl">Password</div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10 bg-gray-900 border-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            required
            value={formData.password}
            onChange={handleFormChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-white" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-white" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

export default LoginForm;
