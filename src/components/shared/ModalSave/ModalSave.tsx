import React from "react";
import styled from "styled-components";

export const ModalSave: React.FC = ({ children }) => {
  return <ModalSaveBlock>{children}</ModalSaveBlock>;
};

const ModalSaveBlock = styled.div`
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
