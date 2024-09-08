import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validationschemas/blogSchema";
import BlogForm from "@/components/admin-forms/BlogForm";
const Admin = () => {
  return (
    <div className="container">
      <h1 className="text-5xl text-center">Admin Page</h1>
      <BlogForm />
    </div>
  );
};

export default Admin;
