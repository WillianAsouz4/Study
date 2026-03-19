import React, { createContext, useState, useContext } from 'react';

const AlimentoContext = createContext();

export const AlimentoProvider = ({ children }) => {
  const [alimentos, setAlimentos] = useState([]);

  const adicionarAlimento = (novoAlimento) => {
    setAlimentos((prev) => [...prev, novoAlimento]);
  };

  const removerAlimento = (index) => {
    setAlimentos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AlimentoContext.Provider value={{ alimentos, adicionarAlimento, removerAlimento }}>
      {children}
    </AlimentoContext.Provider>
  );
};

export const useAlimento = () => useContext(AlimentoContext);
