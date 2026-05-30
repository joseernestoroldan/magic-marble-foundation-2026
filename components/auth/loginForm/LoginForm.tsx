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
import styles from "./LoginForm.module.css";

const forgotPasswordLink = (
  <Link className={styles.forgotLink} href={"/reset"}>
    Forgot password?
  </Link>
);

const submitLabel = "Login";

const spinnerContent = (
  <div className={styles.spinnerWrapper}>
    <ImSpinner9 className={styles.spinner} />
  </div>
);

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
      className={styles.form}
    >
      <div className={styles.fieldsWrapper}>
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
          {forgotPasswordLink}
        </div>
      </div>
      <FormError message={error} />
      <FormConfirmation message={confirmation} />
      <button
        className={styles.submitButton}
        type="submit"
        disabled={isPending}
      >
        {isPending ? spinnerContent : submitLabel}
      </button>
    </form>
  );
};

export default LoginForm;
