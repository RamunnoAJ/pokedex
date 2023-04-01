import {
  convertDecimetersToMeters,
  convertHectogramsToPounds,
  fetchURL,
} from '../utils/functions.js'

const API_URL = 'https://pokeapi.co/api/v2/'

export async function getPokemon(pokemonID) {
  const response = await fetchURL(`${API_URL}pokemon/${pokemonID}`)

  const pokemon = {
    name: response.name,
    id: response.id,
    height: convertDecimetersToMeters(response.height).toFixed(2),
    weight: convertHectogramsToPounds(response.weight).toFixed(2),
    stats: {
      speed: response.stats[5].base_stat,
      health: response.stats[0].base_stat,
      attack: response.stats[1].base_stat,
      defense: response.stats[2].base_stat,
      spAttack: response.stats[3].base_stat,
      spDefense: response.stats[4].base_stat,
    },
    img: response.sprites.other['official-artwork'].front_default,
    types: response.types,
  }

  return pokemon
}

export async function getPokemonList(offset) {
  const response = await fetchURL(`${API_URL}pokemon?offset=${offset}&limit=20`)
  const pokemonList = await response.results.filter(pokemon => {
    return pokemon.url.split('/')[6]
  })

  let next = response.next
  let previous = response.next

  if (response.next) next = response.next.split('=')[1].split('&')[0]

  if (response.previous)
    previous = response.previous.split('=')[1].split('&')[0]

  return { next, previous, pokemonList }
}

export async function getAbilitiesList(offset) {
  const response = await fetchURL(`${API_URL}ability?offset=${offset}&limit=20`)

  const { results } = await response
  const abilitiesList = await results.filter(ability => {
    return ability.url.split('/')[6] < 1000
  })

  let next = response.next
  let previous = response.previous

  if (response.next) next = response.next.split('=')[1].split('&')[0]

  if (response.previous)
    previous = response.previous.split('=')[1].split('&')[0]

  return { abilitiesList, next, previous }
}

export async function getAbility(abilityID = 1) {
  const ability = await fetchURL(`${API_URL}ability/${abilityID}`)

  return ability
}
