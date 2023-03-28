const URL = 'http://192.168.0.128:8080'
const BASE_API_URL = 'https://pokeapi.co/api/v2/'

const POKEMON = {
  name: 'Bulbasaur',
  id: '1',
  number: '001',
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',

  stats: {
    speed: 45,
    health: 45,
    attack: 49,
    defense: 49,
    spAttack: 65,
    spDefense: 65,
  },
}
const POKEMON_PER_PAGE = 20
const FIRST_POKEMON_FROM_FIRST_PAGE = { name: 'Bulbasaur', id: '001' }
const FIRST_POKEMON_FROM_SECOND_PAGE = { name: 'Spearow', id: '021' }
const FIRST_POKEMON_FROM_LAST_PAGE = { id: '100' }

describe('Pokedex - UI Testing', () => {
  before(() => {
    cy.visit(URL)
  })

  it('should render a list with 20 items and a button', () => {
    cy.get('.list__container').should('include.text', 'List')
    cy.get('#list').should('include.text', POKEMON.name)
    cy.get('#list').should('include.text', POKEMON.number)
    cy.get('#list > li').should('have.length', POKEMON_PER_PAGE)
  })

  it('should render a pokemon', () => {
    cy.get('.pokemon-card').as('card')
    cy.get('@card').should('include.text', POKEMON.name)
    cy.get('.pokemon-card__image').should('have.attr', 'src', POKEMON.image)
    cy.get('@card').find('ul').as('list')

    cy.intercept(`${BASE_API_URL}pokemon/1`).as('response')
    cy.get('#pokemon-1').click()

    cy.wait('@response').then(() => {
      cy.get('@list').should('include.text', `Speed: ${POKEMON.stats.speed}`)
      cy.get('@list').should('include.text', `Health: ${POKEMON.stats.health}`)
      cy.get('@list').should('include.text', `Attack: ${POKEMON.stats.attack}`)
      cy.get('@list').should(
        'include.text',
        `Defense: ${POKEMON.stats.defense}`
      )
      cy.get('@list').should(
        'include.text',
        `Sp-Attack: ${POKEMON.stats.spAttack}`
      )
      cy.get('@list').should(
        'include.text',
        `Sp-Defense: ${POKEMON.stats.spDefense}`
      )
    })
  })

  it('clicking the next button should render the next page', () => {
    cy.intercept(`${BASE_API_URL}pokemon?offset=20&limit=20`).as('response')
    cy.get('#btn-next').click()

    cy.wait('@response').then(() => {
      cy.get('#list').find('li').should('have.length', POKEMON_PER_PAGE)
      cy.get('#list').should('include.text', FIRST_POKEMON_FROM_SECOND_PAGE.id)
      cy.get('#list').should(
        'include.text',
        FIRST_POKEMON_FROM_SECOND_PAGE.name
      )
    })
  })

  it('clicking the previous button should render the next page', () => {
    cy.intercept(`${BASE_API_URL}pokemon?offset=0&limit=20`).as('response')
    cy.get('#btn-prev').click()

    cy.wait('@response').then(() => {
      cy.get('#list').find('li').should('have.length', POKEMON_PER_PAGE)
      cy.get('#list').should('include.text', FIRST_POKEMON_FROM_FIRST_PAGE.id)
      cy.get('#list').should('include.text', FIRST_POKEMON_FROM_FIRST_PAGE.name)
    })
  })

  it('clicking the >> button should render the last page', () => {
    cy.intercept(`${BASE_API_URL}pokemon?offset=1000`).as('response')
    cy.get('#btn-last').click()

    cy.wait('@response').then(() => {
      cy.get('#list').find('li').should('have.length.of.at.least', 5)
      cy.get('#list').should('include.text', FIRST_POKEMON_FROM_LAST_PAGE.id)
    })
  })

  it('clicking the << button should render the first page', () => {
    cy.intercept(`${BASE_API_URL}pokemon`).as('response')
    cy.get('#btn-first').click()

    cy.wait('@response').then(() => {
      cy.get('#list').find('li').should('have.length', POKEMON_PER_PAGE)
      cy.get('#list').should('include.text', FIRST_POKEMON_FROM_FIRST_PAGE.id)
      cy.get('#list').should('include.text', FIRST_POKEMON_FROM_FIRST_PAGE.name)
    })
  })
})
