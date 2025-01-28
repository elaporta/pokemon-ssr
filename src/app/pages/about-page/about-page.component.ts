import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    // Update seo
    this.seoService.updateTitle('Pokemon Ssr - About Page');
    this.seoService.updateDescription('About Page');
  }
}
