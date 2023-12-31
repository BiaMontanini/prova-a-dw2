// ColorList.tsx
import React from 'react';
import { useColor } from '../contexts/Contexto';
import styled from 'styled-components';
import colorService from '../services/Color';

interface ColorItemProps {
  backgroundColor: string;
}

const ColorListContainer = styled.div`
  width: 100%;
`;

const ColorItem = styled.li<ColorItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.backgroundColor};
`;

const ColorCode = styled.span<ColorItemProps>`
  color: ${(props) => inverseColor(props.backgroundColor)};
`;

function inverseColor(hexColor: string) {
  // Converte o formato hexadecimal para RGB
  const rgbColor = {
    red: parseInt(hexColor.slice(1, 3), 16),
    green: parseInt(hexColor.slice(3, 5), 16),
    blue: parseInt(hexColor.slice(5, 7), 16),
  };

  // Calcula a cor inversa
  const rinverse = 255 - rgbColor.red,
    ginverse = 255 - rgbColor.green,
    binverse = 255 - rgbColor.blue;

  // Converte a cor inversa de volta para o formato hexadecimal
  const r =
    rinverse.toString(16).length < 2
      ? '0' + rinverse.toString(16)
      : rinverse.toString(16);
  const g =
    ginverse.toString(16).length < 2
      ? '0' + ginverse.toString(16)
      : ginverse.toString(16);
  const b =
    binverse.toString(16).length < 2
      ? '0' + binverse.toString(16)
      : binverse.toString(16);

  return `#${r}${g}${b}`;
}

const ColorList: React.FC = () => {
  const { colorList, setColorList } = useColor();

  const handleDeleteColor = async (id: number) => {
    try {
      // Remove a cor do backend
      await colorService.remove(id);

      // Atualiza o estado do contexto para refletir a remoção
      const updatedColorList = colorList.filter((color) => color.id !== id);
      setColorList(updatedColorList);

      // Recarrega a página
      window.location.reload();
    } catch (error) {
      console.error('Erro ao deletar a cor:', error);
    }
  };

  return (
    <ColorListContainer>
      <div>
        {colorList.map((color) => (
          <ColorItem
          key={color.id}
          backgroundColor={`#${color.red.toString(16).padStart(2, '0')}${color.green.toString(16).padStart(2, '0')}${color.blue.toString(16).padStart(2, '0')}`}
          onClick={() => color.id && handleDeleteColor(color.id)}
        >
            <ColorCode
              backgroundColor={`#${color.red.toString(16).padStart(2, '0')}${color.green.toString(16).padStart(2, '0')}${color.blue.toString(16).padStart(2, '0')}`}
            >
              Cor: #{color.red.toString(16).padStart(2, '0')}{color.green.toString(16).padStart(2, '0')}{color.blue.toString(16).padStart(2, '0')}
            </ColorCode>
          </ColorItem>
        ))}
      </div>
    </ColorListContainer>
  );
};

export default ColorList;