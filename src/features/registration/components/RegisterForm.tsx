"use client";
import { Label } from "@/components/ui/label";
import { registerAction } from "../actions/registerAction";
import { Input } from "@/components/ui/input";
import { AvatarDemo } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { RegisterFormState } from "../types/types";
import clsx from "clsx";

const initialState: RegisterFormState = {
  data: {
    username: "",
    password: "",
    rePassword: "",
  },
};

function RegisterForm() {
  const [formState, register, isPending] = useActionState(
    registerAction,
    initialState
  );

  return (
    <form
      action={register}
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

      {/* [RE-PASSWORD FIELD] */}
      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:items-center">
          <Label className="text-base font-bold" htmlFor="rePassword">
            Confirm
          </Label>
          <Input
            id="rePassword"
            name="rePassword"
            type="password"
            defaultValue={formState.data.rePassword}
            required
            min={4}
            disabled={isPending}
            placeholder="Enter Password Again..."
            className={clsx(
              "md:text-lg placeholder:text-xs placeholder:text-stone-400",
              {
                "border-2 border-red-500": formState.errors?.password,
              }
            )}
          />
        </div>
        <div className="h-2">
          <small className="text-red-500">{formState.errors?.rePassword}</small>
        </div>
      </div>

      {/* [BUTTON] */}
      <div className="w-full flex justify-center">
        <Button className="w-1/2" type="submit" disabled={isPending}>
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
