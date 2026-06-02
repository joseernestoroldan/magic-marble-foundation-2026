"use client";

import { subscribeAgain, unsubscribe } from "@/actions/unsubscribe";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { FormError } from "../auth/FormError/FormError";
import { ResetPasswordSuccess } from "../auth/formSuccess/ResetPasswordSuccess";
import styles from "./UnsubscribeForm.module.css";

const UnsubscribeForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const SearchParams = useSearchParams();
    const email= SearchParams.get("email");

    const onSubmit = useCallback(() => {
        if (!email) {
          setError("Missing email");
          return;
        }
        unsubscribe(email)
          .then((data) => {
            setSuccess(data.success);
            setError(data.error);
          })
          .catch((err) => {
            setError("Something went wrong!");
          });
      }, [email]);

      const handleClick = useCallback(() => {
        if (!email) {
          setError("Missing email");
          return;
        }
        subscribeAgain(email)
          .then((data) => {
            setSuccess(data.success);
            setError(data.error);
          })
          .catch((err) => {
            setError("Something went wrong!");
          });
      }, [email]);

    useEffect(() => {
        onSubmit();
      }, [onSubmit]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <Image src={"/logos/logo.jpg"} fill alt="mmf" />
        </div>
        <h2 className={styles.heading}>
          {!success && "Unsubscribing to Diaries..." }
          {success && success === "Email unsubscribed" && "Email Unsubscribed" }
          {success && success !== "Email unsubscribed" && "Email Subscribed Again"}
        </h2>
        {!success && !error && <Loader variant="inline" />}

        <ResetPasswordSuccess message={success} />
        <FormError message={error} /> 
        {success && success === "Email unsubscribed" && <button onClick={handleClick} className={styles.subscribeBtn}>Subscribe Again</button>}
        {success && success !== "Email unsubscribed" && <Link className={styles.profileLink} href={"/profile"}>Go to Profile</Link>}
      </div>
    </div>
  );
};

export default UnsubscribeForm;
