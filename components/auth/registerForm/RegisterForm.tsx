"use client";
import * as z from "zod";

import { registerSchema } from "@/schemas";
import { codes, countries } from "@/utils/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { register as registerAction } from "@/actions/register";
import { FormError } from "../formError/FormError";
import { FormSuccess } from "../formSuccess/FormSuccess";

import { FaSearch } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

const RegisterForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openCode, setOpenCode] = useState<boolean>(false);
  const [codeSearch, setCodeSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      secondName: "",
      country: "",
      codeNumber: "",
      number: "",
      address: "",
      subscribed: false,
    },
  });

  const watchedCode = watch("codeNumber");
  const watchedCountry = watch("country");

  const filteredCodes = codes.filter(
    (code) =>
      code.name.toLowerCase().includes(codeSearch.toLowerCase()) ||
      code.phoneCode.includes(codeSearch)
  );

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const data = await registerAction(values);
      setError(data.error);
      setSuccess(data.success);
    });
  };

  if (success) {
    return <FormSuccess message={success} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[90%]">
      <div className="space-y-2 w-full">
        <div className="w-full flex flex-col justify-center sm:justify-between sm:flex-row">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              className="flex h-10 w-full sm:w-[200px] md:w-[220px] rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              {...register("firstName")}
              placeholder="First Name"
              type="text"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="secondName" className="text-sm font-medium text-gray-700">
              Second Name
            </label>
            <input
              id="secondName"
              className="flex h-10 w-full sm:w-[200px] md:w-[220px] rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              {...register("secondName")}
              placeholder="Second Name"
              type="text"
            />
            {errors.secondName && (
              <p className="text-sm text-red-500 mt-1">{errors.secondName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            className="flex h-10 w-full rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            {...register("email")}
            placeholder="magicmarble@example.com"
            type="email"
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col justify-center sm:justify-between sm:flex-row">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              className="flex h-10 w-full sm:w-[200px] md:w-[220px] rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
              className="flex h-10 w-full sm:w-[200px] md:w-[220px] rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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

        <div className="w-full flex flex-col justify-center sm:justify-between sm:flex-row items-start sm:items-end">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Code Number</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenCode(!openCode)}
                className="flex w-[200px] items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500"
              >
                {watchedCode
                  ? codes.find((code) => code.phoneCode === watchedCode)?.phoneCode
                  : "Select Code"}
                <FaSearch className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </button>
              {openCode && (
                <div className="absolute z-10 mt-1 w-[200px] rounded-md border border-gray-200 bg-white shadow-lg">
                  <input
                    className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none"
                    placeholder="Search Code"
                    value={codeSearch}
                    onChange={(e) => setCodeSearch(e.target.value)}
                  />
                  <ul className="max-h-48 overflow-auto">
                    {filteredCodes.length === 0 ? (
                      <li className="px-3 py-2 text-sm text-gray-500">No Code found.</li>
                    ) : (
                      filteredCodes.map((code) => (
                        <li
                          key={code.name}
                          className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-cyan-500"
                          onClick={() => {
                            setValue("codeNumber", code.phoneCode);
                            setOpenCode(false);
                            setCodeSearch("");
                          }}
                        >
                          <span>{code.name}</span>
                          <span>{code.phoneCode}</span>
                          {code.phoneCode === watchedCode && (
                            <svg className="ml-auto h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <p className="text-sm text-red-500 mt-1">{errors.codeNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="number" className="text-sm font-medium text-gray-700">
              Telephone Number
            </label>
            <input
              id="number"
              className="flex h-10 w-[200px] rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              {...register("number")}
              placeholder="Telephone Number"
              type="tel"
              disabled={isPending}
            />
            {errors.number && (
              <p className="text-sm text-red-500 mt-1">{errors.number.message}</p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col justify-center sm:justify-between sm:flex-row items-start sm:items-end">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Country</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-[200px] items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500"
              >
                {watchedCountry
                  ? countries.find((country) => country.value === watchedCountry)?.label
                  : "Select Country"}
                <FaSearch className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </button>
              {open && (
                <div className="absolute z-10 mt-1 w-[200px] rounded-md border border-gray-200 bg-white shadow-lg">
                  <input
                    className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none"
                    placeholder="Search Country"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                  />
                  <ul className="max-h-48 overflow-auto">
                    {filteredCountries.length === 0 ? (
                      <li className="px-3 py-2 text-sm text-gray-500">No Country found.</li>
                    ) : (
                      filteredCountries.map((country) => (
                        <li
                          key={country.value}
                          className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-cyan-500"
                          onClick={() => {
                            setValue("country", country.value);
                            setOpen(false);
                            setCountrySearch("");
                          }}
                        >
                          <span>{country.label}</span>
                          {country.value === watchedCountry && (
                            <svg className="ml-auto h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
            )}
          </div>

          <div className="flex flex-row items-end space-x-2 pb-1">
            <input
              id="subscribed"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
              {...register("subscribed")}
            />
            <label htmlFor="subscribed" className="text-sm font-medium text-gray-700">
              Subscribe to our Magic Diaries
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-medium text-gray-700">
            Shipping Address
          </label>
          <input
            id="address"
            className="flex h-10 w-full rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            {...register("address")}
            placeholder="Shipping Address"
            type="text"
            aria-multiline
            disabled={isPending}
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
          )}
        </div>
      </div>

      <FormError message={error} />

      <button
        className="bg-cyan-500 hover:bg-opacity-80 text-white w-full py-3 rounded-full"
        type="submit"
        disabled={isPending}
      >
        {isPending && (
          <div className="w-full flex justify-center items-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <ImSpinner9 className="text-2xl" />
            </svg>
          </div>
        )}
        {!isPending && "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
