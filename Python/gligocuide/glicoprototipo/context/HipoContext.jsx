import React, { createContext, useState, useContext } from 'react';

const HipoContext = createContext();

export const HipoProvider = ({ children }) => {
  const [hipos, setHipos] = useState([]); // cada item: { valor: string, data: Date, observacao: string }

  const adicionarHipo = (valor, observacao) => {
    setHipos((prev) => [
      ...prev,
      { valor, observacao, data: new Date() },
    ]);
  };

  return (
    <HipoContext.Provider value={{ hipos, adicionarHipo }}>
      {children}
    </HipoContext.Provider>
  );
};

export const useHipo = () => useContext(HipoContext);
