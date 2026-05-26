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
import { FormInput } from "@/components/ui/FormInput";

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
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="magicmarble@example.com"
          error={errors.email?.message}
          disabled={isPending}
          registration={register("email")}
        />

        <div>
          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="******"
            error={errors.password?.message}
            disabled={isPending}
            registration={register("password")}
          />
          <Link
            className="text-cyan-600 underline text-sm inline-block mt-1"
            href={"/reset"}
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <FormError message={error} />
      <FormConfirmation message={confirmation} />
      <button
        className="bg-cyan-600 hover:bg-cyan-600 text-white w-full py-3 rounded-[5px] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <div className="w-full flex justify-center items-center">
            <ImSpinner9 className="animate-spin h-5 w-5 mr-3 text-white" />
          </div>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
