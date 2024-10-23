import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
     <NavLink to="/" className={({ isActive }) => (isActive ? s.active : s.link)}>Home</NavLink>
     <NavLink to="/movies" className={({ isActive }) => (isActive ? s.active : s.link)}>Movies</NavLink>
    </nav>
  );
};

export default Navigation;
