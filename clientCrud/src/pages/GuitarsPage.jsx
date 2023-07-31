import { Link } from "react-router-dom";
import GuitarForm from "../components/loadGuitar";
import "./GuitarPage.css";

function GuitarsPage() {
  return (
    <div className="home-container">
      <h1>Tienda de guitarras</h1>
      <Link to="/listGuitars">
        <button className="guitars-button">Ver guitarras</button>
      </Link>
      <GuitarForm />
    </div>
  );
}

export default GuitarsPage;
