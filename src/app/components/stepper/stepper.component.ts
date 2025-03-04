import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-stepper',
  imports: [CommonModule, RouterModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {

  steps = [
    { route: '/detail', label: 'Ver Detalles' },
    { route: '/favorites', label: 'Favoritos' },
    { route: '/record', label: 'Historias' }];
  selectedStep = 0;
  constructor(private router: Router) {

  }
  selectStep(index: number, route: string) {
    this.router.navigate([route])
    this.selectedStep = index;
  }
}
