import { getPokemon } from '../pokemon.js'

describe('getPokemon', () => {
  test('should throw an error if the input is undefined', () => {
    expect(getPokemon()).toThrow() 
  })
})
