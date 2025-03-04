import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  imports: [TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  
  constructor(private translate : TranslateService){}
  selectLanguage(lang : string){
    this.translate.use(lang)
  }
}
