import { CommonModule } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
import { WeatherService } from '../../core/services/weather.service';
import { WeatherResponse } from '../../core/interfaces/WeatherResponse.interface';
import { WeatherSignalService } from '../../core/signals/weather-signal.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, TranslateModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  isFavorite: boolean = false;
  countryDetail = computed(() => this.signalWeather.selectedOption());

  constructor(private signalWeather : WeatherSignalService) {
    effect(() => {
      const detail = this.countryDetail();
      if (detail && Object.keys(detail).length > 0) {
        this.saveToRecord(detail);
      }
      this.isFavorite = this.isInFavorites(detail as WeatherResponse);
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.saveToFavorites();
  }

  private isInFavorites(detail: WeatherResponse): boolean {
    const favorites = this.getFavorites();
    return favorites.some((item) =>
      item.location?.name === detail?.location?.name &&
      item.location?.country === detail?.location?.country
    );
  }

  private saveToRecord(detail: WeatherResponse): void {
    const record = this.getRecord();
    record.push(detail);
    this.setRecord(record);
  }

  saveToFavorites(): void {
    const detail = this.countryDetail();
    let favorites = this.getFavorites();

    if (this.isInFavorites(detail as WeatherResponse)) {
      favorites = favorites.filter(item =>
        item.location?.name !== detail?.location?.name ||
        item.location?.country !== detail?.location?.country
      );
      this.isFavorite = false;
    } else {
      favorites.push(detail as WeatherResponse);
      this.isFavorite = true;
    }

    this.setFavorites(favorites);
  }

  private getFavorites(): WeatherResponse[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  private setFavorites(favorites: WeatherResponse[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  private getRecord(): WeatherResponse[] {
    return JSON.parse(localStorage.getItem('record') || '[]');
  }

  private setRecord(record: WeatherResponse[]): void {
    localStorage.setItem('record', JSON.stringify(record));
  }

}
