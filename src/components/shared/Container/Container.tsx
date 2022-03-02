import React from "react";
import styled from "styled-components";

export const Container: React.FC = ({ children }) => {
  return <ContainerBlock>{children}</ContainerBlock>;
};

const ContainerBlock = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
`;
