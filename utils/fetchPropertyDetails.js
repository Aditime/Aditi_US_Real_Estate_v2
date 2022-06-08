import axios from "axios";

export const baseUrl = "https://us-real-estate.p.rapidapi.com";

export const fetchPropertyDetails = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  });

  return data;
};
