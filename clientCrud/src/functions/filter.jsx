import React, { useState, useEffect } from "react";

const GuitarSearch = ({ guitarData, filterGuitars }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGuitars, setFilteredGuitars] = useState([]);

  useEffect(() => {
    if (guitarData) {
      const filteredGuitars = guitarData.filter((guitar) =>
        guitar.guitarModel && guitar.guitarModel.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGuitars(filteredGuitars);
    }
  }, [searchTerm, guitarData]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    filterGuitars(filteredGuitars);
  }, [filteredGuitars, filterGuitars]);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Buscar por nombre de la guitarra"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>

      {searchTerm.trim() !== "" && guitarData?.length === 0 ? (
        <p>No se encontraron guitarras</p>
      ) : null}
    </div>
  );
};

export default GuitarSearch;
