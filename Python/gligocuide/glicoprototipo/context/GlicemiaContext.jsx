import React, { createContext, useState, useContext } from 'react';

const GlicemiaContext = createContext();

export const GlicemiaProvider = ({ children }) => {
  const [glicemias, setGlicemias] = useState([]); // cada item: { pre: string, pos: string, data: Date }

  const adicionarGlicemia = (pre, pos) => {
    setGlicemias((prev) => [
      ...prev,
      { pre, pos, data: new Date() },
    ]);
  };

  return (
    <GlicemiaContext.Provider value={{ glicemias, adicionarGlicemia }}>
      {children}
    </GlicemiaContext.Provider>
  );
};

export const useGlicemia = () => useContext(GlicemiaContext);
