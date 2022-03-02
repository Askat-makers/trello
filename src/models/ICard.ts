import { IComment } from "./IComment";

//папку лучше назвать types и все типы можно также сделать в одном файле types.ts

//не уверена, что везде нужно хранить deskId и deskTitle, я бы прокидывала их через props
export interface ICard {
  title: string;
  description: string;
  comments: IComment[];
  authorName: string;
  id: number;
  deskId: number;
  deskTitle: string;
}
