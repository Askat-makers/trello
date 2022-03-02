import React from "react";
import styled from "styled-components";
import { ICard } from "../../models/ICard";

interface ICardProps {
  card: ICard;
  setCardDetails: (card: ICard) => void;
}

const Card = styled.div`
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

const index: React.FC<ICardProps> = ({ card, setCardDetails }) => {
  return (
    <Card onClick={() => setCardDetails(card)}>
      <p>{card.title}</p>
      <CardProps>
        <CardProp>
          {/* <img src="" alt="" /> */}
          <span>✉️</span>
          <span>{card.comments.length}</span>
        </CardProp>
      </CardProps>
    </Card>
  );
};

export default index;
