export interface ICard {
  title: string;
  description: string;
  comments: IComment[];
  authorName: string;
  id: string;
  deskId: string;
  deskTitle: string;
}

export interface IComment {
  title: string;
  author: string;
  cardAuthor: string;
  id: string;
  cardId: string;
  deskId: string;
}

export interface IUser {
  name: string;
}

export interface IDesk {
  id: string;
  title: string;
  cards: ICard[];
}
