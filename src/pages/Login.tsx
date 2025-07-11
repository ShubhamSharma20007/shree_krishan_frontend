import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useFetch } from "@/hooks/useFetch";
import LoginServiceInstance from '../../service/login.service';
import toast from "react-hot-toast";
import BG from "@/assets/banner1.webp"
import Cookies from 'js-cookie';
import { LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const { fn: userLoginFn, data: loginRes, loading } = useFetch(LoginServiceInstance.userLogin);
  const formRef = useRef<HTMLFormElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      await userLoginFn(data);
    } catch (error) {
      console.log("Error during creating brand:", error);
    }
  };

  useEffect(() => {
    if (loginRes) {
      console.log(loginRes)
      Cookies.set('token', loginRes.token, { sameSite: 'None', secure: true }); 
      toast.success("Login successfully");
      if(loginRes?.token){
        navigate("/admin/dashboard");
      }
      formRef.current?.reset();
    }
  }, [loginRes]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 bg-cover bg-center relative px-4 py-12"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="absolute inset-0 bg-opacity-60"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-lg">

        {/* Left Section */}
        <div className="flex flex-col justify-center items-center p-6 text-white">
          <h1 className="text-4xl font-extrabold mb-2 text-center leading-tight drop-shadow-lg">Welcome to <br />Admin Dashboard</h1>
          <p className="text-lg mb-4 text-center text-white/90">Easily manage stock, monitor inventory, and access reports with a modern interface.</p>
          <Button onClick={()=>navigate("/")} className="cursor-pointer bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white font-semibold rounded-xl transform hover:scale-105 transition-transform duration-300 shadow-lg">
            Explore More
          </Button>

        </div>

        {/* Right Section - Login Card */}
        <div className="flex items-center justify-center p-6">
          <Card className="w-full max-w-sm rounded-2xl bg-white/80 border border-gray-300 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">Admin Login</CardTitle>
              <p className="text-gray-500 text-sm">Please sign in to continue</p>
            </CardHeader>

            <CardContent>
              <form className="space-y-6" ref={formRef} onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter you email address here"
                    required
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password here"
                    required
                    className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="text-right text-sm">
                  <Link to={'/forgot-password'} className="text-indigo-600 hover:underline">Forgot password?</Link>
                </div>

                <Button
                disabled={loading}
                type="submit"
                className="cursor-pointer w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-black hover:to-gray-800 text-white font-semibold py-2 rounded-xl transform hover:scale-105 transition-transform duration-300 shadow-lg"
              >
               {
                loading ?  <LoaderIcon className="animate-spin"/> : "Login"
               }
              </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


