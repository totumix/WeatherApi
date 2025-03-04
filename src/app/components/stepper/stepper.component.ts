import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stepper',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {

  steps = [
    { route: '/detail', label: 'DETAIL' },
    { route: '/favorites', label: 'FAVORITES' },
    { route: '/record', label: 'RECORD' }
  ];
  selectedStep = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.setActiveStep();
    this.router.events.subscribe(() => {
      this.setActiveStep();
    });
  }

  setActiveStep() {
    const currentRoute = this.router.url;
    const matchedStep = this.steps.findIndex(step => currentRoute.includes(step.route));
    this.selectedStep = matchedStep !== -1 ? matchedStep : 0; 
  }

  selectStep(index: number, route: string) {
    this.router.navigate([route]);
    this.selectedStep = index;
  }
}
