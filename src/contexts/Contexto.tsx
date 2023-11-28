import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorProps } from '../types';
import colorService from '../services/Color';

interface ExtendedColorContextProps {
  color: ColorProps;
  setColor: React.Dispatch<React.SetStateAction<ColorProps>>;
  colorList: ColorProps[];
  setColorList: React.Dispatch<React.SetStateAction<ColorProps[]>>;
}

const ColorContext = createContext<ExtendedColorContextProps | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [color, setColor] = useState<ColorProps>({
    red: 0,
    green: 0,
    blue: 0,
  });
  const [colorList, setColorList] = useState<ColorProps[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const fetchedColors = await colorService.list();
        setColorList(fetchedColors);
      } catch (error) {
        console.error('Erro ao buscar cores:', error);
      }
    };

    fetchColors();
  }, []);

  return (
    <ColorContext.Provider value={{ color, setColor, colorList, setColorList }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};
