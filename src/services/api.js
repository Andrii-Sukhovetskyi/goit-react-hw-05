import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzU3ZTA0MzdkYzM3NTcxMjU4MWFkMTM0NjBlMDc4YiIsIm5iZiI6MTcyOTYyMjM3NS42MTEwMjIsInN1YiI6IjY3MTdlYzljM2QzZGY4MGYwOWNiNGEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XfdlcbIXhiDjwxbmaaN-fmeGPuxrP4aFNiZnwizeAUI`;

const fetchData = async (url, params = {}) => {
  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getTrendingMovies = async () => {
  const data = await fetchData("trending/movie/day");
  return data.results;
};

const getMoviesBySearchQuery = async (query) => {
  const data = await fetchData("search/movie", { query });
  return data.results;
};

const getMovieDetailsById = async (movieId) => {
  const data = await fetchData(`movie/${movieId}`);
  return data;
};

const getMovieCastById = async (movieId) => {
  const data = await fetchData(`movie/${movieId}/credits`);
  return data.cast;
};

const getMovieReviewsById = async (movieId) => {
  const data = await fetchData(`movie/${movieId}/reviews`);
  return data.results;
};

export {
  getTrendingMovies,
  getMoviesBySearchQuery,
  getMovieDetailsById,
  getMovieCastById,
  getMovieReviewsById,
};
