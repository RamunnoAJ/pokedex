import { Ability } from '../entities/abilities.js'

export function abilityMapper(ability) {
  const { id, name, effect_entries: effectEntries, pokemon } = ability

  return new Ability(id, name, effectEntries, pokemon)
}
