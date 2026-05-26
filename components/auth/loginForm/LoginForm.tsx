"use client";
import * as z from "zod";

import { loginSchema } from "@/schemas";

import { login } from "@/actions/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { FormConfirmation } from "../formConfirmation/FormConfirmation";
import { FormError } from "../formError/FormError";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [confirmation, setConfirmation] = useState<string | undefined>("");

  const router = useRouter()

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setConfirmation("");
    startTransition(async () => {
      const data = await login(values);
      data.error && setError(data.error);
      data.confirmation && setConfirmation(data.confirmation);
      if (data.success) {
        router.push("/profile");
        router.refresh()
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" space-y-4 w-[80%]"
    >
      <div className="space-y-4 w-full">
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            className="flex h-10 w-full rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            {...register("email")}
            placeholder="magicmarble@example.com"
            type="email"
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            className="flex h-10 w-full rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            {...register("password")}
            placeholder="******"
            type="password"
            disabled={isPending}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
          <Link
            className="text-cyan-500 underline text-sm inline-block mt-1"
            href={"/reset"}
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <FormError message={error} />
      <FormConfirmation message={confirmation} />
      <button
        className="bg-cyan-500 hover:bg-opacity-80 text-white w-full py-3 rounded-full"
        type="submit"
        disabled={isPending}
      >
        {isPending && (
          <div className="w-full flex justify-center items-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              viewBox="0 0 24 24"
            >
              <ImSpinner9 className="text-2xl" />
            </svg>
          </div>
        )}
        {!isPending && "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
