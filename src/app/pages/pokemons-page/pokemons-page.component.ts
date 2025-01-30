import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonListSkeletonComponent } from "../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  public pokemons = signal<Pokemon[]>([]);
  private pokemonService = inject(PokemonService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public currentPage = toSignal<number>(this.route.params.pipe(
    map(params => params['page'] ?? '1'),
    map(page => isNaN(+page) ? 1 : Math.max(1, +page)),
  ));

  private seoService = inject(SeoService);

  public pageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  });

  public loadPokemons(page: number = 0) {
    this.pokemonService.loadPage(this.currentPage()!)
      .pipe(
        tap(() => {
          // update seo
          this.seoService.updateTitle(`Pokemon Ssr - Page ${this.currentPage()}`)
          this.seoService.updateDescription('Pokemons Page');
        })
      )
      .subscribe(pokemons => this.pokemons.set(pokemons));
  }
}
