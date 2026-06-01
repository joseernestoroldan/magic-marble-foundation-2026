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
import { FormInput } from "@/components/ui/FormInput";
import { FormError } from "../FormError/FormError";
import { ResetPasswordSuccess } from "../formSuccess/ResetPasswordSuccess";
import styles from "./NewPasswordForm.module.css";

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
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Enter a new password</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <div className={styles.fieldsWrapper}>
          <FormInput
            id="password"
            label="New password"
            type="password"
            placeholder="******"
            error={errors.password?.message}
            disabled={isPending}
            registration={register("password")}
          />
          <FormInput
            id="repeatPassword"
            label="Repeat Password"
            type="password"
            placeholder="******"
            error={errors.repeatPassword?.message}
            disabled={isPending}
            registration={register("repeatPassword")}
          />
        </div>
        <FormError message={error} />
        <ResetPasswordSuccess message={success} />

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isPending}
        >
          {isPending && (
            <div className={styles.spinnerWrapper}>
              <ImSpinner9 className={styles.spinner} />
            </div>
          )}
          {!isPending && "Reset password"}
        </button>
      </form>
      <Link href={"/login"} className={styles.backLink}>
        Back to Login
      </Link>
    </div>
  );
};

export default NewPasswordForm;
