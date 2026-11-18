
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookDTO } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private postman = inject(HttpClient);

  private url = 'https://biblioteca-api-3uee.onrender.com/api/v1/books';

  // Consultar todos los libros
  getBooks(): Observable<Book[]> {
    return this.postman.get<Book[]>(this.url);
  }

  // Consultar un libro por su ID
  getBooksById(id: string): Observable<Book> {
    return this.postman.get<Book>(`${this.url}/${id}`);
  }

  // Registrar un libro
  createBook(dataBook: BookDTO): Observable<Book> {
    return this.postman.post<Book>(this.url, dataBook);
  }

  // Actualizar un libro
  updateBook(id: string, dataBook: Partial<BookDTO>): Observable<Book> {
    return this.postman.put<Book>(`${this.url}/${id}`, dataBook);
  }

  // Eliminar un libro
  deleteBook(id: string): Observable<any> {
    return this.postman.delete(`${this.url}/${id}`);
  }
}
