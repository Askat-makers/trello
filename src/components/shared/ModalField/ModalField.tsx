import React from "react";
import styled from "styled-components";

interface IModalFieldProps {
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyPress?: (event: React.KeyboardEvent) => Promise<void>;
  rows?: number;
  placeholder?: string;
  autoFocus?: boolean;
}

export const ModalField: React.FC<IModalFieldProps> = (props) => {
  return <ModalTextarea {...props} />;
};

const ModalTextarea = styled.textarea`
  padding: 6px 12px;
  width: 100%;
  background-color: gray;
  cursor: pointer;
  background-color: #091e420a;
  height: 60px;
  font-size: 14px;
  outline: none;
`;
