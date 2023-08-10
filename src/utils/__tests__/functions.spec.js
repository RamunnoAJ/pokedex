import {
  capitalizeFirstLetter,
  convertDecimetersToMeters,
  convertHectogramsToPounds,
  fetchURL,
  roundStringToThreeChars,
} from '../functions.js'

describe('capitalizeFirstLetter function', () => {
  test('should capitalize the first letter of a string given a string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
  })

  test('should return null if the input is not a string', () => {
    expect(capitalizeFirstLetter(1)).toBe(null)
  })
})

describe('convertHectogramsToPounds function', () => {
  test('should convert hectograms to pounds', () => {
    expect(convertHectogramsToPounds(1)).toBe(0.220462)
  })

  test('should return null if the input is not a number', () => {
    expect(convertHectogramsToPounds('hello')).toBe(null)
  })
})

describe('convertDecimetersToMeters function', () => {
  test('should convert decimeters to meters', () => {
    expect(convertDecimetersToMeters(1)).toBe(0.1)
  })

  test('should return null if the input is not a number', () => {
    expect(convertDecimetersToMeters('hello')).toBe(null)
  })
})

describe('roundStringToThreeChars function', () => {
  test('should round a string to three characters', () => {
    expect(roundStringToThreeChars('he')).toBe('0he')
  })

  test('should return null if the input is not a string', () => {
    expect(roundStringToThreeChars(1)).toBe(null)
  })
})

describe('fetchURL function', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  test('should fetch the url passed', () => {
    global.fetch.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          const jsonPromise = new Promise(res => {
            res({})
          })
          resolve({ json: () => jsonPromise })
        })
    )

    fetchURL('https://pokeapi.co/api/v2/pokemon/1')
    expect(global.fetch).toHaveBeenCalledTimes(1)

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/1'
    )
  })

  test('should throw an error if the input is not a string', () => {
    expect(fetchURL()).rejects.toEqual(new Error('url must be a string'))

    expect(global.fetch).toHaveBeenCalledTimes(0)
  })
})
