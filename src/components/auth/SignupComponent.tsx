import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";

interface SignupComponentProps {
  onSignupSuccess?: (email: string, password: string) => void;
  onSigninRedirect?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const SignupComponent: React.FC<SignupComponentProps> = ({
  onSignupSuccess,
  isLoading = false,
  error = null,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill out all fields!");
      setIsSubmitting(false);
      return;
    }

    if (!formData.agree) {
      toast.error("You must agree to the Terms & Privacy Policy!");
      setIsSubmitting(false);
      return;
    }

    toast.loading("Creating account...");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    toast.dismiss();

    toast.success("Account created successfully! 🚀");

    if (onSignupSuccess) {
      onSignupSuccess(formData.email, formData.password);
    }

    setIsSubmitting(false);
  };

  const loading = isLoading || isSubmitting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg mb-4">
            <Users className="text-white h-7 w-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">
            Sign up to manage your tasks efficiently
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200">
          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="John Doe"
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  disabled={loading}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Agree Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                I agree to the Terms & Privacy Policy
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 shadow-md hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Signin Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to={"/sign-in"}
                type="button"
                className="text-purple-600 font-medium hover:text-purple-800"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">
          By signing up, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default SignupComponent;
