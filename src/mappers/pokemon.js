import { Pokemon } from '../entities/pokemon.js'

/*
 * @param {Object} apiData
 * @returns {Pokemon}
 * */
export function pokemonMapper(apiData) {
  const { id, name, types, stats, image, height, weight } = apiData

  return new Pokemon(id, name, types, stats, image, height, weight)
}
