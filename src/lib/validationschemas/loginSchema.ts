import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .regex(/[^ ]/, 'Username or Email cannot be empty').email('Invalid Email'),
  password: z.string().regex(/[^ ]/, 'Password cannot be empty'),
});

export default formSchema;
