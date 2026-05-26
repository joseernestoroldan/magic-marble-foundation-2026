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
    <div className="flex flex-col space-y-8">
      <button
        className="w-[100px] border border-cyan-500 text-cyan-500 rounded-full py-2"
        onClick={() => setEnable(!enable)}
      >
        {enable ? "Cancel" : "Edit"}
      </button>

      {!enable && (
        <div className="space-y-4 w-[420px] max-w-5xl mx-auto text-cyan-500 border border-cyan-500 rounded-[20px] px-4 py-8">
          <div className="w-full flex flex-col text-2xl font-medium text-gray-500 items-center justify-center">
            <MdPerson />
            <h3 className="text-xl text-gray-500">Your personal info</h3>
          </div>
          <div className="w-full flex gap-x-1">
            <p className="font-medium">Telephone:</p>
            <p>({codeNumber})</p>
            <p>{number}</p>
          </div>
          <div className="w-full flex gap-x-1">
            <p className="font-medium">Country:</p>
            <p>{country}</p>
          </div>
          <div className="w-full flex gap-x-1">
            <p className="font-medium">Address:</p>
            <p>{address}</p>
          </div>

          {subscribed && (
            <div className="w-full flex gap-x-1 items-center font-medium">
              <MdUnsubscribe />
              <p>Suscribed to Diaries</p>
            </div>
          )}

          {!subscribed && (
            <div className="w-full flex gap-x-1 items-center font-medium">
              <MdOutlineUnsubscribe />
              <p>Unsuscribed to Diaries</p>
            </div>
          )}
        </div>
      )}

      {enable && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-[420px] max-w-5xl mx-auto text-gray-500"
        >
          <div className="space-y-2 w-full">
            <div className="w-full flex justify-between items-end">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Code Number</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenCode(!openCode)}
                    className="flex w-[200px] items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500"
                  >
                    {watchedCode
                      ? codes.find((c) => c.phoneCode === watchedCode)?.phoneCode
                      : codeNumber}
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
                          filteredCodes.map((c) => (
                            <li
                              key={c.name}
                              className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-cyan-500"
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

              <div>
                <label htmlFor="number" className="text-sm font-medium text-gray-700">Telephone Number</label>
                <input
                  id="number"
                  className="flex h-10 w-[200px] rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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

            <div className="w-full flex justify-between">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Country</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex w-[200px] items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500"
                  >
                    {watchedCountry
                      ? countries.find((c) => c.value === watchedCountry)?.label
                      : country}
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
                          filteredCountries.map((c) => (
                            <li
                              key={c.value}
                              className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-cyan-500"
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
                  className="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
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
                className="flex h-10 w-full rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
            className="bg-cyan-500 hover:bg-opacity-80 text-white w-full py-3 rounded-full"
            type="submit"
            disabled={isPending}
          >
            {isPending && (
              <div className="w-full flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <ImSpinner9 className="text-2xl" />
                </svg>
              </div>
            )}
            {!isPending && "Update"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateForm;
