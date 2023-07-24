import { renderPokemon, renderAbility } from '../card.js'
import bulbasaurFixture from '../../../cypress/fixtures/bulbasaur.json'
import pokemonFixture from '../../__tests__/pokemon.fixture.js'
import miraidonFixture from '../../../cypress/fixtures/miraidon.json'
import stenchFixture from '../../../cypress/fixtures/stench.json'
import shieldFixture from '../../../cypress/fixtures/shield.json'

describe('renderPokemon', () => {
  beforeEach(() => {
    document.body.innerHTML = pokemonFixture
  })

  test('should render pokemon', async () => {
    const pokemon = bulbasaurFixture

    global.fetch = jest.fn().mockImplementationOnce(
      () =>
        new Promise(resolve => {
          const jsonPromise = new Promise(r => {
            r(bulbasaurFixture)
          })
          resolve({ json: () => jsonPromise })
        })
    )

    await renderPokemon()

    expect(document.querySelector('#pokemon-type').textContent).toContain(
      pokemon.types[0].type.name
    )
    expect(document.querySelector('#pokemon-type').textContent).toContain(
      pokemon.types[1].type.name
    )
    expect(document.querySelector('#pokemon-height').textContent).toContain(
      'Height: 0.70m'
    )
    expect(document.querySelector('#pokemon-weight').textContent).toContain(
      'Weight: 15.21lb'
    )
    expect(document.querySelector('#pokemon-stats').textContent).toContain(
      pokemon.stats[0].base_stat.toString()
    )
    expect(document.querySelector('#pokemon-stats').textContent).toContain(
      pokemon.stats[1].base_stat.toString()
    )
    expect(document.querySelector('#pokemon-stats').textContent).toContain(
      pokemon.stats[2].base_stat.toString()
    )
    expect(document.querySelector('#pokemon-stats').textContent).toContain(
      pokemon.stats[3].base_stat.toString()
    )
    expect(document.querySelector('#pokemon-stats').textContent).toContain(
      pokemon.stats[4].base_stat.toString()
    )
    expect(document.querySelector('#pokemon-stats').textContent).toContain(
      pokemon.stats[5].base_stat.toString()
    )
  })

  test('should render the pokemon without an ability description and an image', async () => {
    const pokemon = miraidonFixture

    global.fetch = jest.fn().mockImplementationOnce(
      () =>
        new Promise(resolve => {
          const jsonPromise = new Promise(r => {
            r(pokemon)
          })
          resolve({ json: () => jsonPromise })
        })
    )

    await renderPokemon(pokemon.id)

    expect(
      document.querySelector('.pokemon-card__image').getAttribute('src')
    ).toContain('loading-gif')
  })
})

describe('renderAbility', () => {
  beforeEach(() => {
    document.body.innerHTML = pokemonFixture
  })

  test('should render ability', async () => {
    const ability = stenchFixture

    global.fetch = jest.fn().mockImplementationOnce(
      () =>
        new Promise(resolve => {
          const jsonPromise = new Promise(r => {
            r(ability)
          })
          resolve({ json: () => jsonPromise })
        })
    )

    await renderAbility()

    expect(
      document.querySelector('.pokemon-card__title').textContent
    ).toContain('1 - Stench')
    expect(
      document.querySelector('.pokemon-card__description').textContent
    ).toContain(ability.effect_entries[1].effect)

    global.fetch = jest.fn().mockImplementationOnce(() => new Promise(resolve => {
      const jsonPromise = new Promise (r => {
        r(bulbasaurFixture)
      })
      resolve({json: () => jsonPromise})
    }))

    const $pokemonButton = document.querySelector('#pokemon-44')
    $pokemonButton.click()

    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/44')
  })

  test('should render the ability without an ability description and an image', async () => {
    const ability = shieldFixture

    global.fetch = jest.fn().mockImplementationOnce(
      () =>
        new Promise(resolve => {
          const jsonPromise = new Promise(r => {
            r(ability)
          })
          resolve({ json: () => jsonPromise })
        })
    )

    await renderAbility(ability.id)

    expect(
      document.querySelector('#pokemonImage-804').getAttribute('src')
    ).toContain('train')
  })
})
