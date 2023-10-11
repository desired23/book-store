export interface ICategory {
    _id: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string
    books?: string[]
 }
export  interface CategoryIdType {
    _id: string;
    name: string;
    description: string;
    books?: string[];
  }