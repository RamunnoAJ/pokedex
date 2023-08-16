export class Ability {
  /*
   * @param {Number} id
   * @param {String} name
   * @param {Array} effectEntries
   * @param {Object} pokemon
   * */
  constructor(id, name, effectEntries, pokemon) {
    this.id = id
    this.name = name
    this.effect_entries = effectEntries
    this.pokemon = pokemon
  }

  getDescription() {
    if (!this.effect_entries) return 'This ability does not have a description'

    this.effect_entries = this.effect_entries.filter(
      effectEntry => effectEntry.language.name === 'en'
    )
    return (
      this.effect_entries[0]?.effect ||
      'This ability does not have a description'
    )
  }
}
