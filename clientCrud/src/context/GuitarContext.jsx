import React, { createContext, useState } from 'react';

export const GuitarContext = createContext();

export const GuitarProvider = ({ children }) => {
  const [selectedGuitar, setSelectedGuitar] = useState(null);

  return (
    <GuitarContext.Provider value={{ selectedGuitar, setSelectedGuitar }}>
      {children}
    </GuitarContext.Provider>
  );
};