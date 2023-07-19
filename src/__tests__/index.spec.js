import { initializePokemon } from '../pokemon.js'
import '../index.js'

jest.mock('../pokemon.js', () => ({
  initializePokemon: jest.fn(),
  initializeAbilities: jest.fn(),
  navigationListeners: jest.fn()
}))

describe('initializePokemon', () => {
  test('initialize the pokemon', () => {
    expect(initializePokemon).toHaveBeenCalledTimes(1)
  })
})
