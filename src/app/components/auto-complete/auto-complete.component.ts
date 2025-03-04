import { Component } from '@angular/core';
import { debounceTime, filter, Observable, switchMap } from 'rxjs';
import { Country } from '../../app.component';
import { WeatherService } from '../../services/weather.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auto-complete',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.css'
})
export class AutoCompleteComponent {
  showDropdown: boolean = false;
  filteredOptions$: Observable<Country[]>;
  searchControl = new FormControl('');

  constructor(private weatherService: WeatherService) {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter(term => !!term && term.trim() !== ''),
      switchMap(term => this.weatherService.search(term))
    );
  }

  selectOption(option: string): void {
    this.showDropdown = false;
    this.weatherService.current(option).subscribe(res => this.weatherService.setOption(res))
  }

  hideDropdown() {
    setTimeout(() => this.showDropdown = false, 200);
  }

}
