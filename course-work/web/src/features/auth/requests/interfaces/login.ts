import { GeneralResponse } from "./general-response";

export interface Params {
  email: string;
  password: string;
}

export interface LoginResponse extends GeneralResponse {}
