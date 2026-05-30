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
import styles from "./resetForm.module.css";

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
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Reset Password
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <div className={styles.fieldsWrapper}>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              className={styles.input}
              {...register("email")}
              placeholder="magicmarble@example.com"
              type="email"
              disabled={isPending}
            />
            {errors.email && (
              <p className={styles.fieldError}>{errors.email.message}</p>
            )}
          </div>
        </div>
        <FormError message={error} />

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
          {!isPending && !success && "Send reset email"}
          {!isPending && success && "Resend reset email"}
        </button>
        <FormSuccess message={success} />
      </form>
    </div>
  );
};

export default ResetForm;
