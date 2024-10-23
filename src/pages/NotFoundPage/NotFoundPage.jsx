import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1>This page doesn't exist</h1>
      <p>Sorry, the page you are looking for cannot be found.</p>
      <Link to="/" className={s.homeLink}>Go to home</Link>
    </div>
  );
};

export default NotFoundPage;
