import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GuitarDetailsPage.css";

function GuitarDetailsPage() {
  const { id } = useParams();
  const [guitarData, setGuitarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingPrice, setIsEditingPrice] = useState(false); 
  const [newPrice, setNewPrice] = useState(""); 

  useEffect(() => {
    const fetchGuitarData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/guitars/${id}`);
        const data = await response.json();
        setGuitarData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching guitar data:", error);
      }
    };

    fetchGuitarData();
  }, [id]);

  const handlePriceUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/guitars/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guitarPrice: newPrice }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const updatedGuitarData = { ...guitarData, guitarPrice: newPrice };
      setGuitarData(updatedGuitarData);
      setIsEditingPrice(false);
    } catch (error) {
      console.error("Error updating guitar price:", error);
    }
  };

  if (isLoading) {
    return <p>Cargando datos de la guitarra...</p>;
  }

  if (!guitarData) {
    return <p>No se encontraron datos de la guitarra</p>;
  }

  return (
    <div className="details-container">
      <div>
        <h3>Marca: {guitarData.guitarMake}</h3>
        <p>Modelo: {guitarData.guitarModel}</p>
        <img src={guitarData.guitarImage} alt="Guitar" />
        <p>Tipo: {guitarData.guitarType}</p>
        {isEditingPrice ? (
          <>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <button onClick={handlePriceUpdate}>Guardar</button>
            <button onClick={() => setIsEditingPrice(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <p>Precio: $ {guitarData.guitarPrice}</p>
            <button onClick={() => setIsEditingPrice(true)}>Modificar Precio</button>
          </>
        )}
      </div>
    </div>
  );
}

export default GuitarDetailsPage;