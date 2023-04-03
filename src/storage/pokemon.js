function getPokemonListKey(offset, limit) {
  return `pokemon_${offset}_${limit}`
}

function getPokemonKey(id) {
  return `pokemon_${id}`
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
