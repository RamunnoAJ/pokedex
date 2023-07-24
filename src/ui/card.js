import { getAbility, getPokemon } from '../api/pokemon.js'
import {
  capitalizeFirstLetter,
  roundStringToThreeChars,
} from '../utils/functions.js'

export async function renderPokemon(pokemonID = 1) {
  const $abilityCard = document.querySelector('.ability-card')

  $abilityCard.innerHTML = ''
  const pokemon = await getPokemon(pokemonID)
  showPokemonCard(pokemon)
}

export async function renderAbility(abilityID = 1) {
  const ability = await getAbility(abilityID)

  const pokemonList = await ability.pokemon.filter(pokemon => {
    return pokemon.pokemon.url.split('/')[6] < 10000
  })

  renderPokemonListForAbility(ability, pokemonList)
}

function renderPokemonListForAbility(ability, pokemonList) {
  const $pokemonCard = document.querySelector('.pokemon-card')
  const $abilityCard = document.querySelector('.ability-card')

  $pokemonCard.innerHTML = `
  <div>
    <h2 class="pokemon-card__title">${ability.id} - ${capitalizeFirstLetter(
    ability.name
  )}</h2>
    <div class="pokemon-card__description">
      ${
        ability.effect_entries.length > 0
          ? ability.effect_entries[1].effect
          : "This ability doesn't have a description yet"
      }
    </div>
  </div>
  `

  $abilityCard.innerHTML = `
  <h3 class='mb-1'>Pokemon with ${ability.name}:</h3>
  <ul class='ability__list'>
    ${pokemonList
      .map(pokemon => {
        const pokemonName = capitalizeFirstLetter(pokemon.pokemon.name)
        const pokemonID = pokemon.pokemon.url.split('/')[6]
        const pokemonNumber = roundStringToThreeChars(pokemonID)
        const pokemonImage =
          pokemonNumber < 803
            ? `https://www.pkparaiso.com/imagenes/pokedex/sm-icons/${pokemonNumber}.png`
            : 'https://www.pkparaiso.com/skin/aplis/train.png'

        return `<li role='button' class='py-1 fw-bold list__item list__item-ability' id='pokemon-${pokemonID}'>
        <div>
        <img id='pokemonImage-${pokemonID}' src=${pokemonImage} width='32' />
        <span>${pokemonName}</span>
        </div>
        <span># ${pokemonNumber}</span>
        </li>`
      })
      .join('')}
  </ul>
  `

  const abilitiesButtons = document.querySelectorAll('.list__item-ability')
  abilitiesButtons.forEach(button => {
    const id = button.id.split('-')[1]

    button.addEventListener('click', () => {
      renderPokemon(id)
    })
  })
}

function showPokemonCard({ name, id, img, height, weight, stats, types }) {
  const $pokemonCard = document.querySelector('.pokemon-card')

  $pokemonCard.innerHTML = `
    <div class="pokemon-card__image-container">
    ${
      img
        ? `<img src="${img}"
          alt="${name}" class="pokemon-card__image">`
        : `<img src="../assets/loading-gif.gif"
        alt="${name}" class="pokemon-card__image">
        <span>There is no image for this pokemon</span>`
    }
        <div class="pokemon-card__type" id="pokemon-type">
        ${types
          .map(type => {
            return `<span class="type type-${type.type.name}">${type.type.name}</span>`
          })
          .join('')}
        </div>
      </div>
      <div>
        <h2 class="pokemon-card__title">${id} - ${capitalizeFirstLetter(
    name
  )}</h2>
        <p id='pokemon-height'>Height: ${height}m</p>
        <p id='pokemon-weight'>Weight: ${weight}lb</p>
        <div class="pokemon-card__stats">
          <h3>Stats</h3>
          <ul id='pokemon-stats'>
            <li>Speed: ${stats.speed}</li>
            <li>Health: ${stats.health}</li>
            <li>Attack: ${stats.attack}</li>
            <li>Defense: ${stats.defense}</li>
            <li>Sp-Attack: ${stats.spAttack}</li>
            <li>Sp-Defense: ${stats.spDefense}</li>
          </ul>
        </div>
      </div>`
}
