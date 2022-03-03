import React from "react";
import styled from "styled-components";
import { Modal } from "../shared";
import { Field, Form } from "react-final-form";
import { useAppDispatch } from "../../customHooks/hooks";
import { IUser } from "../../types/types";
import { signIn } from "../../reducers/UserSlice";

export const LoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const onSubmit = (user: IUser) => {
    dispatch(signIn(user));
  };
  return (
    <Modal>
      <ModalBody>
        <Form
          onSubmit={onSubmit}
          initialValues={{ name: "" }}
          render={({ handleSubmit }) => (
            <ModalForm onSubmit={handleSubmit}>
              <h2>Введите своё имя</h2>
              <div>
                <Field name="name">
                  {({ input }) => (
                    <ModalField
                      type={"text"}
                      {...input}
                      placeholder="First Name"
                    />
                  )}
                </Field>
              </div>
              <ModalButton type="submit">Submit</ModalButton>
            </ModalForm>
          )}
        />
      </ModalBody>
    </Modal>
  );
};

const ModalBody = styled.div`
  max-width: 550px;
  width: 100%;
  height: 180px;
  background: gray;
  padding: 20px;
  text-align: center;
`;

const ModalForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ModalField = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 5px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
`;
