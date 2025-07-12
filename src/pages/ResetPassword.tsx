import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import PasswordService from "../../service/password.service";
import BG from "@/assets/banner1.webp";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const formRef = useRef<HTMLFormElement>(null);

  const { fn: resetFn, data: res, loading } = useFetch(PasswordService.resetPassword);

  useEffect(() => {
    if (!email) {
      toast.error("Invalid access");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (res) {
      toast.success("Password reset successfully");
      navigate("/login");
    } else if (res?.error) {
      toast.error(res.error);
    }
  }, [res, navigate]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const newPassword = formData.get("newPassword")?.toString().trim();
    const confirmPassword = formData.get("confirmPassword")?.toString().trim();

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    await resetFn({ email, newPassword });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 bg-cover bg-center relative px-4 py-12"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="absolute inset-0 bg-opacity-60"></div>

      <div className="relative z-10 w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-lg">

        {/* Left Section */}
        <div className="flex flex-col justify-center items-center p-6 text-white">
          <h1 className="text-4xl font-extrabold mb-2 text-center leading-tight drop-shadow-lg">Reset Your Password</h1>
          <p className="text-lg text-center text-white/90">
            Create a new password to regain access to your account.
          </p>
        </div>

        {/* Right Section - Reset Form */}
        <div className="flex items-center justify-center p-6">
          <Card className="w-full max-w-sm rounded-2xl bg-white/80 border border-gray-300 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Reset Password</CardTitle>
              <p className="text-gray-500 text-sm">For: <strong>{email}</strong></p>
            </CardHeader>

            <CardContent>
              <form ref={formRef} onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm text-gray-700">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    required
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm text-gray-700">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    required
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-black hover:to-gray-800 text-white font-semibold py-2 rounded-xl transform hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  {loading ? <LoaderIcon className="animate-spin" /> : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
