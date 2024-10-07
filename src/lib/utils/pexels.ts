// fetch for pexels API
export const getPhotos = async (query: string) => {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${query}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  console.log(data);
  return data;
};
