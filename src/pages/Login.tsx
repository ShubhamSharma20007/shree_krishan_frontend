import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // Handle login logic here
    navigate("/admin")
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
        <Card className="mx-auto min-w-sm ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="xyz@gmail.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required placeholder="Shu******" />
          </div>
          <Button type="submit" className="w-full cursor-pointer" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}