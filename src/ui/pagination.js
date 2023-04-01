export function renderPaginationButtons(
  prev,
  next,
  renderFunction,
  section = 'pokemon',
  nodeToRender
) {
  const offset = section === 'pokemon' ? 1280 : 280

  const FIRST_PAGE = 0
  const LAST_PAGE_TO_RENDER = offset

  createPaginationButtons(nodeToRender)

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

  $btnPrev.addEventListener('click', () => {
    renderFunction(prev)
  })
  $btnNext.addEventListener('click', () => {
    renderFunction(next)
  })
}

function createPaginationButtons($list) {
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
