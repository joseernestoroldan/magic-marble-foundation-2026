"use client";

import { NewVerification } from "@/actions/new-verification";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { FormError } from "../auth/formError/FormError";
import { FormExpired } from "../auth/formExpired/FormExpired";
import { FormSuccess } from "../auth/formSuccess/FormSuccess";
import styles from "./VerificationForm.module.css";

const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [expired, setExpired] = useState<string | undefined>();
  const SearchParams = useSearchParams();
  const token = SearchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token");
      return;
    }
    NewVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
        setExpired(data.expired);
      })
      .catch((err) => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <Image src={"/logo.jpg"} fill alt="mmf" />
        </div>
        <h2 className={styles.heading}>
          {!success? "Confirming your verification..." : "Account verified!"}
          
          
        </h2>
        {!success && !error && !expired && <Loader variant="inline" />}

        <FormSuccess message={success} />
        <FormError message={error} />
        <FormExpired message={expired}/>
        {success && <p className={styles.signInText}>Please  <Link className={styles.signInLink} href={"/login"}>Sign In</Link> </p>}
      </div>
    </div>
  );
};

export default VerificationForm;
