"use client";

import React, { useState } from "react";
import { z } from "zod";

import Logo from "@/components/logo/Logo";
import LoginForm from "./LoginForm";

import formSchema from "@/lib/validationschemas/loginSchema";
import Link from "next/link";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };
  return (
    <div className="flex h-lvh items-center gap-10 container flex-col md:w-1/2">
      <Logo />
      <h1 className="text-4xl font-bold">Hello again in Beta World</h1>
      <p className="text-xl">Login to your account</p>
      <LoginForm onSubmit={handleSubmit} isLoading={loading} />
      <Link
        href="/register"
        className="text-lg hover:underline flex gap-4 items-center text-green-800 rounded-xl p-4"
      >
        Register if you do not have an account
      </Link>
    </div>
  );
};

export default Login;
