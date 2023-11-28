// ColorPickerStyles.tsx
import styled from "styled-components";

export const StyledColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  margin: 10px; /* Ajuste conforme necessário */
  border: 1px solid #000;
  padding: 10px;
`;

export const StyledInput = styled.input`
  width: 50px;
  margin-right: 10px;
  font-weight: bold;
  padding: 5px 0;
  border-radius: 5px;
`;

export const StyledButton = styled.button`
  width: 80px;
  padding: 5px 0;
  background-color: #ccc; /* Define a cor de fundo como cinza */
  border: none; /* Remove a borda */
  font-weight: bold;
  cursor: pointer;
  height: 30px; /* Defina a altura desejada */
`;

// Adicionando um novo estilo para o contêiner dos inputs e botões
export const StyledInputsAndButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px; /* Defina a altura desejada */
`;
