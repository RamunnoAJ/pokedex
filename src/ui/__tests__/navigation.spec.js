import { navigationListeners } from '../navigation.js'
import { initializeAbilities, initializePokemon } from '../../pokemon.js'

document.body.innerHTML = `
    <div id="pokemon-list"></div>
    <div id="abilities-list"></div>
  `

jest.mock('../../pokemon.js', () => ({
  initializePokemon: jest.fn(),
  initializeAbilities: jest.fn(),
}))

describe('navigationListeners', () => {
  test('should call initializePokemon when pokemon-list is clicked', () => {
    navigationListeners()

    const pokemonList = document.querySelector('#pokemon-list')
    pokemonList.click()
    expect(initializePokemon).toHaveBeenCalledTimes(1)
  })

  test('should call initializeAbilities when abilities-list is clicked', () => {
    const abilitiesList = document.querySelector('#abilities-list')
    abilitiesList.click()
    expect(initializeAbilities).toHaveBeenCalledTimes(1)
  })
})
