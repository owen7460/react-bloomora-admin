import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/apis/auth";
import { notifySuccess, notifyError } from "@/lib/toast";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (email === "") {
      notifyError("Email is required");
      return;
    }
    if (password === "") {
      notifyError("Password is required");
      return;
    }
    if (confirmPassword === "") {
      notifyError("Confirm password is required");
      return;
    }
    if (password !== confirmPassword) {
      notifyError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      notifyError("Password must be at least 8 characters");
      return;
    }
    try {
      const payload = await register({ email, password });
      if (payload) {
        notifySuccess("Sign up successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        notifyError("Sign up failed");
      }
    } catch (error) {
      console.error(error);
      notifyError("Sign up failed");
    }
  };

  return (
    <div className="flex bg-[url(/bg.jpg)] bg-cover bg-center justify-center items-center h-screen">
      <Card className="w-full py-14 px-6 max-w-md bg-white/80 backdrop-blur-sm [--card-spacing:--spacing(8)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome,</CardTitle>
          <CardTitle className="text-3xl font-bold">New User</CardTitle>
          <CardDescription>
            Enter your information below to sign up to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link to="/">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <FieldSet className="w-full max-w-xs">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FieldDescription>
                    Enter your email to sign up to your account.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <FieldDescription>
                    Confirm your password to ensure you have entered it
                    correctly.
                  </FieldDescription>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter className="flex-col mb-6 gap-4 bg-transparent">
          <Button type="submit" className="w-full" onClick={handleSignup}>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
