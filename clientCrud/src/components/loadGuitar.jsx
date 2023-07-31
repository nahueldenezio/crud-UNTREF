import React, { useState } from "react";
import "./loadGuitar.css";

const GuitarForm = () => {
  const [newGuitars, setNewGuitars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [guitarData, setGuitarData] = useState({
    guitarMake: "",
    guitarModel: "",
    guitarType: "",
    guitarPrice: "",
    guitarImage: null, 
  });

  const handleChange = (e) => {
    setGuitarData({ ...guitarData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setGuitarData({ ...guitarData, guitarImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("guitarMake", guitarData.guitarMake);
      formData.append("guitarModel", guitarData.guitarModel);
      formData.append("guitarType", guitarData.guitarType);
      formData.append("guitarPrice", guitarData.guitarPrice);
      formData.append("guitarImage", guitarData.guitarImage); 

      const response = await fetch("http://localhost:3000/api/guitars", {
        method: "POST",
        body: formData, 
      });

      if (response.ok) {
        const newGuitarData = await response.json();
        setNewGuitars((prevGuitars) => [newGuitarData, ...prevGuitars]);
        setGuitarData({
          guitarMake: "",
          guitarModel: "",
          guitarType: "",
          guitarPrice: "",
          guitarImage: null,
        });
        console.log("¡Guitarra creada excitosamente!");
      } else {
        console.error("Error al crear la guitarra:", response.status);
      }
    } catch (error) {
      console.error("Error al crear la guitarra:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="form-container"
        encType="multipart/form-data"
      >
        <label>
          Marca de la guitarra:
          <input
            type="text"
            name="guitarMake"
            value={guitarData.guitarMake}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Modelo de la guitarra:
          <input
            type="text"
            name="guitarModel"
            value={guitarData.guitarModel}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Tipo de guitarra:
          <input
            type="number"
            name="guitarType"
            value={guitarData.guitarType}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Precio:
          <input
            type="number"
            name="guitarPrice"
            value={guitarData.guitarPrice}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Imagen de la guitarra:
          <input
            type="file"
            name="guitarImage" 
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <br />
        <button type="submit">Crear guitarra</button>
      </form>
  
    </>
  );
};

export default GuitarForm;