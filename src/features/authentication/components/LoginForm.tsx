"use client";

import { useActionState } from "react";
import { LoginFormState } from "../types/types";
import { loginAction } from "../actions/loginAction";
import { AvatarDemo } from "@/components/Avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const initialState: LoginFormState = {
  data: {
    username: "",
    password: "",
  },
};

function LoginForm() {
  const [formState, login, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <form
      action={login}
      className="border-2 flex flex-col justify-center items-center gap-8 py-6 px-12 rounded-lg"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <AvatarDemo className="w-52 h-52" />
        <p className="text-lg font-semibold text-stone-500">
          Login to Your Todo
        </p>
      </div>

      {/* [USERNAME FIELD] */}
      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:items-center">
          <Label className="text-base font-bold" htmlFor="username">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            defaultValue={formState.data.username}
            placeholder="Enter Username..."
            required
            min={3}
            max={20}
            disabled={isPending}
            className={clsx(
              "md:text-lg placeholder:text-xs placeholder:text-stone-400",
              {
                "border-2 border-red-500": formState.errors?.password,
              }
            )}
          />
        </div>
        <div className="h-2">
          <small className="text-red-500">{formState.errors?.username}</small>
        </div>
      </div>

      {/* [PASSWORD FIELD] */}
      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:items-center">
          <Label className="text-base font-bold" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={formState.data.password}
            required
            min={4}
            disabled={isPending}
            placeholder="Enter Password..."
            className={clsx(
              "md:text-lg placeholder:text-xs placeholder:text-stone-400",
              {
                "border-2 border-red-500": formState.errors?.password,
              }
            )}
          />
        </div>
        <div className="h-2">
          <small className="text-red-500">{formState.errors?.password}</small>
        </div>
      </div>

      {formState.errors?.credentialsError && (
        <small className="text-red-500">
          {formState.errors?.credentialsError}
        </small>
      )}

      {/* [REGISTER LINK] */}
      <div className="text-stone-500 text-sm" hidden={isPending}>
        Create New
        <Link href={"/register"} className="font-semibold text-blue-400 ml-1">
          Account
        </Link>
      </div>

      {/* [BUTTON] */}
      <div className="w-full flex justify-center">
        <Button className="w-1/2" type="submit" disabled={isPending}>
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
