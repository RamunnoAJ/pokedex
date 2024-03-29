import { getAbilitiesList, getAbility, getPokemon, getPokemonList, saveAbilitiesList, saveAbility, savePokemon, savePokemonList } from '../pokemon.js'

describe('getPokemon', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem.mockClear()
  })

  test('should throw an error if the input is undefined', () => {
    expect(() => getPokemon()).toThrow(new Error('You should pass an id to get the pokemon')) 
  })

  test('should throw an error if it doesn\'t find the pokemon', () => {
    expect(() => getPokemon(1)).toThrow(new Error(`Pokemon with id: 1 not founded`))
  })

  test('should return the pokemon', () => {
    localStorage.setItem('pokemon_1', JSON.stringify({ name: 'Charizard', id: 1 }))

    expect(getPokemon(1)).toEqual({ name: 'Charizard', id: 1 })
    expect(localStorage.getItem).toHaveBeenCalledWith('pokemon_1')
  })
})

describe('getPokemonList', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem.mockClear()
  })

  test('should be called with default parameters if none is passed', () => {
    localStorage.setItem('pokemon_0_20', JSON.stringify({name: 'Charizard', id: 1}))
    expect(getPokemonList()).toEqual({name: 'Charizard', id: 1})
  })

  test('should throw an error if pokemonList doesn\'t exist', () => {
    expect(() => getPokemonList(0, 20)).toThrow(new Error(`Pokemon list with offset 0 and limit 20 not founded`))
  })
})

describe('savePokemon', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem.mockClear()
  })

  test('should throw an error if one or both of the inputs are undefined', () => {
    expect(() => savePokemon(undefined, 2)).toThrow(new Error('You should pass an id and a pokemon to save on local storage'))
    expect(() => savePokemon(1, undefined)).toThrow(new Error('You should pass an id and a pokemon to save on local storage'))
    expect(() => savePokemon()).toThrow(new Error('You should pass an id and a pokemon to save on local storage'))
  })

  test('should save the pokemon', () => {
    savePokemon(1, {name: 'Charizard', id: 1})
    expect(localStorage.setItem).toHaveBeenCalledWith('pokemon_1', JSON.stringify({name: 'Charizard', id: 1}))
  })
})

describe('savePokemonList', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem.mockClear()
  })

  test('should throw an error if one or both of the inputs are undefined', () => {
    expect(() => savePokemonList(undefined, 20)).toThrow(new Error('You should pass an offset a limit and a list of pokemon')
    )
    expect(() => savePokemonList(0, undefined)).toThrow(new Error('You should pass an offset a limit and a list of pokemon')
    )
    expect(() => savePokemonList()).toThrow(new Error('You should pass an offset a limit and a list of pokemon')
    )
  })

  test('should throw an error if pokemonList is not of type object', () => {
    expect(() => savePokemonList(0, 20, 1)).toThrow(new Error('The parameter pokemonList should be an object')
    )
  })

  test('should save the pokemonList', () => {
    savePokemonList(0, 20, [{name: 'Charizard', id: 1}])
    expect(localStorage.setItem).toHaveBeenCalledWith('pokemon_0_20', JSON.stringify([{name: 'Charizard', id: 1}]))
  })
})

describe('getAbility', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem.mockClear()
  })

  test('should throw an error if the input is undefined', () => {
    expect(() => getAbility()).toThrow(new Error('You should pass an id to get the ability'))
  })

  test('should throw an error if it doesn\'t find the ability', () => {
    expect(() => getAbility(1)).toThrow(new Error(`Ability with id: 1 not founded`))
  })

  test('should return the ability', () => {
    localStorage.setItem('ability_1', JSON.stringify({name: 'Stench', id: 1}))

    expect(getAbility(1)).toEqual({name: 'Stench', id: 1})
  })
})

describe('getAbilitiesList', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem.mockClear()
  })

  test('should be called with default parameters if none are passed', () => {
    localStorage.setItem('ability_0_20', JSON.stringify({name: 'Stench', id: 1}))
    expect(getAbilitiesList()).toEqual({name: 'Stench', id: 1})
  })

  test('should throw an error if abilitiesList doesn\'t exist', () => {
    expect(() => getAbilitiesList(0, 20)).toThrow(new Error(`Abilities list with offset 0 and limit 20 not founded`))
  })

  test('should return the abilitiesList', () => {
    localStorage.setItem('ability_0_20', JSON.stringify({name: 'Stench', id: 1}))

    expect(getAbilitiesList(0, 20)).toEqual({name: 'Stench', id: 1})
  })
})

describe('saveAbility', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem.mockClear()
  })

  test('should throw an error the parameter id is undefined', () => {
    expect(() => saveAbility(undefined)).toThrow(new Error('You should pass an id to save on local storage'))
  })

  test('should throw an error if the parameter ability is not an object', () => {
    expect(() => saveAbility(1, 2)).toThrow(new Error('The parameter ability should be an object'))   
  })

  test('should save the ability', () => {
    saveAbility(1, {name: 'Charizard', id: 1})
    expect(localStorage.setItem).toHaveBeenCalledWith('ability_1', JSON.stringify({name: 'Charizard', id: 1}))
  })
})

describe('saveAbilitiesList', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    localStorage.setItem.mockClear()
  })

  test('should throw an error if one or both of the inputs are undefined', () => {
    expect(() => saveAbilitiesList(undefined, 20)).toThrow(new Error('You should pass an offset and a limit'))
    expect(() => saveAbilitiesList(0, undefined)).toThrow(new Error('You should pass an offset and a limit'))
    expect(() => saveAbilitiesList()).toThrow(new Error('You should pass an offset and a limit'))
  })

  test('should throw an error if the parameter abilitiesList is not of type object', () => {
    expect(() => saveAbilitiesList(0, 20, 1)).toThrow(new Error('The parameter abilitiesList should be an object'))
  })

  test('should save the abilitiesList', () => {
    saveAbilitiesList(0, 20, [{name: 'Charizard', id: 1}])
    expect(localStorage.setItem).toHaveBeenCalledWith('ability_0_20', JSON.stringify([{name: 'Charizard', id: 1}]))
  })
})
