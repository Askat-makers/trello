import React from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
//удали неиспользуемые импорты по проекту
import { ArrowFunction } from "typescript";
import { useAppDispatch } from "../../customHooks/hooks";
import { ICard } from "../../models/ICard";
import { IDesk } from "../../models/IDesk";
import { IUser } from "../../models/IUser";
import { userSlice } from "../../reducers/UserSlice";

interface IAddCard {
  desk: IDesk;
  user: IUser;
  setAddStatus: (status: null) => void;
}

const AddCard = styled.div`
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

const index: React.FC<IAddCard> = ({ desk, user, setAddStatus }) => {
  const dispatch = useAppDispatch();
  const handleSubmit = ({ title }: { title: string }) => {
    if (!title) return;
    const card: ICard = {

      //лучше и удобнее использовать uuid, даже в своих проектах (не критично)
      id: Date.now(),
      authorName: user.name,
      comments: [],
      description: "",
      deskTitle: desk.title,
      title,
      deskId: desk.id,
    };
    dispatch(userSlice.actions.createTask(card));
  };
  return (
    <AddCard>
      <Form
        onSubmit={handleSubmit}
        initialValues={{ title: "" }}
        // validate={validate}
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
                        //Deprecated symbol used, consult docs for better alternative
                        if (event.charCode === 13) {
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
    </AddCard>
  );
};

export default index;
