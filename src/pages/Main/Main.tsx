import React from "react";
import { LoginModal } from "../../components/LoginModal";
import { useAppSelector } from "../../customHooks/hooks";
import { Desks } from "../../components/Desks";

export const Main = () => {
  const { user } = useAppSelector((state) => state.user);
  if (!user.name) {
    return <LoginModal />;
  }
  return <Desks />;
};
