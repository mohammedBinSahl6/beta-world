"use client";

import React, { useState } from "react";
import { z } from "zod";
import Link from "next/link";

import RegisterForm from "./RegisterForm";
import { createUser } from "@/app/actions/createUser";
import { toast } from "@/components/ui/use-toast";

import formSchema from "@/lib/validationschemas/registerSchema";
import { useRouter } from "next/navigation";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password, first_name, last_name, username } = values;
    const userResponse = await createUser({
      email,
      password,
      first_name,
      last_name,
      username,
    });

    if (userResponse.status === 201) {
      toast({
        title: "success",
        description: userResponse.message,
        className: "bg-green-400",
      });
      router.push("/login");
    } else {
      toast({
        title: "Error creating user",
        description: userResponse.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  return (
    <div className="flex h-lvh items-center gap-10 bg-teal-950 text-white flex-col p-10 animate-fade-in">
      <h1 className="text-4xl font-bold">Welcome to Beta World</h1>
      <p className="text-xl">Register to your account</p>
      <RegisterForm onSubmit={handleSubmit} isLoading={loading} />
      <Link
        href="/login"
        className="text-lg hover:underline flex gap-4 items-center text-white rounded-xl p-4"
      >
        Login if you already have an account
      </Link>
    </div>
  );
};

export default Register;
