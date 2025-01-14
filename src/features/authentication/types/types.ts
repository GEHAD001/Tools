import { LoginFormFieldsType } from "../schema/LoginFormSchema";

export interface LoginFormState {
  data: LoginFormFieldsType;
  errors?: Partial<LoginFormFieldsType> & { credentialsError?: string };
  successMsg?: string;
}
