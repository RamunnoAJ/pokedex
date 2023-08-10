import { renderPaginationButtons } from '../pagination.js'

document.body.innerHTML = `<div id="root"></div>`

describe('renderPaginationButtons', () => {
  test('should render pagination buttons', () => {
    const renderFunction = jest.fn()
    const $root = document.querySelector('#root')
    renderPaginationButtons('prev', 'next', renderFunction, undefined, $root)

    const $btnFirst = document.querySelector('#btn-first')
    const $btnPrev = document.querySelector('#btn-prev')
    const $btnNext = document.querySelector('#btn-next')
    const $btnLast = document.querySelector('#btn-last')

    $btnFirst.click()
    expect(renderFunction).toHaveBeenCalledWith(0)

    $btnPrev.click()
    expect(renderFunction).toHaveBeenCalledWith('prev')

    $btnNext.click()
    expect(renderFunction).toHaveBeenCalledWith('next')

    $btnLast.click()
    expect(renderFunction).toHaveBeenCalledWith(1280)
  })
})
