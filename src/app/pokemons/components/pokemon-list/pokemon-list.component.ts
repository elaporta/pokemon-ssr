import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { Pokemon } from '../../interfaces';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {

  public pokemons = input.required<Pokemon[]>();
}
