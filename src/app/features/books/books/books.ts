
import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BookService } from '../services/books';
import { Book, BookDTO } from '../models/books.model';

import { AuthorsService } from '../../authors/services/authors';
import { Autor } from '../../authors/models/authors.model';

@Component({
  selector: 'my-books',
  imports: [FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.scss',
})
export class Books implements OnInit {

  private _bookService = inject(BookService);
  private _authorsService = inject(AuthorsService);

  books = signal<Book[]>([]);
  authors = signal<Autor[]>([]);

  showForm = signal(false);

  // Datos del formulario
  title = '';
  isbn = '';
  year: number | null = null;
  authorId = '';

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
  }

  // Consultar libros
  loadBooks(): void {
    this._bookService.getBooks().subscribe({
      next: (data) => {
        this.books.set(data);
        console.log('Libros consultados correctamente', data);
      },
      error: (err) => {
        console.log('No se consultaron los libros', err);
      }
    });
  }

  // Consultar autores
  loadAuthors(): void {
    this._authorsService.getAuthors().subscribe({
      next: (data) => {
        this.authors.set(data);
        console.log('Autores consultados correctamente', data);
      },
      error: (err) => {
        console.log('No se consultaron los autores', err);
      }
    });
  }

  // Abrir formulario
  openForm(): void {
    this.showForm.set(true);
  }

  // Cerrar formulario
  closeForm(): void {
    this.showForm.set(false);
    this.resetForm();
  }

  // Limpiar formulario
  resetForm(): void {
    this.title = '';
    this.isbn = '';
    this.year = null;
    this.authorId = '';
  }

  // Crear libro
  saveBook(): void {

    if (!this.title || !this.isbn || !this.authorId || this.year === null) {
      alert('Por favor completa todos los campos');
      return;
    }

    const payload: BookDTO = {
      title: this.title,
      isbn: this.isbn,
      authorId: this.authorId,
      year: this.year
    };

    this._bookService.createBook(payload).subscribe({
      next: (created) => {
        console.log('Libro creado correctamente', created);

        this.loadBooks();
        this.closeForm();
      },
      error: (err) => {
        console.log('Error al crear el libro', err);
        alert('No se pudo registrar el libro. Revisa los datos.');
      }
    });
  }
}
