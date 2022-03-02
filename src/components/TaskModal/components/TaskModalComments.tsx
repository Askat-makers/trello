import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { useAppDispatch } from "../../../customHooks/hooks";
import { ICard } from "../../../models/ICard";
import { IComment } from "../../../models/IComment";
import { IUser } from "../../../models/IUser";
import { userSlice } from "../../../reducers/UserSlice";
import ModalSave from "../../shared/ModalSave";
import ModalField from "../../shared/ModalField";

interface ITaskModalComments {
  card: ICard;
  user: IUser;
}

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

const TaskModalComments: React.FC<ITaskModalComments> = ({ card, user }) => {
  const [editComment, setEditComment] = useState<null | IComment>(null);
  const dispatch = useAppDispatch();

  const handleDelete = (comment: IComment) => {
    dispatch(userSlice.actions.deleteComment({ card, comment }));
  };

  const handleSave = (data: { commentTitle: string; comment: IComment }) => {
    dispatch(
      userSlice.actions.saveEditedComment({
        title: data.commentTitle,
        comment: data.comment,
      })
    );
    setEditComment(null);
  };

  return (
    <>
      {card.comments.map((comment) => (
        <Comment key={comment.id}>
          <strong>{comment.author}</strong>
          {editComment && editComment.id === comment.id ? (
            <Form
              onSubmit={(data: { comment: string }) =>
                handleSave({ commentTitle: data.comment, comment })
              }
              // validate={validate}
              initialValues={{ comment: editComment.title }}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="comment"
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
                    <span onClick={() => setEditComment(null)}>&times;</span>
                  </ModalSave>
                </form>
              )}
            />
          ) : (
            <>
              <CommentTitle>{comment.title}</CommentTitle>
              <CommentChanges>
                <span onClick={() => setEditComment(comment)}>Изменить</span>
                <span onClick={() => handleDelete(comment)}>Удалить</span>
              </CommentChanges>
            </>
          )}
        </Comment>
      ))}
    </>
  );
};

export default TaskModalComments;
