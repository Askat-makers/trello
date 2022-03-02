import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../../customHooks/hooks";
import { ICard, IComment, IUser } from "../../types/types";
import {
  deleteCard,
  saveComment,
  saveDescription,
} from "../../reducers/UserSlice";
import { Modal } from "../shared/Modal";
import { ModalSave } from "../shared/ModalSave";
import { ModalField } from "../shared/ModalField";
import TaskModalComments from "./components/TaskModalComments";

interface ITaskModalProps {
  card: ICard;
  user: IUser;
  setCardDetails: (card: null | ICard) => void;
}

export const TaskModal: React.FC<ITaskModalProps> = ({
  card,
  user,
  setCardDetails,
}) => {
  const dispatch = useAppDispatch();
  const [isEditDesc, setIsEditDesc] = useState<boolean>(false);
  const [isCommentWritting, setIsCommentWritting] = useState<boolean>(false);

  const handleSubmitDesc = (data: { description: string }) => {
    dispatch(saveDescription({ card, desc: data.description }));
    setIsEditDesc(!isEditDesc);
  };

  const handleSubmitComment = (data: { comment: string }) => {
    const comment: IComment = {
      title: data.comment,
      author: user.name,
      cardAuthor: card.authorName,
      id: uuid(),
      cardId: card.id,
      deskId: card.deskId,
    };
    dispatch(
      saveComment({
        cardId: card.id,
        deskId: card.deskId,
        comment,
      })
    );
    setIsCommentWritting(false);
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(card));
    setCardDetails(null);
  };

  return (
    <Modal dark>
      <ModalBody>
        <ModalHeader>
          <div>
            <ModalTitle>{card.title}</ModalTitle>
            <ModalSubtitle>в колонке {card.deskTitle}</ModalSubtitle>
          </div>
          <div>
            <CancelSpan onClick={() => setCardDetails(null)}>
              &times;
            </CancelSpan>
          </div>
        </ModalHeader>
        <div>
          <DeleteBtn onClick={handleDeleteCard}>Удалить 🗑️</DeleteBtn>
        </div>
        <ModalDescBlock>
          <ModalBlocksTitle>Описание</ModalBlocksTitle>
          {!isEditDesc ? (
            <div>
              <ModalDescText onClick={() => setIsEditDesc(true)}>
                {card.description || "Добавить более подробное описание..."}
              </ModalDescText>
            </div>
          ) : (
            <div>
              <Form
                onSubmit={handleSubmitDesc}
                initialValues={{ description: card.description }}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="description"
                      render={({ input }) => (
                        <div>
                          <ModalField
                            {...input}
                            rows={3}
                            autoFocus
                            placeholder="Добавить более подробное описание..."
                          />
                        </div>
                      )}
                    />
                    <ModalSave>
                      <button type="submit">Сохранить</button>
                      <span onClick={() => setIsEditDesc(false)}>&times;</span>
                    </ModalSave>
                  </form>
                )}
              />
            </div>
          )}
        </ModalDescBlock>
        <ModalCommentBlock>
          <ModalBlocksTitle>Действия</ModalBlocksTitle>
          <div>
            <div>
              <Form
                onSubmit={handleSubmitComment}
                initialValues={{ comment: "" }}
                render={({ handleSubmit, values, form }) => (
                  <form
                    onSubmit={(event) => {
                      handleSubmit(event);
                      form.reset();
                    }}
                  >
                    <Field
                      name="comment"
                      render={({ input }) => (
                        <div>
                          <ModalField
                            {...input}
                            onFocus={() => setIsCommentWritting(true)}
                            onBlur={() =>
                              !values.comment && setIsCommentWritting(false)
                            }
                            rows={3}
                            placeholder="Напишите комментарий..."
                          />
                        </div>
                      )}
                    />
                    {isCommentWritting && (
                      <ModalSave>
                        <button type="submit">Сохранить</button>
                        <span onClick={() => setIsCommentWritting(false)}>
                          &times;
                        </span>
                      </ModalSave>
                    )}
                  </form>
                )}
              />
            </div>
          </div>
          <TaskModalComments card={card} />
        </ModalCommentBlock>
      </ModalBody>
    </Modal>
  );
};

const ModalBody = styled.div`
  max-width: 600px;
  width: 90%;
  background: #fff;
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ModalTitle = styled.h2`
  margin-bottom: 10px;
`;

const CancelSpan = styled.span`
  cursor: pointer;
  font-size: 30px;
`;

const ModalSubtitle = styled.h4``;
const DeleteBtn = styled.button`
  border: none;
  cursor: pointer;
  background: red;
  color: white;
  padding: 8px;
`;

const ModalDescBlock = styled.div`
  margin-top: 10px;
`;
const ModalBlocksTitle = styled.h6`
  margin-bottom: 10px;
`;

const ModalDescText = styled.p`
  padding: 6px 12px;
  width: 100%;
  background-color: gray;
  cursor: pointer;
  background-color: #091e420a;
  height: 60px;
  font-size: 14px;
`;

const ModalCommentBlock = styled.div`
  margin-top: 10px;
`;
