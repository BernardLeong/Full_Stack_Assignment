import { Form } from "./Form";

export type FormErrors = {
    [key in keyof Form]?: string;
  };