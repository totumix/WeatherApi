import { Component } from '@angular/core';
import { debounceTime, filter, Observable, switchMap } from 'rxjs';
import { WeatherService } from '../../core/services/weather.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Country } from '../../core/interfaces/Country.interface';
import { WeatherSignalService } from '../../core/signals/weather-signal.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auto-complete',
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.css'
})
export class AutoCompleteComponent {
  showDropdown: boolean = false;
  filteredOptions$: Observable<Country[]>;
  searchControl = new FormControl('');

  constructor(
    private weatherService: WeatherService,
    private signalWeather : WeatherSignalService,
    private router: Router
  ) {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter(term => !!term && term.trim() !== ''),
      switchMap(term => this.weatherService.search(term))
    );
  }

  selectOption(option: string): void {
    this.showDropdown = false;
    this.weatherService.current(option).subscribe(
      res => {
        this.signalWeather.setOption(res);
        this.router.navigate(['detail']);
      },
      error => {
        console.error('Error al obtener el clima:', error);
      }
    );
  }

  hideDropdown() {
    setTimeout(() => this.showDropdown = false, 200);
  }

}
