export function capitalizeFirstLetter(word) {
  if (typeof word !== 'string') return null
  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
  return capitalizedWord
}

export function convertHectogramsToPounds(hectograms) {
  if (typeof hectograms !== 'number') return null
  const POUND_CONVERT_RATE = 0.220462
  return hectograms * POUND_CONVERT_RATE
}

export function convertDecimetersToMeters(decimeters) {
  if (typeof decimeters !== 'number') return null
  const METER_CONVERT_RATE = 0.1
  return decimeters * METER_CONVERT_RATE
}

export function roundStringToThreeChars(string) {
  if (typeof string !== 'string') return null
  for (let i = 0; string.length < 3; i++) {
    string = '0' + string
  }

  return string
}

export async function fetchURL(url) {
  if (typeof url !== 'string') throw new Error('url must be a string')
  const response = await fetch(url)

  return await response.json()
}
