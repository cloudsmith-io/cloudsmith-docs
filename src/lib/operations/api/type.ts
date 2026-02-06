export type ApiCallTestResponse =
  | {
      status: null;
      body: { error: string };
    }
  | {
      status: number;
      body: object;
    };
