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
import { FormInput } from "@/components/ui/FormInput";
import { FormSearchableSelect } from "@/components/ui/FormSearchableSelect";
import { FormCheckbox } from "@/components/ui/FormCheckbox";

import { ImSpinner9 } from "react-icons/im";

const RegisterForm = () => {
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
        <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
          <FormInput
            id="firstName"
            label="First Name"
            placeholder="First Name"
            error={errors.firstName?.message}
            disabled={isPending}
            registration={register("firstName")}
          />
          <FormInput
            id="secondName"
            label="Second Name"
            placeholder="Second Name"
            error={errors.secondName?.message}
            disabled={isPending}
            registration={register("secondName")}
          />
        </div>

        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="magicmarble@example.com"
          error={errors.email?.message}
          disabled={isPending}
          registration={register("email")}
        />

        <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
          <FormInput
            id="password"
            label="Password"
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

        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-2 sm:gap-4">
          <FormSearchableSelect
            id="codeNumber"
            label="Code Number"
            options={codes}
            value={watchedCode}
            onChange={(val) => setValue("codeNumber", val)}
            getOptionLabel={(code) => code.phoneCode}
            getOptionValue={(code) => code.phoneCode}
            getSearchableText={(code) => `${code.name} ${code.phoneCode}`}
            renderOption={(code) => (
              <>
                <span>{code.name}</span>
                <span>{code.phoneCode}</span>
              </>
            )}
            placeholder="Select Code"
            searchPlaceholder="Search Code"
            error={errors.codeNumber?.message}
            disabled={isPending}
          />

          <FormInput
            id="number"
            label="Telephone Number"
            type="tel"
            placeholder="Telephone Number"
            error={errors.number?.message}
            disabled={isPending}
            registration={register("number")}
          />
        </div>

        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-2 sm:gap-4">
          <FormSearchableSelect
            id="country"
            label="Country"
            options={countries}
            value={watchedCountry}
            onChange={(val) => setValue("country", val)}
            getOptionLabel={(country) => country.label}
            getOptionValue={(country) => country.value}
            getSearchableText={(country) => country.label}
            placeholder="Select Country"
            searchPlaceholder="Search Country"
            error={errors.country?.message}
            disabled={isPending}
          />

          <FormCheckbox
            id="subscribed"
            label="Subscribe to our Magic Diaries"
            registration={register("subscribed")}
          />
        </div>

        <FormInput
          id="address"
          label="Shipping Address"
          placeholder="Shipping Address"
          error={errors.address?.message}
          disabled={isPending}
          registration={register("address")}
        />
      </div>

      <FormError message={error} />

      <button
        className="bg-cyan-600 hover:bg-cyan-600 text-white w-full py-3 rounded-[5px] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <div className="w-full flex justify-center items-center">
            <ImSpinner9 className="animate-spin h-5 w-5 mr-3 text-white" />
          </div>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
