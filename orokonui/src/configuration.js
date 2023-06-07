// SWR

const CACHE_TIME = 24 * 60 * 60 * 1000;

const fetcher = async (url) => {
  const result = await fetch(url);

  if (!result.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await result.json();
    error.status = result.status;
    throw error;
  }
  return result.json();
};

const swrParameters = {
  fetcher: fetcher,
  dedupingInterval: CACHE_TIME,
  revalidateOnFocus: false,
};

export { CACHE_TIME, fetcher, swrParameters };
