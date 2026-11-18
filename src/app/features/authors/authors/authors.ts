
import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthorsService } from '../services/authors';
import { Autor } from '../models/authors.model';

@Component({
  selector: 'my-authors',
  imports: [FormsModule],
  templateUrl: './authors.html',
  styleUrl: './authors.scss',
})
export class Authors implements OnInit {

  private _authorsService = inject(AuthorsService);

  authors = signal<Autor[]>([]);
  showForm = signal(false);
  editingId = signal<string | null>(null);

  form = {
    name: '',
    nationality: '',
    birthYear: new Date().getFullYear()
  };

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this._authorsService.getAuthors().subscribe({
      next: (data) => {
        this.authors.set(data);
        console.log('Autores consultados', data);
      },
      error: (err) => {
        console.log('No se consultaron los autores', err);
      }
    });
  }

  newAuthor(): void {
    this.resetForm();
    this.showForm.set(true);
  }

  saveAuthor(): void {
    const payload: Partial<Autor> = {
      name: this.form.name,
      nationality: this.form.nationality,
      birthYear: Number(this.form.birthYear)
    };

    if (this.editingId()) {
      this._authorsService.updateAuthor(
        this.editingId()!,
        payload
      ).subscribe({
        next: () => {
          console.log('Autor actualizado correctamente');
          this.loadAuthors();
          this.resetForm();
        },
        error: (err) => {
          console.log('Error al actualizar autor', err);
        }
      });
    } else {
      this._authorsService.createAuthor(payload).subscribe({
        next: () => {
          console.log('Autor creado correctamente');
          this.loadAuthors();
          this.resetForm();
        },
        error: (err) => {
          console.log('Error al crear autor', err);
        }
      });
    }
  }

  editAuthor(autor: Autor): void {
    this.form = {
      name: autor.name,
      nationality: autor.nationality,
      birthYear: autor.birthYear
    };

    this.editingId.set(autor._id);
    this.showForm.set(true);
  }

  deleteAuthor(id: string): void {
    if (confirm('¿Estás seguro de eliminar este autor?')) {
      this._authorsService.deleteAuthor(id).subscribe({
        next: () => {
          console.log('Autor eliminado correctamente');
          this.loadAuthors();
        },
        error: (err) => {
          console.log('Error al eliminar autor', err);
        }
      });
    }
  }

  resetForm(): void {
    this.form = {
      name: '',
      nationality: '',
      birthYear: new Date().getFullYear()
    };

    this.editingId.set(null);
    this.showForm.set(false);
  }
}
