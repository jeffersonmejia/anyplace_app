import $ from 'jquery'
import '../css/index.css'

// LOAD NAVIGATION BAR
function loadNav() {
	$.get('/anyplace_app/src/templates/nav.html', (data) => {
		$('main').prepend($(data))
	})
}

// LOAD FOOTER
function loadFooter() {
	$.get('/anyplace_app/src/templates/footer.html', (data) => {
		$('main').after($(data))
	})
}

// CREATE A FOOD CARD FROM TEMPLATE AND FILL DATA
function createFoodCard(food, template) {
	return new Promise((resolve) => {
		const clone = template.content.cloneNode(true)
		const $clone = $(clone)

		$clone.find('.card-title').text(food.nombre)
		$clone.find('.card-text').text(food.descripcion)
		$clone.find('.region').text(food.region)
		$clone.find('.precio').text(food.precio_aproximado_usd.toFixed(2))

		// FETCH RANDOM IMAGE
		$.getJSON('https://foodish-api.com/api/')
			.done((imgData) => {
				$clone.find('.food-img').attr('src', imgData.image)
			})
			.fail(() => {
				$clone.find('.food-img').attr('src', '/src/assets/placeholder.jpg')
			})
			.always(() => {
				resolve($clone)
			})
	})
}

// LOAD FOOD MENU AND DISPLAY
function loadMenu() {
	const $loader = $('#loader')
	const $menuSection = $('#menu-section')
	const $menu = $('#menu')
	const template = document.getElementById('card-template')

	$.getJSON('/anyplace_app/api/food.json', (data) => {
		const comidas = data.seafood_ecuador
		const promises = comidas.map((c) => createFoodCard(c, template))

		Promise.all(promises).then((cards) => {
			cards.forEach((card) => $menu.append(card))
			$loader.fadeOut(400, () => $menuSection.removeClass('d-none'))
		})
	})
}

// DOCUMENT READY
$(document).ready(() => {
	loadNav()
	loadFooter()
	loadMenu()
})
