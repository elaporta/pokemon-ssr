import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private seoService = inject(SeoService);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // validates client side
    if(isPlatformBrowser(this.platform)) {
      console.log('hello client (❁´◡`❁)');
    }

    // Update seo
    this.seoService.updateTitle('Pokemon Ssr - Pricing Page');
    this.seoService.updateDescription('Pricing Page');
  }
}
