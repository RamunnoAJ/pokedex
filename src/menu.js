const $btnMenu = document.querySelector('#btn-menu')
const $navLinks = document.querySelector('#nav-links')
const $nav = document.querySelector('.nav')

$btnMenu.addEventListener('click', () => {
  $nav.classList.toggle('menu-open')
  $navLinks.classList.toggle('active')
})
