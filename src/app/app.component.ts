import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { StepperComponent } from "./components/stepper/stepper.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, AutoCompleteComponent, StepperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather';
}
