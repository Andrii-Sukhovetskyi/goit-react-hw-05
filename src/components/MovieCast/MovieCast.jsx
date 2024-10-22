import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getMovieCastById } from "../../services/api";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  const movie = useOutletContext();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const data = await getMovieCastById(movie.id);
        setCast(data);
      } catch {
        toast.error("Error fetching cast");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movie]);

  return (
    <>
      <ul>
        {cast.map(({ id, name, character, profile_path }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                  : "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+photo"
              }
              alt="Actor photo"
            />
            <h3>{name}</h3>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
      {loading && <Loader />}
    </>
  );
};

export default MovieCast;