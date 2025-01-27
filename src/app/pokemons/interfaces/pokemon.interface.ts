import { Ability } from "./pokeapi-response.interface";

export interface Pokemon {
    id: string;
    name: string;
    image?: string;
    sound?: string;
    abilities?: Ability[]
}