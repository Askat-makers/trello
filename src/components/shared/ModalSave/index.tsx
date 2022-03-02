import React from "react";
import styled from "styled-components";
const ModalSave = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  button {
    padding: 5px;
    border: none;
    background: lightblue;
    color: #fff;
    cursor: pointer;
    margin-right: 5px;
  }
  span {
    font-size: 20px;
    cursor: pointer;
  }
`;

const index: React.FC = ({ children }) => {
  return <ModalSave>{children}</ModalSave>;
};

export default index;
