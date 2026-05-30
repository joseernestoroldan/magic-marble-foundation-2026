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
          <div>
            <label htmlFor="password" className={styles.label}>
              New password
            </label>
            <input
              id="password"
              className={styles.input}
              {...register("password")}
              placeholder="******"
              type="password"
              disabled={isPending}
            />
            {errors.password && (
              <p className={styles.fieldError}>{errors.password.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="repeatPassword" className={styles.label}>
              Repeat Password
            </label>
            <input
              id="repeatPassword"
              className={styles.input}
              {...register("repeatPassword")}
              placeholder="******"
              type="password"
              disabled={isPending}
            />
            {errors.repeatPassword && (
              <p className={styles.fieldError}>{errors.repeatPassword.message}</p>
            )}
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isPending}
        >
          {isPending && (
            <div className={styles.spinnerWrapper}>
              <svg
                className={styles.spinner}
                viewBox="0 0 24 24"
              >
                <ImSpinner9 />
              </svg>
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
