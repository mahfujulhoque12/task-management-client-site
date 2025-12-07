import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";

interface SigninComponentProps {
  onSigninSuccess?: (email: string, password: string) => void;
  onForgotPassword?: () => void;
  onSignupRedirect?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const SigninComponent: React.FC<SigninComponentProps> = ({
  onSigninSuccess,
  onForgotPassword,
  isLoading = false,
  error = null,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast.loading("Signing in...");

    await new Promise((resolve) => setTimeout(resolve, 1200));

    toast.dismiss(); // remove loader

    if (!formData.email || !formData.password) {
      toast.error("Please fill out all fields!");
      setIsSubmitting(false);
      return;
    }

    toast.success("Successfully signed in! 🚀");

    if (onSigninSuccess) {
      onSigninSuccess(formData.email, formData.password);
    }

    setIsSubmitting(false);
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@example.com",
      password: "demopassword",
      rememberMe: false,
    });

    toast.info("Demo credentials filled ✨");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const loading = isLoading || isSubmitting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg mb-4">
            <div className="text-3xl font-bold text-white">TF</div>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">
            Sign in to continue your tasks
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200">
          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Demo */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            Try Demo Account
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">
                Or sign in with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>

                {onForgotPassword && (
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Forgot?
                  </button>
                )}
              </div>

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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  placeholder="••••••••"
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

            {/* Remember */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Remember me</label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 shadow-md hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Signup */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                to={"/sign-up"}
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">
          By signing in, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default SigninComponent;
