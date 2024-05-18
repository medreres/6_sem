export type ResponseWithError<T> =
  | {
      error: string;
      data?: undefined;
    }
  | {
      data: T;
      error?: undefined;
    };
