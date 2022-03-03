import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { ICard, IComment, IDesk, IUser } from "../types/types";

interface IInitState {
  user: IUser;
  desks: IDesk[];
  cards: ICard[];
}

const initialState: IInitState = {
  user: { name: "" },
  desks: [],
  cards: [],
};

const initDesks: IDesk[] = [
  {
    title: "TODO",
    cards: [],
    id: uuid(),
  },
  {
    title: "in Progress",
    cards: [],
    id: uuid(),
  },
  {
    title: "Testing",
    cards: [],
    id: uuid(),
  },
  {
    title: "Done",
    cards: [],
    id: uuid(),
  },
];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<IUser>) {
      const desks: IDesk[] = initDesks;
      const cards: ICard[] = [];
      state.user = action.payload;
      state.desks = desks;
      state.cards = cards;
    },
    createTask(state, { payload: card }: PayloadAction<ICard>) {
      state.cards.push(card);
    },
    saveDescription(
      state,
      {
        payload: { cardId, description },
      }: PayloadAction<{ cardId: string; description: string }>
    ) {
      const updateCard = state.cards.find((card) => card.id === cardId);
      updateCard && (updateCard.description = description);
    },
    saveComment(
      state,
      {
        payload: { cardId, comment },
      }: PayloadAction<{ cardId: string; comment: IComment }>
    ) {
      const updateCard = state.cards.find((card) => card.id === cardId);
      updateCard && updateCard.comments.push(comment);
    },
    deleteComment(
      state,
      {
        payload: { cardId, commentId },
      }: PayloadAction<{ cardId: string; commentId: string }>
    ) {
      const updateCard = state.cards.find((card) => card.id === cardId);
      updateCard &&
        (updateCard.comments = updateCard.comments.filter(
          (comment) => comment.id !== commentId
        ));
    },
    updateComment(
      state,
      {
        payload: { commentTitle, commentId, cardId },
      }: PayloadAction<{
        commentTitle: string;
        commentId: string;
        cardId: string;
      }>
    ) {
      const updateCard = state.cards.find((card) => card.id === cardId);
      if (!updateCard) return;
      const updateComment = updateCard.comments.find(
        (comment) => comment.id === commentId
      );
      updateComment && (updateComment.title = commentTitle);
    },
    updateDesk(
      state,
      {
        payload: { deskId, deskTitle },
      }: PayloadAction<{ deskId: string; deskTitle: string }>
    ) {
      const updateDesk = state.desks.find((desk) => desk.id === deskId);
      updateDesk && (updateDesk.title = deskTitle);
      state.cards.forEach((card) => {
        if (card.deskId === deskId) {
          card.deskTitle = deskTitle;
        }
      });
    },
    deleteCard(
      state,
      { payload: { cardId } }: PayloadAction<{ cardId: string }>
    ) {
      state.cards = state.cards.filter((card) => card.id !== cardId);
    },
  },
});

export const {
  createTask,
  deleteCard,
  deleteComment,
  saveComment,
  saveDescription,
  signIn,
  updateComment,
  updateDesk,
} = userSlice.actions;
