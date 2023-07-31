import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuitarCard from "./components/GuitarCard";
import { GuitarProvider } from "./context/GuitarContext";
import GuitarDetailsPage from "./pages/GuitarDetailsPage";
import GuitarsPage from "./pages/GuitarsPage";
import GuitarSearch from "./functions/filter";

function App() {
  const [filteredGuitars, setFilteredGuitars] = useState([]);

  const handleFilterGuitars = (filteredData) => {
    setFilteredGuitars(filteredData);
  };

  return (
    <BrowserRouter>
      <GuitarProvider>
        <Routes>
          <Route
            path="/"
            element={<GuitarsPage filterGuitars={handleFilterGuitars} />}
          />
          <Route path="/listGuitars" element={<GuitarCard />} />
          <Route path="/guitars/:id" element={<GuitarDetailsPage />} />
        </Routes>
      </GuitarProvider>
    </BrowserRouter>
  );
}

export default App;
