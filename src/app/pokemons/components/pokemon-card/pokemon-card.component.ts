import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Pokemon } from '../../interfaces';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input.required<Pokemon>();
  public readonly pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ this.pokemon().id }.png`);

  // the effect is executed everytime this.pokemon (signal) changes
  logEffect = effect(() => {
    // console.log('Pokemon', this.pokemon());
  });
}
