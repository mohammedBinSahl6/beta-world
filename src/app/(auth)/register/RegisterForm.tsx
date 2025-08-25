import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import formSchema from "@/lib/validationschemas/registerSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

type Props = {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isLoading?: boolean;
};

const RegisterForm = (props: Props) => {
  const { onSubmit, isLoading } = props;

  const registerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { watch } = registerForm;
  const email = watch("email");
  const password = watch("password");

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="space-y-4  text-black bg-white p-8  rounded-4xl flex flex-col items-center lg:w-1/3  "
      >
        <p className="text-xl self-center text-center">Create your account</p>

        <div className="flex items-center w-fit justify-center gap-x-2  ">
          <FormField
            control={registerForm.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="flex flex-col basis-28 gap-y-1 items-center ">
                <FormControl>
                  <Input
                    placeholder="F Name"
                    {...field}
                    className="text-base shadow-sm shadow-black p-2 "
                  />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="flex flex-col  items-center  basis-28 ">
                <FormControl>
                  <Input
                    placeholder="L Name"
                    {...field}
                    className="text-base shadow-sm shadow-black w-full gap-y-4 "
                  />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={registerForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="text-base shadow-sm shadow-black  w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="E-Mail"
                  {...field}
                  className="text-base shadow-sm shadow-black w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Passwort"
                  type="password"
                  {...field}
                  className="text-base text-black shadow-sm shadow-black w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!email || !password}
          loading={isLoading}
          variant={"default"}
          className="bg-black text-white self-center rounded-lg"
        >
          Create Account
        </Button>
        <Link
          href="/login"
          className=" text-sm hover:underline flex gap-4 items-center text-black rounded-xl p-4 self-center text-center font-bold"
        >
          Login if you already have an account
        </Link>
      </form>
    </Form>
  );
};

export default RegisterForm;
