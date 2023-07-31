import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import "./GuitarCard.css"
import { deleteGuitar } from "../functions/delete"
import GuitarSearch from "../functions/filter"

function GuitarCard() {
  const [guitarData, setGuitarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/guitars");
        const data = await response.json();
        setGuitarData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching guitar data: ", error);
      }
    };

    fetchData();
  }, []);

  const filterGuitars = (filteredData) => {
    setFilteredData(filteredData);
  };

  return (
    <div>
      <GuitarSearch guitarData={guitarData} filterGuitars = {filterGuitars} />
      <div className="card-container">
        {isLoading ? (
          <p>Cargando datos de las guitarras...</p>
        ) : (filteredData || guitarData).length === 0 ? (
          <p>No hat guitarras cargadas</p>
        ) : (filteredData || guitarData).map((guitar) => (
          <div className="guitar-card" key={guitar._id}>
            <img src={guitar.guitarMake} alt="Guitar" />
            <h2>Marca: {guitar.guitarMake}</h2>
            <p>Modelo: {guitar.guitarModel}</p>
            <p>Tipo: {guitar.guitarType}</p>
            <p>Precio: $ {guitar.guitarPrice}</p>
            <div className="buttons-container">
              <Link to={`/guitars/${guitar._id}`} className="details">
                Ver detalles
              </Link>
              <button onClick={() => deleteGuitar(guitar._id, guitarData, setGuitarData)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuitarCard