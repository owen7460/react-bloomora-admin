import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "@/apis/auth";
import { notifySuccess } from "@/lib/toast";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = await login({ email, password });
      localStorage.setItem("token", payload.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.state?.registrationSuccess) {
      notifySuccess("Sign up successful, please login to your account");
      setSuccessMessage(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state?.registrationSuccess]);

  return (
    <div className="flex justify-center items-center h-screen bg-[url(/bg.jpg)] bg-cover bg-center">
      <Card className="w-full py-14 px-6 max-w-md bg-white/80 backdrop-blur-sm [--card-spacing:--spacing(8)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome back,</CardTitle>
          <CardTitle className="text-3xl font-bold">Bloomora Admin</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>{" "}
        <form onSubmit={handleLogin}>
          <CardContent>
            {successMessage && (
              <div className="flex flex-col gap-2 mb-6  ">
                <p className="text-base text-green-700">
                  Sign up successful, now you can login
                </p>
              </div>
            )}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col mt-6 gap-4 bg-transparent">
            <Button type="submit" className="w-full ">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
