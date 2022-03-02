import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Card";
import Container from "../../components/shared/Container";
import AddCard from "../AddCard";
import TaskModal from "../TaskModal";
import { useAppDispatch, useAppSelector } from "../../customHooks/hooks";
import { ICard } from "../../models/ICard";
import { IDesk } from "../../models/IDesk";
import { Field, Form } from "react-final-form";
import { userSlice } from "../../reducers/UserSlice";
import { IUser } from "../../models/IUser";

const Desks = styled.div`
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

export default function index() {
  const { desks, cards, user } = useAppSelector<{
    desks: IDesk[];
    cards: ICard[];
    user: IUser;
  }>((state) => state.user);
  //из названия addStatus непонятно, за что отвечает переменная. Добавляет куда-то какой-то статус?
  //Понятно только тебе, что делает данный useState. Нужно переименовать во что-то более подходящее
  //И лучше всего поменьше использовать слово Status в useState. Наводит на мысль, что где-то есть какие-то статусы, и ты сетаешь им новое значение
  const [addStatus, setAddStatus] = useState<null | number>(null);
  const [cardDetails, setCardDetails] = useState<null | ICard>(null);

  //Мне кажется, плохая идея использовать всю колонку, если тебе необходимо поменять только title
  const [titleEditStatus, setTitleEditStatus] = useState<null | IDesk>(null);

  const dispatch = useAppDispatch();

  const handleSaveTitle = (data: { title: string }) => {
    titleEditStatus &&
      dispatch(
        userSlice.actions.saveEditedDeskTitle({
          title: data.title,
          desk: titleEditStatus,
        })
      );
    setTitleEditStatus(null);
  };

  useEffect(() => {
    if (!cardDetails) return;
    const card = cards.find((c) => c.id === cardDetails.id) || null;
    setCardDetails(card);
  }, [cards]);

  return (
    <Container>
      <Desks
        onClick={(event) => {
          if (event.currentTarget === event.target) {
            setAddStatus(null);
          }
        }}
      >
        {desks.map((desk) => (
          <Desk key={desk.id}>
            <div>
              {titleEditStatus && titleEditStatus.id === desk.id ? (
                <Form
                  onSubmit={handleSaveTitle}
                  // validate={validate}
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
                            onBlur={() => setTitleEditStatus(null)}
                          />
                        )}
                      />
                    </form>
                  )}
                />
              ) : (
                <DeskTitle onClick={() => setTitleEditStatus(desk)}>
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
            {addStatus === desk.id ? (
              <AddCard desk={desk} user={user} setAddStatus={setAddStatus} />
            ) : (
              <div>
                <DesksBtn onClick={() => setAddStatus(desk.id)}>
                  + Добавить карточку
                </DesksBtn>
              </div>
            )}
          </Desk>
        ))}
      </Desks>
      {cardDetails && (
        <TaskModal
          card={cardDetails}
          setCardDetails={setCardDetails}
          user={user}
        />
      )}
    </Container>
  );
}
