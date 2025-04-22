import { useAuthStore } from "@/store/authStore"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function LoginForm() {
  const { login, isLoading } = useAuthStore()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { success, error } = await login(formData.email, formData.password)
    if (success) {
      toast.success("Logged in successfully!")
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } else {
      toast.error(error)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10 bg-[#1a1a1a] border-[#333] text-white focus:ring-[#4ECDC4] focus:border-[#4ECDC4] selection:bg-[#4ECDC4]/30 caret-[#4ECDC4] w-full"
              required
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10 bg-[#1a1a1a] border-[#333] text-white focus:ring-[#4ECDC4] focus:border-[#4ECDC4] selection:bg-[#4ECDC4]/30 caret-[#4ECDC4] w-full"
              required
              value={formData.password}
              onChange={handleFormChange}
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

        <Button
          type="submit"
          className="w-full bg-[#4ECDC4] hover:bg-[#3DBDB4] text-white py-3 px-4 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
