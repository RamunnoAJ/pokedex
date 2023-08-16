import { fetchURL } from '../utils/functions.js'
import {
  getPokemon as getPokemonFromLS,
  getPokemonList as getPokemonListFromLS,
  getAbility as getAbilityFromLS,
  getAbilitiesList as getAbilitiesListFromLS,
  savePokemon,
  saveAbility,
  saveAbilitiesList,
  savePokemonList,
} from '../storage/pokemon.js'
import { pokemonMapper } from '../mappers/pokemon.js'
import { abilityMapper } from '../mappers/abilities.js'

export const API_URL = 'https://pokeapi.co/api/v2/'

export async function getPokemon(pokemonID) {
  if (pokemonID === undefined)
    throw new Error('You should pass an id to get a pokemon')

  try {
    return getPokemonFromLS(pokemonID)
  } catch (e) {
    const pokemonApi = await fetchURL(`${API_URL}pokemon/${pokemonID}`)
    const pokemon = pokemonMapper(pokemonApi)
    pokemon.height = pokemon.getHeight()
    pokemon.weight = pokemon.getWeight()
    pokemon.stats = pokemon.getStats()
    pokemon.image = pokemon.getImage()

    savePokemon(pokemonID, pokemon)
    return pokemon
  }
}

export async function getPokemonList(offset, limit = 20) {
  try {
    return getPokemonListFromLS(offset, limit)
  } catch (e) {
    const response = await fetchURL(
      `${API_URL}pokemon?offset=${offset}&limit=${limit}`
    )
    const pokemonList = await response.results.filter(pokemon => {
      return pokemon.url.split('/')[6]
    })

    let next = response.next
    let previous = response.next

    if (response.next) next = response.next.split('=')[1].split('&')[0]

    if (response.previous)
      previous = response.previous.split('=')[1].split('&')[0]

    const newPokemonList = { pokemonList, next, previous }
    savePokemonList(offset, limit, newPokemonList)
    return { pokemonList, next, previous }
  }
}

export async function getAbilitiesList(offset, limit = 20) {
  try {
    return getAbilitiesListFromLS(offset, limit)
  } catch (e) {
    const response = await fetchURL(
      `${API_URL}ability?offset=${offset}&limit=${limit}`
    )

    const { results } = await response
    const abilitiesList = await results.filter(ability => {
      return ability.url.split('/')[6] < 1000
    })

    let next = response.next
    let previous = response.previous

    if (response.next) next = response.next.split('=')[1].split('&')[0]

    if (response.previous)
      previous = response.previous.split('=')[1].split('&')[0]

    const newAbilitiesList = { abilitiesList, next, previous }
    saveAbilitiesList(offset, limit, newAbilitiesList)
    return { abilitiesList, next, previous }
  }
}

export async function getAbility(abilityID) {
  if (abilityID === undefined)
    throw new Error('You should pass an id to get an ability')

  try {
    return getAbilityFromLS(abilityID)
  } catch (e) {
    const abilityApi = await fetchURL(`${API_URL}ability/${abilityID}`)
    const ability = abilityMapper(abilityApi)
    ability.effect_entries = ability.getDescription()

    saveAbility(abilityID, ability)
    return ability
  }
}
