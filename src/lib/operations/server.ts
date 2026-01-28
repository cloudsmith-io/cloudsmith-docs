'use server';

export const callApi = async (url: string, headers: HeadersInit) => {
  try {
    const response = await fetch(url, {
      headers,
    });

    return {
      status: response.status,
      body: await response.json(),
    };
  } catch {
    return {
      status: -1,
      body: { error: 'Something went wrong' },
    };
  }
};
