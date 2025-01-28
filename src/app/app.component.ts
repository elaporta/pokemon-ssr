import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateKeywords('Pokemon,Ssr,Angular');
  }

}
