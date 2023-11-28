// ColorPicker.tsx
import React from 'react';
import { useColor } from '../../contexts/Contexto';
import colorService from '../../services/Color';
import {
  StyledColorPickerContainer,
  StyledInput,
  StyledButton,
  StyledInputsAndButtonContainer,
} from './styles';

const ColorPicker: React.FC = () => {
  const { color, setColor } = useColor();

  const handleRedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevColor) => ({ ...prevColor, red: Number(e.target.value) }));
  };

  const handleGreenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevColor) => ({ ...prevColor, green: Number(e.target.value) }));
  };

  const handleBlueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevColor) => ({ ...prevColor, blue: Number(e.target.value) }));
  };

  const handleCadastro = async () => {
    try {
      await colorService.create(color);
      console.log(
        `Cadastrando valores: R=${color.red}, G=${color.green}, B=${color.blue}`
      );
      window.location.reload();
    } catch (error) {
      console.error('Erro ao cadastrar a cor:', error);
    }
  };

  return (
    <StyledColorPickerContainer>
      <StyledInputsAndButtonContainer>
        <StyledInput type="number" value={color.red} onChange={handleRedChange} />

        <StyledInput
          type="number"
          value={color.green}
          onChange={handleGreenChange}
        />

        <StyledInput type="number" value={color.blue} onChange={handleBlueChange} />
      </StyledInputsAndButtonContainer>

      <StyledButton onClick={handleCadastro}>Cadastrar</StyledButton>
    </StyledColorPickerContainer>
  );
};

export default ColorPicker;
