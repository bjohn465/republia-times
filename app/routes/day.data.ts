import { getNewsItem } from '#app/state/news-items.ts'

export function loader() {
	return {
		newsItems: [getNewsItem('bBQb'), getNewsItem('9MrF')],
	}
}
