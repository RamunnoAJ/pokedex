import { capitalizeFirstLetter, convertDecimetersToMeters, convertHectogramsToPounds, fetchURL, roundStringToThreeChars } from "../functions.js";

test("should capitalize the first letter of a string given a string", () => {
  expect(capitalizeFirstLetter("hello")).toBe("Hello")
})

test("should return null if the input is not a string", () => {
  expect(capitalizeFirstLetter(1)).toBe(null)
})

test("should convert hectograms to pounds", () => {
  expect(convertHectogramsToPounds(1)).toBe(0.220462)
})

test("should return null if the input is not a number", () => {
  expect(convertHectogramsToPounds("hello")).toBe(null)
})

test("should convert decimeters to meters", () => {
  expect(convertDecimetersToMeters(1)).toBe(0.1)
})

test("should return null if the input is not a number", () => {
  expect(convertDecimetersToMeters("hello")).toBe(null)
})

test("should round a string to three characters", () => {
  expect(roundStringToThreeChars("hello")).toBe("hel")    
})

test("should return null if the input is not a string", () => {
  expect(roundStringToThreeChars(1)).toBe(null)
})

test("should fetch the url passed", () => { 
  expect(fetchURL("https://pokeapi.co/api/v2/pokemon/1/")).resolves.toEqual({
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/"
  })
})

test("should throw an error if the input is not a string", () => {
  expect(fetchURL(1)).rejects.toThrow()
})
