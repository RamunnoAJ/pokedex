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

export function getPokemon(id) {
  if (id === undefined)
    throw new Error('You should pass an id to get the pokemon')

  const pokemon = JSON.parse(localStorage.getItem(getPokemonKey(id)))

  if (pokemon === null) throw new Error(`Pokemon with id: ${id} not founded`)

  return pokemon
}

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

export function savePokemon(id, pokemon) {
  if (id === undefined || typeof pokemon !== 'object')
    throw new Error(
      'You should pass an id and a pokemon to save on local storage'
    )

  localStorage.setItem(getPokemonKey(id), JSON.stringify(pokemon))
}

export function savePokemonList(offset, limit, pokemonList) {
  if (
    offset === undefined ||
    limit === undefined ||
    typeof pokemonList !== 'object'
  ) {
    throw new Error('You should pass an offset a limit and a list of pokemon')
  }

  localStorage.setItem(
    getPokemonListKey(offset, limit),
    JSON.stringify(pokemonList)
  )
}

export function getAbility(id) {
  if (id === undefined)
    throw new Error('You should pass an id to get the ability')

  const ability = JSON.parse(localStorage.getItem(getAbilityKey(id)))

  if (ability === null) throw new Error(`Ability with id: ${id} not founded`)

  return ability
}

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

export function saveAbility(id, ability) {
  if (id === undefined || typeof ability !== 'object')
    throw new Error(
      'You should pass an id and an ability to save on local storage'
    )

  localStorage.setItem(getAbilityKey(id), JSON.stringify(ability))
}

export function saveAbilitiesList(offset, limit, abilitiesList) {
  if (
    offset === undefined ||
    limit === undefined ||
    typeof abilitiesList !== 'object'
  ) {
    throw new Error('You should pass an offset a limit and a list of abilities')
  }

  localStorage.setItem(
    getAbilitiesListKey(offset, limit),
    JSON.stringify(abilitiesList)
  )
}
