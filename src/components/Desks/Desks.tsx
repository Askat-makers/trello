import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../Card";
import { Container } from "../../components/shared/Container";
import { AddCard } from "../AddCard";
import { TaskModal } from "../TaskModal";
import { useAppDispatch, useAppSelector } from "../../customHooks/hooks";
import { ICard, IDesk, IUser } from "../../types/types";
import { Field, Form } from "react-final-form";
import { updateDesk } from "../../reducers/UserSlice";

export const Desks: React.FC = () => {
  const { desks, cards, user } = useAppSelector<{
    desks: IDesk[];
    cards: ICard[];
    user: IUser;
  }>((state) => state.user);
  const [isCardAdd, setIsCardAdd] = useState<null | string>(null);
  const [cardDetails, setCardDetails] = useState<null | ICard>(null);
  const [isTitleEdit, setIsTitleEdit] = useState<null | string>(null);

  const dispatch = useAppDispatch();

  const handleSaveTitle = (data: IDesk) => {
    isTitleEdit &&
      dispatch(
        updateDesk({
          title: data.title,
          desk: data,
        })
      );
    setIsTitleEdit(null);
  };

  useEffect(() => {
    if (!cardDetails) return;
    const card = cards.find((c) => c.id === cardDetails.id) || null;
    setCardDetails(card);
  }, [cards]);

  return (
    <Container>
      <DesksBlock
        onClick={(event) => {
          if (event.currentTarget === event.target) {
            setIsCardAdd(null);
          }
        }}
      >
        {desks.map((desk) => (
          <Desk key={desk.id}>
            <div>
              {isTitleEdit && isTitleEdit === desk.id ? (
                <Form
                  onSubmit={({ title }) => handleSaveTitle({ ...desk, title })}
                  initialValues={{ title: desk.title }}
                  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Field
                        name="title"
                        render={({ input }) => (
                          <DeskTitleInput
                            {...input}
                            autoFocus
                            type="text"
                            onBlur={() => setIsTitleEdit(null)}
                          />
                        )}
                      />
                    </form>
                  )}
                />
              ) : (
                <DeskTitle onClick={() => setIsTitleEdit(desk.id)}>
                  {desk.title}
                </DeskTitle>
              )}
            </div>
            <div>
              {cards.map((card) => (
                <React.Fragment key={card.id}>
                  {card.deskId === desk.id ? (
                    <Card card={card} setCardDetails={setCardDetails} />
                  ) : null}
                </React.Fragment>
              ))}
            </div>
            {isCardAdd === desk.id ? (
              <AddCard desk={desk} user={user} setIsCardAdd={setIsCardAdd} />
            ) : (
              <div>
                <DesksBtn onClick={() => setIsCardAdd(desk.id)}>
                  + Добавить карточку
                </DesksBtn>
              </div>
            )}
          </Desk>
        ))}
      </DesksBlock>
      {cardDetails && (
        <TaskModal
          card={cardDetails}
          setCardDetails={setCardDetails}
          user={user}
        />
      )}
    </Container>
  );
};

const DesksBlock = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Desk = styled.div`
  background-color: #ebecf0;
  padding: 7px;
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(30, 30, 30, 0.1);
  width: 250px;
  min-width: 250px;
  margin: 10px;
`;

const DeskTitle = styled.h6`
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
`;

const DeskTitleInput = styled.input`
  margin-bottom: 10px;
  outline: none;
  font-size: 14px;
  width: 100%;
`;

const DesksBtn = styled.button`
  border: none;
  background: transparent;
  color: #5e6c84;
  font-size: 14px;
  transition: 0.5s all;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
