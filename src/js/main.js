import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

function loadNav() {
	fetch('/anyplace_app/src/templates/nav.html')
		.then((response) => response.text())
		.then((data) => {
			document.querySelector('main').insertAdjacentHTML('afterbegin', data)
		})
}

function loadFooter() {
	fetch('/anyplace_app/src/templates/footer.html')
		.then((response) => response.text())
		.then((data) => {
			document.querySelector('main').insertAdjacentHTML('beforeend', data)
		})
}

document.addEventListener('DOMContentLoaded', () => {
	loadNav()
	loadFooter()
})
