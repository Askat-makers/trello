import React from "react";
import styled from "styled-components";

interface IModalProps {
  dark?: boolean;
}

export const Modal: React.FC<IModalProps> = ({ children, dark = false }) => {
  return <ModalBlock dark={dark}>{children}</ModalBlock>;
};

const ModalBlock = styled.div<IModalProps>`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.dark ? "rgba(1, 1, 1, 0.5)" : "transparent")};
`;
