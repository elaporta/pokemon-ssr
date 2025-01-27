// to enable http calls we need to import it in app.config.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { PokeapiListResponse, PokeapiSingleResponse, Pokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private httpClient = inject(HttpClient);
  

  constructor() { }

  loadPage(page: number): Observable<Pokemon[]> {
    page = (page > 0) ? page - 1 : 0;

    return this.httpClient.get<PokeapiListResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${ page * 20 }&limit=20`).pipe(
      map(response => {
        const pokemons: Pokemon[] = response.results.map(pokemon => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name
        }))

        return pokemons;
      })
    );
  }

  public loadPokemon(id: string): Observable<Pokemon> {
    return this.httpClient.get<PokeapiSingleResponse>(`https://pokeapi.co/api/v2/pokemon/${ id }`).pipe(
      map(response => {
        const pokemon: Pokemon = {
          id: String(response.id),
          name: response.name,
          image: response.sprites.other?.['official-artwork'].front_default,
          sound: response.cries.latest,
          abilities: response.abilities
        };
        return pokemon;
      })
    );
  }
}
