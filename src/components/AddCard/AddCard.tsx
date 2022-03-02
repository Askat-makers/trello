import React from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../../customHooks/hooks";
import { ICard, IDesk, IUser } from "../../types/types";
import { createTask } from "../../reducers/UserSlice";

interface IAddCard {
  desk: IDesk;
  user: IUser;
  setIsCardAdd: (status: null) => void;
}

export const AddCard: React.FC<IAddCard> = ({ desk, user, setIsCardAdd }) => {
  const dispatch = useAppDispatch();
  const handleSubmit = ({ title }: { title: string }) => {
    if (!title) return;
    const card: ICard = {
      id: uuid(),
      authorName: user.name,
      comments: [],
      description: "",
      deskTitle: desk.title,
      title,
      deskId: desk.id,
    };
    dispatch(createTask(card));
  };
  return (
    <AddCardBlock>
      <Form
        onSubmit={handleSubmit}
        initialValues={{ title: "" }}
        render={({ handleSubmit, form }) => (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await handleSubmit(event);
              form.reset();
            }}
          >
            <TextAreaAddCard>
              <Field
                name="title"
                render={({ input }) => (
                  <div>
                    <textarea
                      {...input}
                      autoFocus
                      rows={3}
                      placeholder="Введите заголок для этой карточки"
                      onKeyPress={async (event: React.KeyboardEvent) => {
                        if (event.code === "Enter") {
                          await handleSubmit(event);
                          form.reset();
                        }
                      }}
                    />
                  </div>
                )}
              />
            </TextAreaAddCard>
            <BtnBlockAddCard>
              <button type="submit">Submit</button>
            </BtnBlockAddCard>
          </form>
        )}
      />
    </AddCardBlock>
  );
};

const AddCardBlock = styled.div`
  margin-top: 10px;
  outline: none;
  textarea {
    font-size: 12px;
    border: none;
    width: 100%;
    padding: 0;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  button {
    &.btn-close:focus {
      box-shadow: none;
    }
    &:first-child {
      font-size: 11px;
      margin-right: 5px;
    }
  }
`;

const TextAreaAddCard = styled.div`
  padding: 5px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(30, 30, 30, 0.1);
  cursor: pointer;
  transition: 0.5s all;
  font-size: 12px;
`;

const BtnBlockAddCard = styled.div`
  display: flex;
  align-items: center;
  button {
    padding: 5px;
    border: none;
    background: lightblue;
    color: #fff;
    cursor: pointer;
  }
`;
