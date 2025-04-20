import type React from "react";

import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RegisterFormProps {
  toggleForm: () => void;
}

export default function RegisterForm({ toggleForm }: RegisterFormProps) {
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    const { success, error } = await register(
      formData.username,
      formData.email,
      formData.password,
      formData.role
    );

    if (success) {
      toast.success("Registration successful! Please login.");
      setTimeout(() => {
        toggleForm();
      }, 1000);
    } else {
      const errors = error?.split("\n");
      errors?.forEach((err) => {
        toast.error(err.trim());
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          {/* Icon */}
          <svg
            /* icon svg */ className="text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full py-3 px-12 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#4ECDC4] focus:border-[#4ECDC4]"
          required
        />
      </div>

      {/* Email */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            /* email icon */ className="text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full py-3 px-12 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#4ECDC4] focus:border-[#4ECDC4]"
          required
        />
      </div>

      <div className="relative">
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full py-3 px-4 mt-3 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#4ECDC4] focus:border-[#4ECDC4]"
          required
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="admin">Admin</option>
          <option value="buyer">Buyer</option>
          <option value="supplier">Supplier</option>
        </select>
      </div>

      {/* Password */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            /* lock icon */ className="text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full py-3 px-12 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#4ECDC4] focus:border-[#4ECDC4]"
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-4 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-white" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-white" />
          )}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            /* lock icon */ className="text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
          className="w-full py-3 px-12 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#4ECDC4] focus:border-[#4ECDC4]"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-[#4ECDC4] hover:bg-[#3DBDB4] text-white font-medium rounded-md transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
