import { IComment } from "./IComment";

export interface ICard {
  title: string;
  description: string;
  comments: IComment[];
  authorName: string;
  id: number;
  deskId: number;
  deskTitle: string;
}
