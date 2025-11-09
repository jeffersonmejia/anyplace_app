import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

function loadNav() {
	fetch('/anyplace_app/templates/nav.html')
		.then((res) => res.text())
		.then((data) => document.querySelector('main').insertAdjacentHTML('afterbegin', data))
}

function loadFooter() {
	fetch('/anyplace_app/templates/footer.html')
		.then((res) => res.text())
		.then((data) => document.querySelector('main').insertAdjacentHTML('beforeend', data))
}

document.addEventListener('DOMContentLoaded', () => {
	loadNav()
	loadFooter()
})
