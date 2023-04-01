function getPokemonKey(id) {
  return `pokemon_${id}`
}

export function getPokemon(id) {
  if (id === undefined)
    throw new Error('You should pass an id to load the pokemon')

  const pokemon = JSON.parse(localStorage.getItem(getPokemonKey(id)))

  if (pokemon === null) throw new Error(`Pokemon with id: ${id} not founded`)

  return pokemon
}
