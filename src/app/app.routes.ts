import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'detail', pathMatch: 'full' },
  { path: 'detail', loadComponent: () => import('./pages/detail/detail.component').then(m => m.DetailComponent) },
  { path: 'favorites', loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent) },
  { path: 'record', loadComponent: () => import('./pages/record/record.component').then(m => m.RecordComponent) }
];
