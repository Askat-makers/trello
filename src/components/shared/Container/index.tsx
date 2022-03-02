import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
`;

//компоненты в этой папке можно назвать так, как они используются в остальных компонентах, а для стилизации использовать Root
//первый элемент вообще лучше называть Root, где это возможно
const index: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default index;
