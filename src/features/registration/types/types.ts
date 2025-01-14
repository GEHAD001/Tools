import { RegisterFormFieldsType } from "../schema/RegisterFormSchema";

export interface RegisterFormState {
  data: RegisterFormFieldsType;
  errors?: Partial<RegisterFormFieldsType>;
  successMsg?: string;
}
