import { User } from "@/lib/types";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

type ActionResponse = {
  message: string;
  status: number;
};

export const createUser = async (user: User): Promise<ActionResponse> => {
  const { email, password, first_name, last_name, username } = user;

  const existedUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      username: true,
    },
  });

  if (existedUser?.email) {
    return {
      message: "Email already exists",
      status: 400,
    };
  }

  if (existedUser?.username) {
    return {
      message: "Username already exists",
      status: 400,
    };
  }

  const hashedPassword = await hash(password!, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        first_name,
        last_name,
        username,
        password: hashedPassword,
      },
    });

    return {
      message: "User created successfully",
      status: 201,
    };
  } catch (error) {
    return {
      message: "Error creating user",
      status: 500,
    };
  }
};
