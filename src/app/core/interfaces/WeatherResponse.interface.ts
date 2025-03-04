import { CurrentWeather } from "./CurrentWeather.interface";
import { Location } from "./Location.interface";

export interface WeatherResponse {
    location?: Location;
    current?: CurrentWeather;
}