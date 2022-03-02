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
      state.desks.forEach((desk) => {
        if (desk.id === card.deskId) {
          desk.cards.push(card);
        }
      });
    },
    saveDescription(
      state,
      { payload: { card, desc } }: PayloadAction<{ card: ICard; desc: string }>
    ) {
      const updatedCard = { ...card };
      updatedCard.description = desc;
      let idx = state.cards.findIndex((c) => c.id === card.id);
      state.cards.splice(idx, 1, updatedCard);
      state.desks.forEach((desk) => {
        if (desk.id === card.deskId) {
          desk.cards = state.cards;
        }
      });
    },
    saveComment(
      state,
      {
        payload: { cardId, deskId, comment },
      }: PayloadAction<{ cardId: string; deskId: string; comment: IComment }>
    ) {
      state.cards.forEach((c) => {
        if (c.id === cardId) {
          c.comments.push(comment);
        }
      });
      state.desks.forEach((desk) => {
        if (desk.id === deskId) {
          desk.cards = state.cards;
        }
      });
    },
    deleteComment(
      state,
      {
        payload: { card, comment },
      }: PayloadAction<{ card: ICard; comment: IComment }>
    ) {
      state.cards.forEach((c) => {
        if (c.id === card.id) {
          c.comments = c.comments.filter((comm) => comm.id !== comment.id);
        }
      });
      state.desks.forEach((desk) => {
        if (desk.id === card.deskId) {
          desk.cards = state.cards;
        }
      });
    },
    updateComment(
      state,
      {
        payload: { title, comment },
      }: PayloadAction<{ title: string; comment: IComment }>
    ) {
      state.cards.forEach((c) => {
        if (c.id === comment.cardId) {
          c.comments.forEach((comm) => {
            if (comm.id === comment.id) {
              comm.title = title;
            }
          });
        }
      });
      state.desks.forEach((desk) => {
        if (desk.id === comment.deskId) {
          desk.cards = state.cards;
        }
      });
    },
    updateDesk(
      state,
      {
        payload: { title, desk },
      }: PayloadAction<{ title: string; desk: IDesk }>
    ) {
      state.desks.forEach((d) => {
        if (d.id === desk.id) {
          d.title = title;
          d.cards.forEach((card) => {
            card.deskTitle = title;
          });
        }
      });
      state.cards.forEach((card) => {
        if (card.deskId === desk.id) {
          card.deskTitle = title;
        }
      });
    },
    deleteCard(state, { payload: card }: PayloadAction<ICard>) {
      state.cards = state.cards.filter((c) => c.id !== card.id);
      state.desks.forEach((d) => {
        if (d.id === card.deskId) {
          d.cards = d.cards.filter((c) => c.id !== card.id);
        }
      });
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
