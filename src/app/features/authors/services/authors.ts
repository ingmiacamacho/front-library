
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models/authors.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private apiUrl = 'https://biblioteca-api-3uee.onrender.com/api/v1/authors';

  constructor(private http: HttpClient) {}

  // Consultar todos los autores
  getAuthors(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  // Consultar autor por ID
  getAuthorById(id: string): Observable<Autor> {
    return this.http.get<Autor>(`${this.apiUrl}/${id}`);
  }

  // Crear autor
  createAuthor(autor: Partial<Autor>): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  // Actualizar autor
  updateAuthor(id: string, autor: Partial<Autor>): Observable<Autor> {
    return this.http.put<Autor>(`${this.apiUrl}/${id}`, autor);
  }

  // Eliminar autor
  deleteAuthor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
