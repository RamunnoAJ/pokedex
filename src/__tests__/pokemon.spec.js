import { initializeAbilities, initializePokemon } from "../pokemon.js";
import fixture from './pokemon.fixture.js'
import fixturePokemonList from '../../cypress/fixtures/list-page-1.json'
import fixtureAbilitiesList from '../../cypress/fixtures/abilities-list-page-1.json'
import fixturePokemon from '../../cypress/fixtures/bulbasaur.json'
import fixtureAbility from '../../cypress/fixtures/stench.json'

jest.mock('../ui/navigation.js', () => ({
  navigationListeners: jest.fn()
}))

describe('initializePokemon', () => {
  beforeEach(() => {
    document.body.innerHTML = fixture
  })

  test('should call the fetch with the pokemon', async () => {
    global.fetch = jest.fn()
      .mockImplementation(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r(fixturePokemon)
        })
        resolve({ json: () => jsonPromise })
      }))

    expect(await (await global.fetch()).json()).toEqual(fixturePokemon)
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  test('should call the fetch with the list', async () => {
    global.fetch = jest.fn()
      .mockImplementation(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r(fixturePokemonList)
        })
        resolve({ json: () => jsonPromise })
      }))

    expect(await (await global.fetch()).json()).toEqual(fixturePokemonList)
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  test('should render the list, the pokemon and the list title', async () => {
  global.fetch = jest.fn()
    .mockImplementation(() => new Promise((resolve) => {
      const jsonPromise = new Promise((r) => {
        r({...fixturePokemonList, ...fixturePokemon})
      })
      resolve({ json: () => jsonPromise })
    }))

    await initializePokemon()
    expect(document.querySelector('.pokemon-card__title').textContent).toContain('Bulbasaur')    
    expect(document.querySelector('#list-title').textContent).toContain("Pokemon's List")
    expect(document.querySelectorAll('#list li')).toHaveLength(20)
  })
})

describe('initializeAbilities', () => {
  beforeEach(() => {
    document.body.innerHTML = fixture
  })

  test('should call the fetch with the pokemon', async () => {
    global.fetch = jest.fn()
      .mockImplementation(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r(fixturePokemon)
        })
        resolve({ json: () => jsonPromise })
      }))

    expect(await (await global.fetch()).json()).toEqual(fixturePokemon)
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  test('should call the fetch with the list', async () => {
    global.fetch = jest.fn()
      .mockImplementation(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r(fixtureAbilitiesList)
        })
        resolve({ json: () => jsonPromise })
      }))
  
    expect(await (await global.fetch()).json()).toEqual(fixtureAbilitiesList)
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  test('should render the list, the pokemon and the list title', async () => {
  global.fetch = jest.fn()
    .mockImplementation(() => new Promise((resolve) => {
      const jsonPromise = new Promise((r) => {
        r({...fixtureAbilitiesList, ...fixtureAbility})
      })
      resolve({ json: () => jsonPromise })
    }))

    await initializeAbilities()
    expect(document.querySelector('.pokemon-card__title').textContent).toContain('Stench')
    expect(document.querySelector('#list-title').textContent).toContain("Abilities' List")
    expect(document.querySelectorAll('#list li')).toHaveLength(20)
  })
})
