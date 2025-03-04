import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResponse } from '../../core/interfaces/WeatherResponse.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, TranslateModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites: WeatherResponse[] = [];
  isAccordionOpen: boolean = false;
  accordionStates: boolean[] = [];
  paginatedFavorites: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  
  constructor() {
    this.favorites = this.getFavorites();
    this.totalPages = Math.ceil(this.favorites.length / this.itemsPerPage);
    this.updatePaginatedFavorites();
  }

  getFavorites(): WeatherResponse[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) as WeatherResponse[] : [];
  }

  toggleAccordion(index: number) {
    this.accordionStates[index] = !this.accordionStates[index];
  }

  updatePaginatedFavorites() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedFavorites= this.favorites.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedFavorites();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedFavorites();
    }
  }

}
