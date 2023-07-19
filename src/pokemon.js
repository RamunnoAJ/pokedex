import { renderAbility, renderPokemon } from './ui/card.js'
import { renderAbilitiesList, renderPokemonList } from './ui/list.js'
import { navigationListeners } from './ui/navigation.js'

export async function initializePokemon() {
  await renderPokemon()
  await renderPokemonList()
}

export async function initializeAbilities() {
  await renderAbility()
  await renderAbilitiesList()
}

navigationListeners()
