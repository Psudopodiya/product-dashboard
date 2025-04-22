import { useAuthStore } from "@/store/authStore"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RegisterFormProps {
  toggleForm: () => void
}

export default function RegisterForm({ toggleForm }: RegisterFormProps) {
  const { register, isLoading } = useAuthStore()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.")
      return
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.")
      return
    }

    const { success, error } = await register(formData.username, formData.email, formData.password, formData.role)

    if (success) {
      toast.success("Registration successful! Please login.")
      setTimeout(() => {
        toggleForm()
      }, 1000)
    } else {
      const errors = error?.split("\n")
      errors?.forEach((err) => {
        toast.error(err.trim())
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              className="pl-10 bg-[#1a1a1a] border-[#333] text-white focus:ring-[#4ECDC4] focus:border-[#4ECDC4] selection:bg-[#4ECDC4]/30 caret-[#4ECDC4] w-full"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 bg-[#1a1a1a] border-[#333] text-white focus:ring-[#4ECDC4] focus:border-[#4ECDC4] selection:bg-[#4ECDC4]/30 caret-[#4ECDC4] w-full"
              required
            />
          </div>
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label htmlFor="role" className="block text-sm font-medium text-gray-300">
            Role
          </label>
          <Select value={formData.role} onValueChange={handleRoleChange} required>
            <SelectTrigger className="w-full bg-[#1a1a1a] border-[#333] text-white focus:ring-[#4ECDC4] focus:border-[#4ECDC4]">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-[#333] text-white">
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="buyer">Buyer</SelectItem>
              <SelectItem value="supplier">Supplier</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-10 bg-[#1a1a1a] border-[#333] text-white focus:ring-[#4ECDC4] focus:border-[#4ECDC4] selection:bg-[#4ECDC4]/30 caret-[#4ECDC4] w-full"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="pl-10 bg-[#1a1a1a] border-[#333] text-white focus:ring-[#4ECDC4] focus:border-[#4ECDC4] selection:bg-[#4ECDC4]/30 caret-[#4ECDC4] w-full"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#4ECDC4] hover:bg-[#3DBDB4] text-white py-3 px-4 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </div>
  )
}
