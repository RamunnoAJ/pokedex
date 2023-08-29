import {
  convertDecimetersToMeters,
  convertHectogramsToPounds,
} from '../utils/functions.js'

export class Pokemon {
  /*
   * @param {Number} id
   * @param {String} name
   * @param {Array} types
   * @param {Array} stats
   * @param {Array} image
   * @param {Number} height
   * @param {Number} weight
   * */
  constructor(id, name, types, stats, image, height, weight) {
    this.id = id
    this.name = name
    this.types = types
    this.stats = stats
    this.image = image
    this.height = height
    this.weight = weight
  }

  getHeight() {
    return convertDecimetersToMeters(this.height).toFixed(2)
  }

  getWeight() {
    return convertHectogramsToPounds(this.weight).toFixed(2)
  }

  getImage() {
    return this.image?.other['official-artwork'].front_default || null
  }

  getStats() {
    return {
      speed: this.stats[5].base_stat,
      health: this.stats[0].base_stat,
      attack: this.stats[1].base_stat,
      defense: this.stats[2].base_stat,
      spAttack: this.stats[3].base_stat,
      spDefense: this.stats[4].base_stat,
    }
  }
}
