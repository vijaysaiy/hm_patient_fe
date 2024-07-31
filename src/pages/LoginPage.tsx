import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserDetails, login } from "@/https/auth-service";
import { setUser } from "@/state/userReducer";
import { IloginForm } from "@/types";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
const emailOrPhoneSchema = z.string().refine(
  (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  },
  {
    message: "Must be a valid email address or a 10-digit phone number",
  }
);

const loginSchema = z.object({
  userName: emailOrPhoneSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IloginForm>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IloginForm> = async (data: IloginForm) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const userNameType = emailRegex.test(data.userName)
        ? "EMAIL"
        : "PHONE_NUMBER";

      const payload = {
        ...data,
        userNameType,
      };
      const response = await login(payload);

      const detailsRes = await getUserDetails();
      dispatch(setUser(detailsRes.data.data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email or mobile number below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="emailOrPhone">Email / Mobile</Label>
              <Input
                id="userName"
                type="text"
                placeholder="m@example.com / 9898989898"
                {...register("userName")}
                className="border-2 rounded-sm p-2"
                required
              />
              {errors.userName && (
                <span className="text-red-500">
                  {errors.userName.message as string}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="border-2 rounded-sm p-2"
                required
              />
              {errors.password && (
                <span className="text-red-500">
                  {errors.password.message as string}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default LoginForm;
