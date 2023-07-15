import { getPokemon } from '../pokemon.js'

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
      'https://pokeapi.co/api/v2/pokemon/1'
    )
  })

  test('should throw an error if the input is undefined', () => {
    expect(getPokemon()).rejects.toEqual(
      new Error('You should pass an id to get a pokemon')
    )
  })
})
