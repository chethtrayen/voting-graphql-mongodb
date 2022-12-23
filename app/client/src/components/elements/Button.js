import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(p) => p.backgroundColor};
  border: 0;
  border-radius: 10px;
  color: ${(p) => p.color};
  padding: 10px 20px;
`;
