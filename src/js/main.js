import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const d = document

const main = d.querySelector('main')
const base = import.meta.env.BASE_URL

const loadHTML = async (file, pos) => {
	const res = await fetch(base + file)
	const html = await res.text()
	main.insertAdjacentHTML(pos, html)
}

d.addEventListener('DOMContentLoaded', async () => {
	await loadHTML('templates/nav.html', 'afterbegin')
	await loadHTML('templates/footer.html', 'beforeend')
})
