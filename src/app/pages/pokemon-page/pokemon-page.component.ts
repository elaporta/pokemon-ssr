import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap } from 'rxjs';

import { Pokemon } from '../../pokemons/interfaces';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private pokemonService = inject(PokemonService);
  public pokemon = signal<Pokemon | null>(null);

  private seoService = inject(SeoService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;

    this.pokemonService.loadPokemon(id)
      .pipe(
        tap(({ id, name }) => {
          name = name.charAt(0).toUpperCase() + name.slice(1);

          // Update seo
          this.seoService.updateTitle(`Pokemon Ssr - ${ name }`);
          this.seoService.updateDescription(`Pokemon #${ id } - ${ name }`);
          this.seoService.updateImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`);
        })
      )
      .subscribe(this.pokemon.set);
  }

}
