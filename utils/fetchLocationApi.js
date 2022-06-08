import axios from "axios";

export const baseUrl = "https://us-real-estate.p.rapidapi.com";

export const fetchLocationApi = async (purpose, city, state) => {
  //console.log("in fetch", "1: ", purpose, "2: ", city, "3: ", state);
  const url = `${baseUrl}/v2/${purpose}`;
  // console.log("final URL: ", url);
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
    params: {
      offset: 0,
      limit: 42,
      state_code: state,
      city: city,
      sort: "newest",
    },
  });
  return data;
};
