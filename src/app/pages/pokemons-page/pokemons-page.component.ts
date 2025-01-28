import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonListSkeletonComponent } from "../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  public pokemons = signal<Pokemon[]>([]);
  private pokemonService = inject(PokemonService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public currentPage = toSignal<number>(this.route.queryParamMap.pipe(
    map(params => params.get('page') ?? '1'),
    map(page => isNaN(+page) ? 1 : Math.max(1, +page)),
  ));

  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.loadPokemons();
  }

  public loadPokemons(page: number = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonService.loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad }})),
        tap(() => {
          // update seo
          this.seoService.updateTitle(`Pokemon Ssr - Page ${pageToLoad}`)
          this.seoService.updateDescription('Pokemons Page');
        })
      )
      .subscribe(pokemons => this.pokemons.set(pokemons));
  }
}
