import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { StepperComponent } from "./components/stepper/stepper.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core"
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavBarComponent,
    AutoCompleteComponent,
    StepperComponent,
    TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather';

}
