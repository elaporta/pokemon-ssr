import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    // Update seo
    this.seoService.updateTitle('Pokemon Ssr - Contact Page');
    this.seoService.updateDescription('Contact Page');
  }
}
