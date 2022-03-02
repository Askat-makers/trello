import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { useAppDispatch } from "../../../customHooks/hooks";
import { ICard, IComment } from "../../../types/types";
import { deleteComment, updateComment } from "../../../reducers/UserSlice";
import { ModalSave } from "../../shared/ModalSave";
import { ModalField } from "../../shared/ModalField";

interface ITaskModalComments {
  card: ICard;
}

const TaskModalComments: React.FC<ITaskModalComments> = ({ card }) => {
  const [isCommentEdit, setIsCommentEdit] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  const handleDelete = (comment: IComment) => {
    dispatch(deleteComment({ card, comment }));
  };

  const handleSave = (data: IComment) => {
    dispatch(
      updateComment({
        title: data.title,
        comment: data,
      })
    );
    setIsCommentEdit(null);
  };

  return (
    <>
      {card.comments.map((comment) => (
        <Comment key={comment.id}>
          <strong>{comment.author}</strong>
          {isCommentEdit && isCommentEdit === comment.id ? (
            <Form
              onSubmit={(data: { title: string }) =>
                handleSave({ ...comment, title: data.title })
              }
              initialValues={{ comment: comment.title }}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="title"
                    render={({ input }) => (
                      <div>
                        <ModalField
                          {...input}
                          autoFocus
                          rows={2}
                          placeholder="Напишите комментарий..."
                        />
                      </div>
                    )}
                  />
                  <ModalSave>
                    <button type="submit">Сохранить</button>
                    <span onClick={() => setIsCommentEdit(null)}>&times;</span>
                  </ModalSave>
                </form>
              )}
            />
          ) : (
            <>
              <CommentTitle>{comment.title}</CommentTitle>
              <CommentChanges>
                <span onClick={() => setIsCommentEdit(comment.id)}>
                  Изменить
                </span>
                <span onClick={() => handleDelete(comment)}>Удалить</span>
              </CommentChanges>
            </>
          )}
        </Comment>
      ))}
    </>
  );
};

const Comment = styled.div`
  margin-top: 15px;
  strong {
    font-size: 14px;
  }
`;

const CommentTitle = styled.h5`
  margin-top: 4px;
  box-shadow: 0 0 8px rgba(30, 30, 30, 0.1);
  font-size: 12px;
  margin-bottom: 0;
  padding: 10px;
`;

const CommentChanges = styled.div`
  span {
    margin-right: 5px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      color: gray;
    }
  }
`;

export default TaskModalComments;
