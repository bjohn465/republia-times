import { get, route } from 'remix/routes'

export const routes = route({
	home: get('/'),
	morning: {
		show: get('/morning'),
	},
	work: {
		show: get('/work'),
	},
})
