"use client";
import * as z from "zod";

import { resetSchema } from "@/schemas";

import { reset } from "@/actions/reset";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { FormError } from "../formError/FormError";
import { FormSuccess } from "../formSuccess/FormSuccess";

const ResetForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (value: z.infer<typeof resetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await reset(value);
      data.error && setError(data.error);
      data.success && setSuccess(data.success);
      if (data.success) {
        // redirect("/settings");
        //todo what should be done
      }
    });
  };

  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center space-y-8">
      <h2 className="text-2xl text-center font-medium text-gray-500">
        Reset Password
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 w-[80%]"
      >
        <div className="space-y-4 w-full">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              className="flex h-10 w-full rounded-[5px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              {...register("email")}
              placeholder="magicmarble@example.com"
              type="email"
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
        <FormError message={error} />

        <button
          className="bg-cyan-600 hover:bg-opacity-80 text-white w-full py-2 rounded-[5px] text-lg"
          type="submit"
          disabled={isPending}
        >
          {isPending && (
            <div className="w-full flex justify-center items-center text-lg">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <ImSpinner9 className="text-2xl" />
              </svg>
            </div>
          )}
          {!isPending && !success && "Send reset email"}
          {!isPending && success && "Resend reset email"}
        </button>
        <FormSuccess message={success} />
      </form>
    </div>
  );
};

export default ResetForm;
