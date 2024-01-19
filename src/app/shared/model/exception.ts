import * as string_decoder from "string_decoder";

export interface Exception {
  errorCode: number;
  message: string;
  errors: string[];
}
