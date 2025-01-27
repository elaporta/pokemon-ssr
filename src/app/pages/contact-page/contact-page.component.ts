import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({ name: 'description', content: 'Pokemon Ssr Contact Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Pokemon,Ssr,Angular' });
  }
}
