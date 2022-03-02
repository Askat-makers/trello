import { ICard } from "./ICard";

export interface IDesk {
  id: number;
  title: string;
  cards: ICard[];
}
