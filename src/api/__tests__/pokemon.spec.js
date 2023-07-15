import { getAbility, getPokemon, getPokemonList, API_URL, getAbilitiesList } from '../pokemon.js'

describe('getPokemon', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  test('should fetch the url passed', async () => {
    global.fetch.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          const jsonPromise = new Promise(r => {
            r({
              height: 20,
              weight: 40,
              stats: [
                { base_stats: 20 },
                { base_stats: 20 },
                { base_stats: 20 },
                { base_stats: 20 },
                { base_stats: 20 },
                { base_stats: 20 },
              ],
              sprites: {
                other: {
                  'official-artwork': {
                    front_default:
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                  },
                },
              },
            })
          })
          resolve({ json: () => jsonPromise })
        })
    )

    await getPokemon(1)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}pokemon/1`
    )
  })

  test('should throw an error if the input is undefined', () => {
    expect(getPokemon()).rejects.toEqual(
      new Error('You should pass an id to get a pokemon')
    )
  })
})

describe('getAbility', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  test('should fetch the url passed', async () => {
    global.fetch.mockImplementationOnce(() => 
      new Promise(resolve => {
      const jsonPromise = new Promise(r => {
        r({
          abilities: [
            { ability: { name: 'blabla' } },
          ],
        })
      })
      resolve({ json: () => jsonPromise })
      })
    )

    await getAbility(1)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}ability/1`
    )
  })

  test('should throw an error if the input is undefined', () => {
    expect(getAbility()).rejects.toEqual(
      new Error('You should pass an id to get an ability')
    )
  })
})

describe('getPokemonList', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })  

  test('should fetch the url passed', async () => {
    global.fetch.mockImplementationOnce(() => 
      new Promise(resolve => {
      const jsonPromise = new Promise(r => {
        r({results: [{url: 'url'}, {url: 'url'}], next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20', previous: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'})
      })
      resolve({ json: () => jsonPromise })
      })
    )

    await getPokemonList(0, 20)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}pokemon?offset=0&limit=20`
    )
  })
})

describe('getAbilitiesList', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  test('should fetch the url passed', async () => {
    global.fetch.mockImplementationOnce(() => 
      new Promise(resolve => {
      const jsonPromise = new Promise(r => {
        r({results: [{url: 'url'}, {url: 'url'}], next: 'https://pokeapi.co/api/v2/ability?offset=20&limit=20', previous: 'https://pokeapi.co/api/v2/ability?offset=20&limit=20'})
      })
      resolve({ json: () => jsonPromise })
      })
    )

    await getAbilitiesList(0, 20)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}ability?offset=0&limit=20`
    )
  })
})
