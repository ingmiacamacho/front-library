import { Autor } from "../../authors/models/authors.model";

export interface Book{
    _id: string;
    title: string;
    isbn: string;
    year: number;
    available: number;
    createdAt: string;
    updateAt: string;
    author: Autor;
}

export interface BookDTO{
    title?: string;
    isbn?: string;
    authorId?: string;
    year?: number;
}