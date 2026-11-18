import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'books',
    loadComponent: () =>
      import('./features/books/books/books')
        .then(m => m.Books)
  },
  {
    path: 'authors',
    loadComponent: () =>
      import('./features/authors/authors/authors')
        .then(m => m.Authors)
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  }
];