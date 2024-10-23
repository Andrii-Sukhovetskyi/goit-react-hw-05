import { useEffect, useState } from "react";

import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch {
        setError("Error fetching movies");
        toast.error("Error fetching movies");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1>Trending today</h1>

      {loading && <Loader />}
      {error && <p>{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
      
      <Toaster />
    </>
  );
};

export default HomePage;
