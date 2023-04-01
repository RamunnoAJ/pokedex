import { renderAbility, renderPokemon } from './ui/card.js'
import { renderAbilitiesList, renderPokemonList } from './ui/list.js'
import { navigationListeners } from './ui/navigation.js'

export function initializePokemon() {
  renderPokemon()
  renderPokemonList()
}

export function initializeAbilities() {
  renderAbility()
  renderAbilitiesList()
}

navigationListeners()
