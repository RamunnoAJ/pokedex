import { initializeAbilities, initializePokemon } from '../pokedex.js'

const $pokemonList = document.querySelector('#pokemon-list')
const $abilitiesList = document.querySelector('#abilities-list')

export function navigationListeners() {
  $pokemonList.addEventListener('click', () => {
    initializePokemon()
  })

  $abilitiesList.addEventListener('click', () => {
    initializeAbilities()
  })
}
