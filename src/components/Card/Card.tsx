import React from "react";
import styled from "styled-components";
import { ICard } from "../../types/types";

interface ICardProps {
  card: ICard;
  setCardDetails: (card: ICard) => void;
}

export const Card: React.FC<ICardProps> = ({ card, setCardDetails }) => {
  return (
    <CardBlock onClick={() => setCardDetails(card)}>
      <p>{card.title}</p>
      <CardProps>
        <CardProp>
          <span>✉️</span>
          <span>{card.comments.length}</span>
        </CardProp>
      </CardProps>
    </CardBlock>
  );
};

const CardBlock = styled.div`
  padding: 5px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(30, 30, 30, 0.1);
  cursor: pointer;
  transition: 0.5s all;
  font-size: 12px;
  &:hover {
    background-color: #f5f8fc;
  }
  p {
    padding: 0;
    margin: 0;
    color: #5e6c84;
  }
`;

const CardProps = styled.div`
  display: flex;
`;

const CardProp = styled.div`
  display: flex;
  align-items: center;
  width: 25px;
  justify-content: space-between;
`;
