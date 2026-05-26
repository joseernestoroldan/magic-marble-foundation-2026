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
    <div className="flex flex-col space-y-6 w-full">
      <button
        className={`w-28 border rounded-[5px] py-2 text-sm font-medium transition-all duration-200 ${
          enable
            ? "border-red-400 text-red-400 hover:bg-red-50"
            : "border-cyan-600 text-cyan-600 hover:bg-cyan-50"
        }`}
        onClick={() => setEnable(!enable)}
      >
        {enable ? "Cancel" : "Edit"}
      </button>

      {!enable ? (
        <div className="space-y-4 w-full max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-[5px] px-6 py-8">
          <div className="w-full flex flex-col text-2xl font-medium items-center justify-center">
            <MdPerson className="text-cyan-600" />
            <h3 className="text-lg text-gray-600 mt-1">Your personal info</h3>
          </div>
          <div className="w-full flex gap-x-1 text-gray-600">
            <p className="font-medium">Telephone:</p>
            <p>({codeNumber})</p>
            <p>{number}</p>
          </div>
          <div className="w-full flex gap-x-1 text-gray-600">
            <p className="font-medium">Country:</p>
            <p>{country}</p>
          </div>
          <div className="w-full flex gap-x-1 text-gray-600">
            <p className="font-medium">Address:</p>
            <p>{address}</p>
          </div>

          {subscribed ? (
            <div className="w-full flex gap-x-1 items-center font-medium text-cyan-600">
              <MdUnsubscribe />
              <p>Suscribed to Diaries</p>
            </div>
          ) : (
            <div className="w-full flex gap-x-1 items-center font-medium text-gray-400">
              <MdOutlineUnsubscribe />
              <p>Unsuscribed to Diaries</p>
            </div>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md mx-auto text-gray-500"
        >
          <div className="space-y-4 w-full">
            <div className="w-full flex flex-col sm:flex-row sm:gap-4 gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-sm font-medium text-gray-700">Code Number</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenCode(!openCode)}
                    className="flex w-full sm:w-48 items-center justify-between rounded-[5px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500"
                  >
                    {watchedCode
                      ? codes.find((c) => c.phoneCode === watchedCode)?.phoneCode
                      : codeNumber}
                    <FaSearch className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </button>
                  {openCode && (
                    <div className="absolute z-10 mt-1 w-full sm:w-48 rounded-[5px] border border-gray-200 bg-white shadow-md">
                      <input
                        className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none rounded-t-[5px]"
                        placeholder="Search Code"
                        value={codeSearch}
                        onChange={(e) => setCodeSearch(e.target.value)}
                      />
                      <ul className="max-h-48 overflow-auto">
                        {filteredCodes.length === 0 ? (
                          <li className="px-3 py-2 text-sm text-gray-500">No Code found.</li>
                        ) : (
                          filteredCodes.map((c) => (
                            <li
                              key={c.name}
                              className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
                              onClick={() => {
                                setValue("codeNumber", c.phoneCode);
                                setOpenCode(false);
                                setCodeSearch("");
                              }}
                            >
                              <span>{c.name}</span>
                              <span>{c.phoneCode}</span>
                              {c.phoneCode === watchedCode && (
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

              <div className="flex flex-col flex-1">
                <label htmlFor="number" className="text-sm font-medium text-gray-700">Telephone Number</label>
                <input
                  id="number"
                  className="flex h-10 w-full sm:w-48 rounded-[5px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("number")}
                  placeholder={number}
                  type="tel"
                  disabled={isPending}
                />
                {errors.number && (
                  <p className="text-sm text-red-500 mt-1">{errors.number.message}</p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row sm:gap-4 gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-sm font-medium text-gray-700">Country</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex w-full sm:w-48 items-center justify-between rounded-[5px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500"
                  >
                    {watchedCountry
                      ? countries.find((c) => c.value === watchedCountry)?.label
                      : country}
                    <FaSearch className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </button>
                  {open && (
                    <div className="absolute z-10 mt-1 w-full sm:w-48 rounded-[5px] border border-gray-200 bg-white shadow-md">
                      <input
                        className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none rounded-t-[5px]"
                        placeholder="Search Country"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                      />
                      <ul className="max-h-48 overflow-auto">
                        {filteredCountries.length === 0 ? (
                          <li className="px-3 py-2 text-sm text-gray-500">No Country found.</li>
                        ) : (
                          filteredCountries.map((c) => (
                            <li
                              key={c.value}
                              className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
                              onClick={() => {
                                setValue("country", c.value);
                                setOpen(false);
                                setCountrySearch("");
                              }}
                            >
                              <span>{c.label}</span>
                              {c.value === watchedCountry && (
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
                  className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
                  {...register("subscribed")}
                />
                <label htmlFor="subscribed" className="text-sm font-medium text-gray-700">
                  Suscribe to our Newsletter
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="text-sm font-medium text-gray-700">Shipping Address</label>
              <input
                id="address"
                className="flex h-10 w-full rounded-[5px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                {...register("address")}
                placeholder={address}
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
            className="bg-cyan-600 hover:bg-cyan-600 text-white w-full py-3 rounded-[5px] transition-all duration-200 disabled:opacity-60"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <div className="w-full flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <ImSpinner9 className="text-2xl" />
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
