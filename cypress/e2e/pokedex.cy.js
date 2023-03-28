export const URL = 'http://192.168.0.128:8080'
export const BASE_API_URL = 'https://pokeapi.co/api/v2/'
const ITEM_PER_PAGE = 20

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

const FIRST_POKEMON_FROM_FIRST_PAGE = { name: 'Bulbasaur', id: '001' }
const FIRST_POKEMON_FROM_SECOND_PAGE = { name: 'Spearow', id: '021' }
const FIRST_POKEMON_FROM_LAST_PAGE = { id: '100' }

context('Pokedex app', () => {
  before(() => {
    cy.visit(URL)
  })

  beforeEach(() => {
    cy.get('#btn-next').as('btnNext')
    cy.get('#btn-prev').as('btnPrev')
    cy.get('#btn-first').as('btnFirst')
    cy.get('#btn-last').as('btnLast')
    cy.get('.list__container').as('mainList')
    cy.get('#pokemon-list').as('pokemonNav')
    cy.get('#abilities-list').as('abilitiesNav')
  })

  describe('Pokedex - UI Testing for Pokemon', () => {
    it('should render a list with 20 items and a button', () => {
      cy.get('@mainList').should('include.text', 'List')
      cy.get('#list').should('include.text', POKEMON.name)
      cy.get('#list').should('include.text', POKEMON.number)
      cy.get('#list').find('li').should('have.length', ITEM_PER_PAGE)
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
        cy.get('@list').should(
          'include.text',
          `Health: ${POKEMON.stats.health}`
        )
        cy.get('@list').should(
          'include.text',
          `Attack: ${POKEMON.stats.attack}`
        )
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
      cy.get('@btnNext').click()

      cy.wait('@response').then(() => {
        cy.get('#list').find('li').should('have.length', ITEM_PER_PAGE)
        cy.get('#list').should(
          'include.text',
          FIRST_POKEMON_FROM_SECOND_PAGE.id
        )
        cy.get('#list').should(
          'include.text',
          FIRST_POKEMON_FROM_SECOND_PAGE.name
        )
      })
    })

    it('clicking the previous button should render the next page', () => {
      cy.intercept(`${BASE_API_URL}pokemon?offset=0&limit=20`).as('response')
      cy.get('@btnPrev').click()

      cy.wait('@response').then(() => {
        cy.get('#list').find('li').should('have.length', ITEM_PER_PAGE)
        cy.get('#list').should('include.text', FIRST_POKEMON_FROM_FIRST_PAGE.id)
        cy.get('#list').should(
          'include.text',
          FIRST_POKEMON_FROM_FIRST_PAGE.name
        )
      })
    })

    it('clicking the >> button should render the last page', () => {
      cy.intercept(`${BASE_API_URL}pokemon?offset=1000`).as('response')
      cy.get('@btnLast').click()

      cy.wait('@response').then(() => {
        cy.get('#list').find('li').should('have.length.of.at.least', 5)
        cy.get('#list').should('include.text', FIRST_POKEMON_FROM_LAST_PAGE.id)
      })
    })

    it('clicking the << button should render the first page', () => {
      cy.intercept(`${BASE_API_URL}pokemon`).as('response')
      cy.get('@btnFirst').click()

      cy.wait('@response').then(() => {
        cy.get('#list').find('li').should('have.length', ITEM_PER_PAGE)
        cy.get('#list').should('include.text', FIRST_POKEMON_FROM_FIRST_PAGE.id)
        cy.get('#list').should(
          'include.text',
          FIRST_POKEMON_FROM_FIRST_PAGE.name
        )
      })
    })
  })

  const ABILITY = {
    name: 'Stench',
    id: '001',
    number: 1,
    description:
      "This Pokémon's damaging moves have a 10% chance to make the target flinch with each hit if they do not already cause flinching as a secondary effect. This ability does not stack with a held item. Overworld: The wild encounter rate is halved while this Pokémon is first in the party.",
    pokemon: { name: 'Gloom', id: '044' },
  }
  const SECOND_ABILITY_FROM_FIRST_PAGE = {
    name: 'Drizzle',
    id: '002',
    pokemon: { name: 'Politoed', id: '186' },
  }
  const FIRST_ABILITY_FROM_SECOND_PAGE = { name: 'Suction-cups', id: '021' }
  const FIRST_ABILITY_FROM_LAST_PAGE = { name: 'Protosynthesis', id: '281' }

  describe('Pokedex - UI Testing for Abilities', () => {
    beforeEach(() => {
      cy.get('.ability-card').as('pokemonList')
      cy.get('.pokemon-card').as('card')
    })

    it('should render a list with 20 abilities and an ability', () => {
      cy.get('#abilities-list').click()
      cy.get('#list').find('li').should('have.length', ITEM_PER_PAGE)
      cy.get('#list').should('include.text', ABILITY.name)
      cy.get('#list').should('include.text', ABILITY.id)

      cy.get('@card').should('include.text', ABILITY.name)
      cy.get('@pokemonList').find('li').should('have.length.of.at.least', 1)
    })

    it('should render an ability when clicking details', () => {
      cy.intercept(`${BASE_API_URL}ability/2`).as('response')
      cy.get('#ability-2').click()

      cy.wait('@response').then(() => {
        cy.get('@pokemonList').should(
          'include.text',
          SECOND_ABILITY_FROM_FIRST_PAGE.pokemon.name
        )
        cy.get('@pokemonList').should(
          'include.text',
          SECOND_ABILITY_FROM_FIRST_PAGE.pokemon.id
        )
      })
    })

    it('clicking the next button should render the next page', () => {
      cy.intercept(`${BASE_API_URL}ability?offset=20&limit=20`).as('response')
      cy.get('@btnNext').click()

      cy.wait('@response').then(() => {
        cy.get('@mainList').should(
          'include.text',
          FIRST_ABILITY_FROM_SECOND_PAGE.name
        )
        cy.get('@mainList').should(
          'include.text',
          FIRST_ABILITY_FROM_SECOND_PAGE.id
        )
      })
    })

    it('clicking the previous button should render the previous page', () => {
      cy.intercept(`${BASE_API_URL}ability?offset=0&limit=20`).as('response')
      cy.get('@btnPrev').click()

      cy.wait('@response').then(() => {
        cy.get('@mainList').should('include.text', ABILITY.name)
        cy.get('@mainList').should('include.text', ABILITY.id)
      })
    })

    it('clicking the >> button should render the last page', () => {
      cy.intercept(`${BASE_API_URL}ability?offset=280`).as('response')
      cy.get('@btnLast').click()

      cy.wait('@response').then(() => {
        cy.get('@mainList').should(
          'include.text',
          FIRST_ABILITY_FROM_LAST_PAGE.id
        )
        cy.get('@mainList').should(
          'include.text',
          FIRST_ABILITY_FROM_LAST_PAGE.name
        )
      })
    })

    it('clicking the << button should render the first page', () => {
      cy.intercept(`${BASE_API_URL}ability`).as('response')
      cy.get('@btnFirst').click()

      cy.wait('@response').then(() => {
        cy.get('@mainList').should(
          'include.text',
          SECOND_ABILITY_FROM_FIRST_PAGE.id
        )
        cy.get('@mainList').should(
          'include.text',
          SECOND_ABILITY_FROM_FIRST_PAGE.name
        )
      })
    })
  })

  describe('Navigation tests', () => {
    it('clicking the pokemon link should navigate to pokemon list', () => {
      cy.intercept(`${BASE_API_URL}pokemon`).as('response')
      cy.get('@pokemonNav').click()

      cy.wait('@response').then(() => {
        cy.get('#list').should('include.text', POKEMON.name)
        cy.get('#list').should('include.text', POKEMON.number)
        cy.get('#list').find('li').should('have.length', ITEM_PER_PAGE)
      })
    })

    it('clicking the abilities link should navigate to abilities list', () => {
      cy.intercept(`${BASE_API_URL}ability`).as('response')
      cy.get('@abilitiesNav').click()

      cy.wait('@response').then(() => {
        cy.get('#list').should('include.text', ABILITY.name)
        cy.get('#list').should('include.text', ABILITY.id)
        cy.get('#list').find('li').should('have.length', ITEM_PER_PAGE)
      })
    })
  })
})
