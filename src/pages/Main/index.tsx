import React, { useEffect } from "react";
import LoginModal from "../../components/LoginModal";
import { useAppDispatch, useAppSelector } from "../../customHooks/hooks";
import { userSlice } from "../../reducers/UserSlice";
import Desks from "../../components/Desks";

export default function index() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  //зачем этот useEffect, если checkUser пустой?
  useEffect(() => {
    dispatch(userSlice.actions.checkUser());
  }, []);
  if (!user.name) {
    return <LoginModal />;
  }
  return <Desks />;
}
