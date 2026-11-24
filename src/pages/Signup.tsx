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
import { notifyError } from "@/lib/toast";
import { signupSchema } from "@/schemas/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = signupSchema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      notifyError(result.error.issues[0].message);
      return;
    }
    try {
      const payload = await register({
        email: result.data.email,
        password: result.data.password,
      });
      if (payload) {
        navigate("/", { replace: true, state: { registrationSuccess: true } });
      } else {
        notifyError("Sign up failed");
      }
    } catch (error) {
      console.error(error);
      notifyError("Sign up failed");
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src="/bloomora03.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <Card className="absolute z-10 top-1/2 right-[12%] -translate-y-1/2 w-full py-14 px-6 max-w-lg bg-white/50 backdrop-blur-sm [--card-spacing:--spacing(14)]">
        <CardHeader className="text-primary">
          <CardTitle className="text-2xl font-bold">Welcome,</CardTitle>
          <CardTitle className="text-3xl font-bold">New User</CardTitle>
          <CardDescription className="text-black">
            Enter your information below to sign up to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link to="/">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent>
            <FieldSet className="w-full max-w-xs">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    className="placeholder:text-black"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FieldDescription className="text-black">
                    Enter your email to sign up to your account.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldDescription className="text-black">
                    Must be at least 8 characters long.
                  </FieldDescription>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="placeholder:text-black"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <FieldDescription className="text-black">
                    Confirm your password to ensure you have entered it
                    correctly.
                  </FieldDescription>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="placeholder:text-black"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
          <CardFooter className="flex-col mt-6 gap-4 bg-transparent">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
