export function capitalizeFirstLetter(word) {
  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
  return capitalizedWord
}

export function convertHectogramsToPounds(hectograms) {
  const POUND_CONVERT_RATE = 0.220462
  return hectograms * POUND_CONVERT_RATE
}

export function convertDecimetersToMeters(decimeters) {
  const METER_CONVERT_RATE = 0.1
  return decimeters * METER_CONVERT_RATE
}
