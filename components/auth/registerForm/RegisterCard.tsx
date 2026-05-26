import Link from "next/link";
import LoginGoogle from "../loginForm/LoginGoogle";
import Separator from "../separator/Separator";
import RegisterForm from "./RegisterForm";

const RegisterCard = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8 bg-red-300">
      <h2 className="text-xl text-cyan-600 text-center font-bold">
        Welcome to Magic Marble Foundation
      </h2>

      <RegisterForm />

      <Separator title="Or" />

      <div className="flex justify-between items-center space-x-2">
        <LoginGoogle/>
      </div>

      <p className="text-gray-500">
        Already have an Account?{" "}
        <Link href={"/login"} className="text-cyan-500 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterCard;
