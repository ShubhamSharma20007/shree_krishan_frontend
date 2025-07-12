import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import BG from "@/assets/banner1.webp";
import { useNavigate } from "react-router-dom";

import PasswordService from "../../service/password.service";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { fn: sendOtpFn, data: response, loading } = useFetch(PasswordService.sendOtp);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const emailData = Object.fromEntries(formData.entries());
    try {
      await sendOtpFn(emailData);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (response) {
      toast.success("OTP sent to your email");
      const formData = new FormData(formRef.current as HTMLFormElement);
      const email = formData.get("email");
    
    if (email) {
      navigate("/verify-otp", { state: { email } });
    }
      formRef.current?.reset();
    }
  }, [response]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 bg-cover bg-center relative px-4 py-12"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="absolute inset-0 bg-opacity-60"></div>

      <div className="relative z-10 w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-lg">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center p-6 text-white">
          <h1 className="text-4xl font-extrabold mb-2 text-center leading-tight drop-shadow-lg">
            Forgot Your Password?
          </h1>
          <p className="text-lg text-center text-white/90">
            Enter your email and we’ll send you an OTP to reset it.
          </p>
        </div>

        {/* Right Section - Card */}
        <div className="flex items-center justify-center p-6">
          <Card className="w-full max-w-sm rounded-2xl bg-white/80 border border-gray-300 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Send OTP</CardTitle>
              <p className="text-gray-500 text-sm">We’ll email you a reset code</p>
            </CardHeader>

            <CardContent>
              <form className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your registered email"
                    required
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-black hover:to-gray-800 text-white font-semibold py-2 rounded-xl transform hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  {loading ? <LoaderIcon className="animate-spin" /> : "Send OTP"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
