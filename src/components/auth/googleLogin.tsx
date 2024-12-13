import React from "react";
import useAuth from "@/lib/hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { InvalidCredentialsError } from "@/lib/errors/InvalidCredentialsError";
import { toast } from "react-toastify";
import { UnknownUserError } from "@/lib/errors/UnknownUserError";
import UserAlreadyExistsError from "@/lib/errors/UserAlreadyExistsError";
import Loading from "@/components/ui/loading";

interface GoogleLoginProps {
  className?: string;
  signInTextPrefix?: string;
}

export default function GoogleLogin({
  className,
  signInTextPrefix,
}: GoogleLoginProps) {
  const { signInWithGoogle, loading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      toast.promise(signInWithGoogle(), {
        pending: "Signing in...",
      });
    } catch (error: any) {
      if (error instanceof InvalidCredentialsError) {
        toast.error("Invalid credentials");
      } else if (error instanceof UnknownUserError) {
        toast.error("Unknown user");
      } else if (error instanceof UserAlreadyExistsError) {
        toast.error("User already exists");
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <div
      className={`w-full h-12 flex flex-row gap-2 bg-background dark:bg-card-foreground dark:text-card justify-center items-center rounded-lg hover:cursor-pointer ${className}`}
      onClick={handleGoogleLogin}
    >
      {loading && <Loading className="w-7 h-7" />}
      <FcGoogle className="w-7 h-7" />
      <h1 className="uppercase">{signInTextPrefix} Google</h1>
    </div>
  );
}
