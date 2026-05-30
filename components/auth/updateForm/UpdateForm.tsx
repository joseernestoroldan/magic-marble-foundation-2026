"use client";
import * as z from "zod";

import { updateSchema } from "@/schemas";
import { codes, countries } from "@/utils/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineUnsubscribe, MdPerson, MdUnsubscribe } from "react-icons/md";

import { FormError } from "../formError/FormError";

import { update } from "@/actions/update";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import styles from "./UpdateForm.module.css";

const UpdateForm = ({ data }: any) => {
  const { id, number, codeNumber, country, subscribed, address } = data.data;

  const [open, setOpen] = useState<boolean>(false);
  const [openCode, setOpenCode] = useState<boolean>(false);
  const [codeSearch, setCodeSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [enable, setEnable] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      country: country,
      codeNumber: codeNumber,
      number: number,
      address: address,
      subscribed: subscribed,
    },
  });

  const watchedCode = watch("codeNumber");
  const watchedCountry = watch("country");

  const filteredCodes = codes.filter(
    (c) =>
      c.name.toLowerCase().includes(codeSearch.toLowerCase()) ||
      c.phoneCode.includes(codeSearch)
  );

  const filteredCountries = countries.filter((c) =>
    c.label.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const onSubmit = (values: z.infer<typeof updateSchema>) => {
    setError("");
    startTransition(async () => {
      const res = await update(values, id);
      setError(res.error);
      if (res.success) {
        router.push("/profile");
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.toggleButton} ${enable ? styles.toggleEnabled : styles.toggleDisabled}`}
        onClick={() => setEnable(!enable)}
      >
        {enable ? "Cancel" : "Edit"}
      </button>

      {!enable ? (
        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <MdPerson className={styles.personIcon} />
            <h3 className={styles.infoSubheading}>Your personal info</h3>
          </div>
          <div className={styles.infoRow}>
            <p className={styles.infoLabel}>Telephone:</p>
            <p>({codeNumber})</p>
            <p>{number}</p>
          </div>
          <div className={styles.infoRow}>
            <p className={styles.infoLabel}>Country:</p>
            <p>{country}</p>
          </div>
          <div className={styles.infoRow}>
            <p className={styles.infoLabel}>Address:</p>
            <p>{address}</p>
          </div>

          {subscribed ? (
            <div className={styles.subscribed}>
              <MdUnsubscribe />
              <p>Suscribed to Diaries</p>
            </div>
          ) : (
            <div className={styles.unsubscribed}>
              <MdOutlineUnsubscribe />
              <p>Unsuscribed to Diaries</p>
            </div>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.formFields}>
            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Code Number</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenCode(!openCode)}
                    className={styles.selectButton}
                  >
                    {watchedCode
                      ? codes.find((c) => c.phoneCode === watchedCode)?.phoneCode
                      : codeNumber}
                    <FaSearch className={styles.searchIcon} />
                  </button>
                  {openCode && (
                    <div className={styles.dropdown}>
                      <input
                        className={styles.dropdownSearch}
                        placeholder="Search Code"
                        value={codeSearch}
                        onChange={(e) => setCodeSearch(e.target.value)}
                      />
                      <ul className={styles.dropdownList}>
                        {filteredCodes.length === 0 ? (
                          <li className={styles.dropdownEmpty}>No Code found.</li>
                        ) : (
                          filteredCodes.map((c) => (
                            <li
                              key={c.name}
                              className={styles.dropdownItem}
                              onClick={() => {
                                setValue("codeNumber", c.phoneCode);
                                setOpenCode(false);
                                setCodeSearch("");
                              }}
                            >
                              <span>{c.name}</span>
                              <span>{c.phoneCode}</span>
                              {c.phoneCode === watchedCode && (
                                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {errors.codeNumber && (
                  <p className={styles.fieldError}>{errors.codeNumber.message}</p>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="number" className={styles.label}>Telephone Number</label>
                <input
                  id="number"
                  className={styles.input}
                  {...register("number")}
                  placeholder={number}
                  type="tel"
                  disabled={isPending}
                />
                {errors.number && (
                  <p className={styles.fieldError}>{errors.number.message}</p>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Country</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={styles.selectButton}
                  >
                    {watchedCountry
                      ? countries.find((c) => c.value === watchedCountry)?.label
                      : country}
                    <FaSearch className={styles.searchIcon} />
                  </button>
                  {open && (
                    <div className={styles.dropdown}>
                      <input
                        className={styles.dropdownSearch}
                        placeholder="Search Country"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                      />
                      <ul className={styles.dropdownList}>
                        {filteredCountries.length === 0 ? (
                          <li className={styles.dropdownEmpty}>No Country found.</li>
                        ) : (
                          filteredCountries.map((c) => (
                            <li
                              key={c.value}
                              className={styles.dropdownItem}
                              onClick={() => {
                                setValue("country", c.value);
                                setOpen(false);
                                setCountrySearch("");
                              }}
                            >
                              <span>{c.label}</span>
                              {c.value === watchedCountry && (
                                <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {errors.country && (
                  <p className={styles.fieldError}>{errors.country.message}</p>
                )}
              </div>

              <div className={styles.checkboxWrapper}>
                <input
                  id="subscribed"
                  type="checkbox"
                  className={styles.checkbox}
                  {...register("subscribed")}
                />
                <label htmlFor="subscribed" className={styles.checkboxLabel}>
                  Suscribe to our Newsletter
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="address" className={styles.label}>Shipping Address</label>
              <input
                id="address"
                className={styles.input}
                {...register("address")}
                placeholder={address}
                type="text"
                aria-multiline
                disabled={isPending}
              />
              {errors.address && (
                <p className={styles.fieldError}>{errors.address.message}</p>
              )}
            </div>
          </div>
          <FormError message={error} />

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <div className={styles.spinnerWrapper}>
                <svg
                  className={styles.spinner}
                  viewBox="0 0 24 24"
                >
                  <ImSpinner9 />
                </svg>
              </div>
            ) : (
              "Update"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateForm;
