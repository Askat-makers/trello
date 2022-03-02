import React from "react";
import styled from "styled-components";
import Modal from "../shared/Modal";
import { Field, Form } from "react-final-form";
import { useAppDispatch } from "../../customHooks/hooks";
import { IUser } from "../../models/IUser";
import { userSlice } from "../../reducers/UserSlice";

//стилизацию лучше перенести вниз, чтобы взгляд сразу падал на логику
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

export default function index() {
  const dispatch = useAppDispatch();
  const onSubmit = (user: IUser) => {
    dispatch(userSlice.actions.signIn(user));
  };
  return (
    <Modal>
      <ModalBody>
        <Form
          onSubmit={onSubmit}
          initialValues={{ name: "" }}
          //   validate={validate}
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
}
