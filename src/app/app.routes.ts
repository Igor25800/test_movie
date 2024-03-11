import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home//home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.component').then((c) => c.MoviesComponent),
  },
  {
    path: 'series',
    loadComponent: () => import('./pages/movies/movies.component').then((c) => c.MoviesComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
