import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getMoviesBySearchQuery } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchQuery = searchParams.get("search") ?? "";

  useEffect(() => {
    if (searchQuery.trim() === "") return;

    const getData = async () => {
      try {
        setMovies([]);
        setLoading(true);
        setError(null);

        const data = await getMoviesBySearchQuery(searchQuery);
        if (data.length === 0) {
          setError("No movies found for your search.");
        }
        setMovies(data);
      } catch {
        setError("Error searching movies");
        toast.error("Error searching movies");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const newSearchQuery = form.elements.search.value;

    if (newSearchQuery.trim() === "") return;

    searchParams.set("search", newSearchQuery);
    setSearchParams(searchParams);

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <Loader />}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}

      <Toaster />
    </>
  );
};

export default MoviesPage;
