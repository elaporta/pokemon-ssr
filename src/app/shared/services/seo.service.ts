import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  constructor() { }

  public updateTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'og:title', content: title });
  }

  public updateDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'og:description', content: description });
  }

  public updateImage(imageUrl: string) {
    this.meta.updateTag({ name: 'og:image', content: imageUrl });
  }

  public updateKeywords(keywords: string) {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }
}
