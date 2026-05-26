"use client";
import * as z from "zod";

import { newPasswordSchema } from "@/schemas";

import { newPassword } from "@/actions/new-password";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { FormError } from "../formError/FormError";
import { FormSuccess } from "../formSuccess/FormSuccess";

const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await newPassword(values, token);
      data.error && setError(data.error);
      data.success && setSuccess(data.success);
      if (data.success) {
        redirect("/login");
      }
    });
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <h2 className="text-2xl text-center text-gray-500">Enter a new password</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-[80%]"
      >
        <div className="space-y-4 w-full">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              New password
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
          </div>
          <div>
            <label htmlFor="repeatPassword" className="text-sm font-medium text-gray-700">
              Repeat Password
            </label>
            <input
              id="repeatPassword"
              className="flex h-10 w-full rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              {...register("repeatPassword")}
              placeholder="******"
              type="password"
              disabled={isPending}
            />
            {errors.repeatPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.repeatPassword.message}</p>
            )}
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />

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
          {!isPending && "Reset password"}
        </button>
      </form>
      <Link href={"/login"} className="text-cyan-500 underline text-center my-4">
        Back to Login
      </Link>
    </div>
  );
};

export default NewPasswordForm;
