import { Injectable, signal } from '@angular/core';
import { WeatherResponse } from '../interfaces/WeatherResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherSignalService {
  private _selectedOption = signal<WeatherResponse | null>(null);

  constructor() { }

  get selectedOption() {
    return this._selectedOption;
  }

  setOption(selectedOption: WeatherResponse) {
    this._selectedOption.set(selectedOption);
  }
}
