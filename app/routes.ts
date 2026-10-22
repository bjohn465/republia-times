import { get, post, route } from 'remix/routes'

export const routes = route({
	home: get('/'),
	morning: {
		show: get('/morning'),
		startWork: post('/start-work'),
	},
	work: {
		show: get('/work'),
	},
})
