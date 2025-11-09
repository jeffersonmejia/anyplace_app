import $ from 'jquery'
import '../css/index.css'

function createFoodCard(food, template) {
	const clone = template.content.cloneNode(true)
	const $clone = $(clone)
	$clone.find('.card-title').text(food.nombre)
	$clone.find('.card-text').text(food.descripcion)
	$clone.find('.region').text(food.region)
	$clone.find('.precio').text(food.precio_aproximado_usd.toFixed(2))
	return $.getJSON('https://foodish-api.com/api/')
		.then((imgData) => $clone.find('.food-img').attr('src', imgData.image))
		.catch(() => $clone.find('.food-img').attr('src', '/src/assets/placeholder.jpg'))
		.then(() => $clone)
}

function loadMenu() {
	const $loader = $('#loader')
	const $menuSection = $('#menu-section')
	const $menu = $('#menu')
	const template = document.getElementById('card-template')

	$.getJSON('/anyplace_app/api/food.json', (data) => {
		const comidas = data.seafood_ecuador
		Promise.all(comidas.map((c) => createFoodCard(c, template))).then((cards) => {
			$menu.append(cards)
			$loader.fadeOut(400, () => $menuSection.removeClass('d-none'))
		})
	})
}
function smoothScrollHandler() {
	$('#aside-spy .nav-link').on('click', function (e) {
		e.preventDefault()
		const target = $($(this).attr('href'))
		if (target.length) {
			$('html, body').animate({ scrollTop: target.offset().top }, 600, updateSpyScroll)
		}
	})
}

function updateSpyScroll() {
	const $aside = $('#aside-spy')
	const carouselTop = $('#business-carousel').offset().top
	const scrollPos = $(window).scrollTop() + $(window).height() / 3
	const nearBottom =
		$(window).scrollTop() + $(window).height() > $(document).height() - 100

	if (scrollPos >= carouselTop && !nearBottom) $aside.css({ opacity: 1, 'z-index': 999 })
	else $aside.css({ opacity: 0, 'z-index': 0 })

	const windowBottom = $(window).scrollTop() + $(window).height()
	let footerActive = false

	$('#aside-spy .nav-link').each(function () {
		const href = $(this).attr('href')
		const target = $(href)
		if (!target.length) return

		const top = target.offset().top
		const bottom = top + target.outerHeight()
		const isFooter = href === '#footer'

		if (isFooter && windowBottom > top && $(window).scrollTop() < bottom) {
			$(this).removeClass('text-secondary').addClass('text-primary')
			footerActive = true
		} else {
			$(this).removeClass('text-primary').addClass('text-secondary')
		}
	})

	if (!footerActive) {
		$('#aside-spy .nav-link').each(function () {
			const href = $(this).attr('href')
			if (href === '#footer') return

			const target = $(href)
			if (!target.length) return

			const top = target.offset().top
			const bottom = top + target.outerHeight()
			if (top <= scrollPos && scrollPos < bottom) {
				$(this).removeClass('text-secondary').addClass('text-primary')
			} else {
				$(this).removeClass('text-primary').addClass('text-secondary')
			}
		})
	}
}

function initScrollSpy() {
	smoothScrollHandler()
	$(window).on('scroll load', updateSpyScroll)

	const observer = new MutationObserver(() => {
		if ($('#footer').length) {
			updateSpyScroll()
			observer.disconnect()
		}
	})
	observer.observe(document.body, { childList: true, subtree: true })
}

$(document).ready(() => {
	loadMenu()
	initScrollSpy()
})
