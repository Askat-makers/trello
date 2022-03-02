import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../models/ICard";
import { IComment } from "../models/IComment";
import { IDesk } from "../models/IDesk";
import { IUser } from "../models/IUser";

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
    id: 1,
  },
  {
    title: "in Progress",
    cards: [],
    id: 2,
  },
  {
    title: "Testing",
    cards: [],
    id: 3,
  },
  {
    title: "Done",
    cards: [],
    id: 4,
  },
];

//очень много закомментированного кода
//в checkUser либо добавить логику, либо удалить его


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
      // localStorage.setItem("user", JSON.stringify(action.payload));
      // localStorage.setItem("desks", JSON.stringify(desks));
      // localStorage.setItem("cards", JSON.stringify(cards));
    },
    checkUser(state) {
      // const user: IUser =
      // JSON.parse(localStorage.getItem("user") || "null") || initialState.user;
      // const desks: IDesk[] =
      // JSON.parse(localStorage.getItem("desks") || "null") ||
      // initialState.desks;
      // const cards: ICard[] =
      // JSON.parse(localStorage.getItem("cards") || "null") ||
      // initialState.desks;
      // state.user = user;
      // state.desks = desks;
      // state.cards = cards;
    },
    createTask(state, { payload: card }: PayloadAction<ICard>) {
      state.cards.push(card);
      state.desks.forEach((desk) => {
        if (desk.id === card.deskId) {
          desk.cards.push(card);
        }
      });
      // localStorage.setItem("desks", JSON.stringify(state.desks));
      // localStorage.setItem("cards", JSON.stringify(state.cards));
    },

    //здесь лучше использовать полностью description, так как у нас есть в проекте Desk и можно подумать на опечатку
    saveDesc(
      state,
      { payload: { card, desc } }: PayloadAction<{ card: ICard; desc: string }>
    ) {
      const updatedCard = { ...card };
      updatedCard.description = desc;
      let idx = state.cards.findIndex((c) => c.id === card.id);
      state.cards.splice(idx, 1, updatedCard);

      //везде forEach поменять на find
      state.desks.forEach((desk) => {
        if (desk.id === card.deskId) {
          desk.cards = state.cards;
        }
      });
      // localStorage.setItem("desks", JSON.stringify(state.desks));
      // localStorage.setItem("cards", JSON.stringify(state.cards));
    },
    //полностью карточку отправлять нехорошо, лучше отправить cardId и deskId, кроме них в экшене ничего не используется
    //найти и поправить везде
    saveComment(
      state,
      {
        payload: { card, comment },
      }: PayloadAction<{ card: ICard; comment: IComment }>
    ) {
      state.cards.forEach((c) => {
        if (c.id === card.id) {
          c.comments.push(comment);
        }
      });
      state.desks.forEach((desk) => {
        if (desk.id === card.deskId) {
          desk.cards = state.cards;
        }
      });
      // localStorage.setItem("desks", JSON.stringify(state.desks));
      // localStorage.setItem("cards", JSON.stringify(state.cards));
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
      // localStorage.setItem("desks", JSON.stringify(state.desks));
      // localStorage.setItem("cards", JSON.stringify(state.cards));
    },

    //я бы назвала updateComment
    saveEditedComment(
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
      // localStorage.setItem("desks", JSON.stringify(state.desks));
      // localStorage.setItem("cards", JSON.stringify(state.cards));
    },

    saveEditedDeskTitle(
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
      // localStorage.setItem("desks", JSON.stringify(state.desks));
      // localStorage.setItem("cards", JSON.stringify(state.cards));
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

//лучше было бы экспортировать сами экшены, используя деструктуризацию:
export const {
  createTask, deleteCard, deleteComment
} = userSlice.actions;
