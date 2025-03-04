import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { WeatherResponse } from '../interfaces/WeatherResponse.interface';
import { Country } from '../interfaces/Country.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  readonly baseUrl = "http://api.weatherapi.com/v1";
  readonly key = "401ee40ba70a46d5b4f213346250303"

  search(country: string | null): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.baseUrl}/search.json?key=${this.key}&q=${country}`).pipe(
      shareReplay(1)
    );
  }

  current(country: string): Observable<WeatherResponse> {
    return this._http.get<WeatherResponse>(`${this.baseUrl}/current.json?key=${this.key}&q=${country}`).pipe(
      shareReplay(1)
    );
  }

 

}
