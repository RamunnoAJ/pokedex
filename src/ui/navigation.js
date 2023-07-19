import { initializeAbilities, initializePokemon } from '../pokemon.js'

export function navigationListeners() {
  const $pokemonList = document.querySelector('#pokemon-list')
  const $abilitiesList = document.querySelector('#abilities-list')

  $pokemonList.addEventListener('click', () => {
    initializePokemon()
  })

  $abilitiesList.addEventListener('click', () => {
    initializeAbilities()
  })
}
