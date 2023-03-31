import { getAbilitiesList, getPokemonList } from '../API.js'
import {
  capitalizeFirstLetter,
  roundStringToThreeChars,
} from '../utils/functions.js'
import { renderAbility, renderPokemon } from './card.js'
import { renderPaginationButtons } from './pagination.js'

const $list = document.querySelector('#list')
const $listTitle = document.querySelector('#list-title')
export async function renderPokemonList(offset = 0) {
  $list.innerHTML = ''
  $listTitle.textContent = "Pokemon's List"

  const { next, previous, pokemonList } = await getPokemonList(offset)

  pokemonList.forEach(pokemon => {
    const pokemonNumber = pokemon.url.split('/')[6]
    const pokemonName = capitalizeFirstLetter(pokemon.name)

    createListPokemon(pokemonNumber, pokemonName, $list)
  })

  const buttonsDetails = document.querySelectorAll('.btn-details')
  buttonsDetails.forEach(button => {
    const pokemonID = button.dataset.pokemon
    button.addEventListener('click', () => {
      renderPokemon(pokemonID)
    })
  })

  renderPaginationButtons(previous, next, renderPokemonList, 'pokemon', $list)
}

function createListPokemon(pokemonNumber, pokemonName, $list) {
  const $link = document.createElement('li')
  $link.className = 'py-2 list__item'
  const $pokemonNumber = document.createElement('span')
  $pokemonNumber.className = 'fw-bold'
  $pokemonNumber.textContent = `${roundStringToThreeChars(
    pokemonNumber
  )} - ${pokemonName}`
  const $detailsButton = document.createElement('button')
  $detailsButton.className = 'btn btn-details'
  $detailsButton.dataset.pokemon = pokemonNumber
  $detailsButton.textContent = 'Details'

  $link.appendChild($pokemonNumber)
  $link.appendChild($detailsButton)
  $list.appendChild($link)
}

export async function renderAbilitiesList(offset = 0) {
  $list.innerHTML = ''
  $listTitle.textContent = "Abilities' list"

  const { previous, next, abilitiesList } = await getAbilitiesList(offset)

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

  renderPaginationButtons(previous, next, renderAbilitiesList, 'ability', $list)
}
