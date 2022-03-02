import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
`;

const index: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default index;
