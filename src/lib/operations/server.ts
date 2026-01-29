'use server';

export const callApi = async (
  url: string,
  method: string,
  headers: HeadersInit,
  body?: BodyInit,
): Promise<
  | {
      status: null;
      body: { error: string };
    }
  | {
      status: number;
      body: object;
    }
> => {
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
    });
    const responseBody = await response.json();
    return {
      status: response.status,
      body: responseBody,
    };
  } catch {
    return {
      status: null,
      body: { error: 'Something went wrong. Please try again later.' },
    };
  }
};
