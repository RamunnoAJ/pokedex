/*
 * @typeof {import('../entities/abilities.js').Ability} Ability
 * @typeof {import('../entities/pokemon.js').Pokemon} Pokemon
 * */

function getPokemonListKey(offset, limit) {
  return `pokemon_${offset}_${limit}`
}

function getPokemonKey(id) {
  return `pokemon_${id}`
}

function getAbilityKey(id) {
  return `ability_${id}`
}

function getAbilitiesListKey(offset, limit) {
  return `ability_${offset}_${limit}`
}

/*
 * @param {Number} id
 * @return {Pokemon}
 * */
export function getPokemon(id) {
  if (id === undefined)
    throw new Error('You should pass an id to get the pokemon')

  const pokemon = JSON.parse(localStorage.getItem(getPokemonKey(id)))

  if (pokemon === null) throw new Error(`Pokemon with id: ${id} not founded`)

  return pokemon
}

/*
 * @param {Number} offset
 * @param {Number} limit
 * @return {Array<Pokemon>}
 * */
export function getPokemonList(offset = 0, limit = 20) {
  const pokemonList = JSON.parse(
    localStorage.getItem(getPokemonListKey(offset, limit))
  )

  if (pokemonList === null)
    throw new Error(
      `Pokemon list with offset ${offset} and limit ${limit} not founded`
    )

  return pokemonList
}

/*
 * @param {Number} id
 * @param {Pokemon} pokemon
 * */
export function savePokemon(id, pokemon) {
  if (id === undefined || typeof pokemon !== 'object')
    throw new Error(
      'You should pass an id and a pokemon to save on local storage'
    )

  localStorage.setItem(getPokemonKey(id), JSON.stringify(pokemon))
}

/*
 * @param {Number} offset
 * @param {Number} limit
 * @param {Array<Pokemon>} pokemonList
 * */
export function savePokemonList(offset, limit, pokemonList) {
  if (offset === undefined || limit === undefined) {
    throw new Error('You should pass an offset a limit and a list of pokemon')
  }

  if (typeof pokemonList !== 'object') {
    throw new Error('The parameter pokemonList should be an object')
  }

  localStorage.setItem(
    getPokemonListKey(offset, limit),
    JSON.stringify(pokemonList)
  )
}

/*
 * @param {Number} id
 * @return {Ability}
 * */
export function getAbility(id) {
  if (id === undefined)
    throw new Error('You should pass an id to get the ability')

  const ability = JSON.parse(localStorage.getItem(getAbilityKey(id)))

  if (ability === null) throw new Error(`Ability with id: ${id} not founded`)

  return ability
}

/*
 * @param {Number} offset
 * @param {Number} limit
 * @return {Array<Ability>}
 * */
export function getAbilitiesList(offset = 0, limit = 20) {
  const abilitiesList = JSON.parse(
    localStorage.getItem(getAbilitiesListKey(offset, limit))
  )

  if (abilitiesList === null)
    throw new Error(
      `Abilities list with offset ${offset} and limit ${limit} not founded`
    )

  return abilitiesList
}

/*
 * @param {Number} id
 * @param {Ability} ability
 * */
export function saveAbility(id, ability) {
  if (id === undefined)
    throw new Error('You should pass an id to save on local storage')

  if (typeof ability !== 'object') {
    throw new Error('The parameter ability should be an object')
  }

  localStorage.setItem(getAbilityKey(id), JSON.stringify(ability))
}

/*
 * @param {Number} offset
 * @param {Number} limit
 * @param {Array<Ability>} abilitiesList
 */
export function saveAbilitiesList(offset, limit, abilitiesList) {
  if (offset === undefined || limit === undefined) {
    throw new Error('You should pass an offset and a limit')
  }

  if (typeof abilitiesList !== 'object') {
    throw new Error('The parameter abilitiesList should be an object')
  }

  localStorage.setItem(
    getAbilitiesListKey(offset, limit),
    JSON.stringify(abilitiesList)
  )
}
