"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { login } from "@/services/login";

export interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setApiError("");
    setLoading(true);

    try {
      console.log("Form Data:", data);
      const user = await login(data.email, data.password);
      if (user?.token) {
        localStorage.setItem("token", user.token);
        router.push("/vehicles");
      }
    } catch (err: any) {
      console.error("Error:", err?.message);
      setApiError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        {apiError && <div className="text-red-500 text-center mb-4">{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="email"
            label="Email address"
            register={register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />
          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            register={register("password", { required: "Password is required" })}
            error={errors.password?.message}
            icon={
              <div onClick={togglePasswordVisibility} className="cursor-pointer">
                {showPassword ? (
                  <GoEyeClosed className="h-5 w-5 text-gray-500" />
                ) : (
                  <GoEye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            }
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
