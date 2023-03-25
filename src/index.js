import { fetchURL } from './fetchURL.js'
import {
  capitalizeFirstLetter,
  convertDecimetersToMeters,
  convertHectogramsToPounds,
  roundStringToThreeChars,
} from './utils/functions.js'

const API_URL = 'https://pokeapi.co/api/v2/'

const $list = document.querySelector('#list')
const $listTitle = document.querySelector('#list-title')
const $pokemonCard = document.querySelector('.pokemon-card')
const $pokemonList = document.querySelector('#pokemon-list')
const $abilitiesList = document.querySelector('#abilities-list')
const $abilityCard = document.querySelector('.ability-card')

function initializePokemon() {
  renderPokemon()
  renderPokemonList()
}

initializePokemon()

$pokemonList.addEventListener('click', () => {
  initializePokemon()
})

async function renderPokemonList(URL = `${API_URL}pokemon`) {
  $list.innerHTML = ''
  $listTitle.textContent = "Pokemon's List"

  const response = await fetchURL(URL)
  const pokemonList = await response.results.filter(pokemon => {
    return pokemon.url.split('/')[6] < 10000
  })

  pokemonList.forEach(pokemon => {
    const pokemonNumber = pokemon.url.split('/')[6]
    const pokemonName = capitalizeFirstLetter(pokemon.name)

    $list.innerHTML += `<li class='py-2 list__item'> <span class='fw-bold'>${roundStringToThreeChars(
      pokemonNumber
    )} - ${pokemonName}</span><button class='btn btn-details' id='pokemon-${pokemonNumber}'>Details</button></li>`
  })

  const buttonsDetails = document.querySelectorAll('.btn-details')
  buttonsDetails.forEach(button => {
    const pokemonID = button.id.split('-')[1]

    button.addEventListener('click', () => {
      renderPokemon(pokemonID)
    })
  })

  renderPaginationButtons(response.previous, response.next, renderPokemonList)
}

function renderPaginationButtons(
  prev,
  next,
  renderFunction,
  section = 'pokemon'
) {
  const offset = section === 'pokemon' ? 1000 : 280

  const FIRST_PAGE = `${API_URL}${section}`
  const LAST_PAGE_TO_RENDER = `${API_URL}${section}?offset=${offset}`
  const LAST_PAGE = `${API_URL}${section}?offset=${offset + 20}`

  createPaginationButtons()

  const $btnFirst = document.querySelector('#btn-first')
  const $btnPrev = document.querySelector('#btn-prev')
  const $btnNext = document.querySelector('#btn-next')
  const $btnLast = document.querySelector('#btn-last')

  $btnFirst.addEventListener('click', () => {
    renderFunction(FIRST_PAGE)
  })
  $btnLast.addEventListener('click', () => {
    renderFunction(LAST_PAGE_TO_RENDER)
  })

  if (prev)
    $btnPrev.addEventListener('click', () => {
      renderFunction(prev)
    })

  if (!next.includes(LAST_PAGE))
    $btnNext.addEventListener('click', () => {
      renderFunction(next)
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
  $abilityCard.innerHTML = ''

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

// ? ABILITIES

$abilitiesList.addEventListener('click', () => {
  initializeAbilities()
})

function initializeAbilities() {
  renderAbility()
  renderAbilitiesList()
}

async function renderAbility(id = 1) {
  const response = await fetchURL(`${API_URL}ability/${id}`)
  const {
    name,
    pokemon,
    id: abilityID,
    effect_entries: effectEntries,
  } = response

  const filteredPokemon = pokemon.filter(pokemon => {
    return pokemon.pokemon.url.split('/')[6] < 10000
  })

  showPokemonListForAbility(
    { name, pokemon, abilityID, effectEntries },
    filteredPokemon
  )
}

async function renderAbilitiesList(URL = `${API_URL}ability`) {
  $list.innerHTML = ''
  $listTitle.textContent = "Abilities' list"

  const response = await fetchURL(URL)
  const abilitiesList = await response.results.filter(ability => {
    return ability.url.split('/')[6] < 10000
  })

  abilitiesList.forEach(ability => {
    const abilityNumber = ability.url.split('/')[6]
    const abilityName = capitalizeFirstLetter(ability.name)

    $list.innerHTML += `<li class='py-2 list__item'>
    <span class='fw-bold'>
    ${roundStringToThreeChars(abilityNumber)} - ${abilityName}
    </span>
    <button class='btn btn-ability' id='ability-${abilityNumber}'>
    Details
    </button>
    </li>`
  })

  const buttonsAbility = document.querySelectorAll('.btn-ability')
  buttonsAbility.forEach(button => {
    const abilityID = button.id.split('-')[1]

    button.addEventListener('click', () => {
      renderAbility(abilityID)
    })
  })

  renderPaginationButtons(
    response.previous,
    response.next,
    renderAbilitiesList,
    'ability'
  )
}

function showPokemonListForAbility(
  { abilityID, name, effectEntries },
  filteredPokemon
) {
  $pokemonCard.innerHTML = `
  <div>
    <h2 class="pokemon-card__title">${abilityID} - ${capitalizeFirstLetter(
    name
  )}</h2>
    <div>
      ${effectEntries[1].effect}
    </div>
  </div>
  `

  $abilityCard.innerHTML = `
  <h3 class='mb-1'>Pokemon with ${name}:</h3>
  <ul class='ability__list'>
    ${filteredPokemon
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
        <img src=${pokemonImage} width='32' />
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
