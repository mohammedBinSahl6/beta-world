import { use } from "react";
import { z } from "zod";

const formSchema = z.object({
  first_name: z.string().regex(/[^ ]/, "First Name cannot be empty"),
  last_name: z.string().regex(/[^ ]/, "Last Name cannot be empty"),
  username: z.string().regex(/[^ ]/, "Username or Email cannot be empty"),
  email: z
    .string()
    .regex(/[^ ]/, "Email cannot be empty")
    .email("Invalid Email"),
  password: z.string().regex(/[^ ]/, "Password cannot be empty"),
});

export default formSchema;
