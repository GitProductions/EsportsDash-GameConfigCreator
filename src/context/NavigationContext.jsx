
import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [selectedPage, setSelectedPage] = useState('home');

  return (
    <NavigationContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);