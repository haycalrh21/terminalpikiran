import { RegisterForm } from "@/components/pages/auth/register-form";
import { ReturnButton } from "@/components/return-button";
import { SignInOauthButton } from "@/components/pages/auth/sign-in-oauth-button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen w-full flex items-center bg-sidebar text-sidebar-foreground justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">Register</h1>
          <p className="text-sm  ">Create a new account</p>
        </div>

        <div className="space-y-4">
          <RegisterForm />
          <p className="text-center text-sm text-sidebar-foreground ">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="hover:text-sidebar-foreground/50 underline"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-sidebar px-2 text-sidebar-foreground ">or</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <SignInOauthButton provider="google" signUp />
          <SignInOauthButton provider="github" signUp />
        </div>
      </div>
    </div>
  );
}
