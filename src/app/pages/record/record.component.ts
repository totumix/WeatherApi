import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../core/services/weather.service';
import { Router } from '@angular/router';
import { WeatherResponse } from '../../core/interfaces/WeatherResponse.interface';
import { WeatherSignalService } from '../../core/signals/weather-signal.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-record',
  imports: [CommonModule, TranslateModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent {
  public record: WeatherResponse[] = [];
  paginatedRecords: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private signalWeather : WeatherSignalService
  ) {
    this.record = this.getRecords();
    this.totalPages = Math.ceil(this.record.length / this.itemsPerPage);
    this.updatePaginatedRecords();
  }

  getRecords(): WeatherResponse[] {
    const records = localStorage.getItem('record');
    return records ? JSON.parse(records) as WeatherResponse[] : [];
  }

  updatePaginatedRecords() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedRecords = this.record.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRecords();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRecords();
    }
  }

  viewCountryDetail(country: WeatherResponse) {
    this.signalWeather.setOption(country);
    this.router.navigate(['detail'])
  }
}
