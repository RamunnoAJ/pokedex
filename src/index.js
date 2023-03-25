import { fetchURL } from './fetchURL.js'
import {
  capitalizeFirstLetter,
  convertDecimetersToMeters,
  convertHectogramsToPounds,
} from './utils/functions.js'

const API_URL = 'https://pokeapi.co/api/v2/'

const $list = document.querySelector('#list')
const $listTitle = document.querySelector('#list-title')
const $pokemonCard = document.querySelector('.pokemon-card')

renderPokemon()
renderPokemonList()

async function renderPokemonList(URL = `${API_URL}pokemon`) {
  $list.innerHTML = ''
  $listTitle.textContent = "Pokemon's List"

  const response = await fetchURL(URL)
  const pokemonList = await response.results.filter(pokemon => {
    return pokemon.url.split('/')[6] < 10000
  })

  pokemonList.forEach(pokemon => {
    const pokemonNumber = pokemon.url.split('/')[6]
    let pokemonName = pokemon.name

    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)

    $list.innerHTML += `<li class='py-2 list__item'> <span class='fw-bold'>${pokemonNumber} - ${pokemonName}</span><button class='btn btn-details' id='pokemon-${pokemonNumber}'>Details</button></li>`
  })

  const buttonsDetails = document.querySelectorAll('.btn-details')
  buttonsDetails.forEach(button => {
    const pokemonID = button.id.split('-')[1]

    button.addEventListener('click', () => {
      renderPokemon(pokemonID)
    })
  })

  renderPaginationButtons(response.previous, response.next)
}

function renderPaginationButtons(prev, next) {
  const FIRST_PAGE = `${API_URL}pokemon`
  const LAST_PAGE = `${API_URL}pokemon?offset=1001`

  createPaginationButtons()

  const $btnFirst = document.querySelector('#btn-first')
  const $btnPrev = document.querySelector('#btn-prev')
  const $btnNext = document.querySelector('#btn-next')
  const $btnLast = document.querySelector('#btn-last')

  $btnFirst.addEventListener('click', () => {
    renderPokemonList(FIRST_PAGE)
  })
  $btnLast.addEventListener('click', () => {
    renderPokemonList(LAST_PAGE)
  })

  if (prev)
    $btnPrev.addEventListener('click', () => {
      renderPokemonList(prev)
    })

  if (next)
    $btnNext.addEventListener('click', () => {
      renderPokemonList(next)
    })
}

function createPaginationButtons() {
  const paginationButtons = document.createElement('div')
  paginationButtons.className = 'pagination mt-5'
  paginationButtons.innerHTML = `
  <button class="btn btn-pagination" id="btn-first"><<</button>
  <button class="btn btn-pagination" id="btn-prev">Previous</button>
  <button class="btn btn-pagination" id="btn-next">Next</button>
  <button class="btn btn-pagination" id="btn-last">>></button>
`
  $list.appendChild(paginationButtons)
}

async function renderPokemon(id = 1) {
  $pokemonCard.innerHTML = ''

  const response = await fetchURL(`${API_URL}pokemon/${id}`)
  const {
    img,
    name,
    id: pokemonID,
    height,
    weight,
    stats,
    types,
  } = createPokemonFromFetch(response)

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
        <h2 class="pokemon-card__title">${pokemonID} - ${capitalizeFirstLetter(
    name
  )}</h2>
        <p>Height: ${height}m</p>
        <p>Weight: ${weight}lb</p>

        <div class="pokemon-card__stats">
          <h3>Stats</h3>
          <ul>
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

function createPokemonFromFetch(response) {
  const pokemon = {
    name: response.name,
    id: response.id,
    height: convertDecimetersToMeters(response.height).toFixed(2),
    weight: convertHectogramsToPounds(response.weight).toFixed(2),
    stats: {
      speed: response.stats[5].base_stat,
      health: response.stats[0].base_stat,
      attack: response.stats[1].base_stat,
      defense: response.stats[2].base_stat,
      spAttack: response.stats[3].base_stat,
      spDefense: response.stats[4].base_stat,
    },
    img: response.sprites.other['official-artwork'].front_default,
    types: response.types,
  }

  return pokemon
}
